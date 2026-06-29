// Helpers
import { getError } from "./Error";

//--------------------------------------------------------------

class RevertStack {
  private revertOps: (() => Promise<any>)[] = [];
  private rolledBack = false;

  add(operation: () => Promise<any>) {
    if (this.rolledBack) return;
    this.revertOps.push(operation);
  }

  async rollback(): Promise<{ error?: string }> {
    if (this.rolledBack) return { error: "Rollback already executed." };

    this.rolledBack = true;

    const errors: string[] = [];

    while (this.revertOps.length) {
      const revert = this.revertOps.pop();

      try {
        await revert?.();
      } catch (e) {
        errors.push(getError(e));
      }
    }

    if (errors.length) {
      return { error: errors.join(" | ") };
    }

    return {};
  }
}

export const revertStack = () => new RevertStack();
