import '@babel/polyfill';
export default class DynamoTypes {
    /**
     * @static
     * @see typeParseUpdate
     */
    static parseUpdate: {
        value: {};
        put(obj: any): any;
        add(obj: any): any;
        delete(key: string): any;
        getValue(): {};
    };
    /**
     * Parse JSON object to DynamoDB recognized JSON object.
     * @static
     * @param obj normal JSON object
     * @returns DynamoDB recognized JSON object
     */
    static parse(obj: any): any;
    /**
     * Decode DynamoDB recognized JSON object to JSON object.
     * @static
     * @param obj DynamoDB recognized JSON object
     * @returns normal JSON object
     */
    static decode(obj: any): any;
}
