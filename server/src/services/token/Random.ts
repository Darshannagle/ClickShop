//--------------------------------------------------------------
export default class Random {
  static randomNumber(digits: number = 4): number {
    let min = "1";
    let max = "9";

    while (min.length < digits) min += "0";
    while (max.length < digits) max += "9";

    const maxNum = parseInt(max);
    const minNum = parseInt(min);

    return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
  }

  static randomCode(halfLength: number = 3): string {
    const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const digitsAndUpperCaseLetters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    let code = "";
    for (let i = 0; i < halfLength; i++) {
      code += upperCaseLetters.charAt(
        Math.floor(Math.random() * upperCaseLetters.length),
      );
    }
    for (let i = 0; i < halfLength; i++) {
      code += digitsAndUpperCaseLetters.charAt(
        Math.floor(Math.random() * digitsAndUpperCaseLetters.length),
      );
    }
    return code;
  }

  static nextRandomCode({ lastToken, length = 6, isKeyGet = false }: any): any {
    try {
      const key = "TOKEN-NEXT-RANDOM-CODE";
      if (isKeyGet) return { key };

      if (length < 3) throw "Length must be at least 3";

      const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const chars = letters + "0123456789";

      // Start fresh if no last token {
      if (!lastToken) {
        // Hidden default start value (not obvious like AAA000)
        const defaultStart = "ACB" + "7".repeat(length - 3); // Example: XQZ777...
        return { key, code: defaultStart.slice(0, length) };
      }
      // } Start fresh if no last token

      // Increment logic {
      const arr = lastToken.split("");
      /*const maxIndex = chars.length - 1;*/

      for (let i = length - 1; i >= 0; i--) {
        const set = i < 3 ? letters : chars; // first 3 only letters
        const index = set.indexOf(arr[i]);
        if (index < set.length - 1) {
          arr[i] = set[index + 1]; // increment this char
          for (let j = i + 1; j < length; j++) {
            arr[j] = j < 3 ? letters[0] : chars[0];
          }
          return { key, code: arr.join("") };
        }
      }
      // } Increment logic

      throw "Overflow: no more tokens available for this length";
    } catch (e) {
      return { error: e };
    }
  }

  static token(length = 12): string {
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    let trace = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      trace += characters[randomIndex];
    }

    return trace;
  }

  static traceKey(length = 8): string {
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    let trace = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      trace += characters[randomIndex];
    }

    return trace;
  }
}
