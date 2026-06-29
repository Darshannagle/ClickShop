import crypto from "crypto";

// Helpers
import { getError } from "@utils";

// Interfaces
import { IHelperError } from "@common/interface";
import { IEncryptRet } from "./interface";

//--------------------------------------------------------------
export default class Encrypt {
  static ALGORITHM = "aes-256-cbc";

  // helpers {
  static #splitByLastColon(inputString: string): [string, string] {
    const lastIndex = inputString.lastIndexOf(":");
    if (lastIndex === -1) return [inputString, ""];
    return [
      inputString.substring(0, lastIndex),
      inputString.substring(lastIndex + 1),
    ];
  }

  static #createAES128Key(key: string) {
    const hash = crypto.createHash("sha256").update(key).digest("hex");
    return hash.substring(0, 32);
  }

  static #encryptWithAES(data: string, key: string): string {
    const iv = crypto.randomBytes(16);
    const keyBuffer = Buffer.from(key, "hex");
    const cipher = crypto.createCipheriv(this.ALGORITHM, keyBuffer, iv);
    let encrypted = cipher.update(data, "utf-8", "hex");
    encrypted += cipher.final("hex");
    return iv.toString("hex") + ":" + encrypted;
  }

  // Function to decrypt data using AES with a symmetric key
  static #decryptWithAES(encryptedData: string, key: string): string {
    const [ivHex, encryptedHex] = encryptedData.split(":");
    const iv = Buffer.from(ivHex, "hex");
    const keyBuffer = Buffer.from(key, "hex");
    const decipher = crypto.createDecipheriv(this.ALGORITHM, keyBuffer, iv);
    let decrypted = decipher.update(encryptedHex, "hex", "utf-8");
    decrypted += decipher.final("utf-8");
    return decrypted;
  }

  // Function to encrypt symmetric key using RSA public key
  static #encryptSymmetricKeyWithRSA(key: string, publicKey: string): string {
    return crypto
      .publicEncrypt(
        {
          key: publicKey,
          padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        },
        Buffer.from(key),
      )
      .toString("base64");
  }

  // Function to decrypt symmetric key using RSA private key
  static #decryptSymmetricKeyWithRSA(
    encryptedKey: string,
    privateKey: string,
  ): string {
    const decrypted = crypto.privateDecrypt(
      {
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      },
      Buffer.from(encryptedKey, "base64"),
    );
    return decrypted.toString();
  }
  // helpers

  // Basic encryption method {
  static encrypt(data: any, key: string): IEncryptRet | IHelperError {
    const ERROR_KEY = "ENCRYPT-ENCRYPT";
    try {
      const iv = crypto.randomBytes(16);
      const keyBuffer = this.#createAES128Key(key);
      const cipher = crypto.createCipheriv(this.ALGORITHM, keyBuffer, iv);
      let encrypted = cipher.update(JSON.stringify(data), "utf-8", "hex");
      encrypted += cipher.final("hex");
      return { encrypted: iv.toString("hex") + ":" + encrypted };
    } catch (e) {
      return { error: getError(e), errorKey: ERROR_KEY };
    }
  }

  static decrypt(encryptedData: string, key: string): any | IHelperError {
    const ERROR_KEY = "ENCRYPT-DECRYPT";
    try {
      const [ivHex, encryptedHex] = encryptedData.split(":");
      const iv = Buffer.from(ivHex, "hex");
      const keyBuffer = this.#createAES128Key(key);
      const decipher = crypto.createDecipheriv(this.ALGORITHM, keyBuffer, iv);
      let decrypted = decipher.update(encryptedHex, "hex", "utf-8");
      decrypted += decipher.final("utf-8");
      return JSON.parse(decrypted);
    } catch (e) {
      return { error: getError(e), errorKey: ERROR_KEY };
    }
  }
  // } Basic encryption method

  // Encryption RSA {
  static encryptRSA(data: any, publicKey: string): string | null {
    try {
      const symmetricKey = crypto.randomBytes(32).toString("hex"); // Generate symmetric key
      const encryptedSymmetricKey = this.#encryptSymmetricKeyWithRSA(
        symmetricKey,
        publicKey,
      );
      const encryptedData = this.#encryptWithAES(
        JSON.stringify(data),
        symmetricKey,
      );
      const key = crypto.randomBytes(32).toString("hex");
      return (
        this.encrypt({ encryptedSymmetricKey, encryptedData }, key) + ":" + key
      );
    } catch (e) {
      return null;
    }
  }

  static decryptRSA(encryptedData: string, privateKey: string): any {
    try {
      const splitData = this.#splitByLastColon(encryptedData);
      const decryptionData = this.decrypt(splitData[0], splitData[1]);
      const decryptedSymmetricKey = this.#decryptSymmetricKeyWithRSA(
        decryptionData.encryptedSymmetricKey,
        privateKey,
      );
      const decryptedData = this.#decryptWithAES(
        decryptionData.encryptedData,
        decryptedSymmetricKey,
      );
      return JSON.parse(decryptedData);
    } catch (e) {
      return null;
    }
  }

  // } Encryption RSA {
}
