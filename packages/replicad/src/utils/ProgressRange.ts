import type { Message_ProgressRange } from "replicad-opencascadejs";
import { WrappingObj } from "../register";
import { getOC } from "../oclib";

export class ProgressRange extends WrappingObj<Message_ProgressRange> {
  constructor() {
    const oc = getOC();
    super(new oc.Message_ProgressRange_1());
  }
}
