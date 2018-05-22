export class FormInput {
    name: string;
    type: string;
    top: number;
    left: number;
    width: number;
    height: number;
    textAlignment: number;
    value; any;

    constructor(
        public fieldName: string
    ) {
    }
}
