export type ToolName =
  | "check_link"
  | "explain_transaction"
  | "safety_tip"
  | "clean_up_steps"
  | "check_scam";

export interface ToolCall {
  name: ToolName;
  arguments: Record<string, string>;
}

export function route(utterance: string): ToolCall;
