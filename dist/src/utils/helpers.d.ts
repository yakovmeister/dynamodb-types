import { AttributeType } from '../types/AttributeType';
export declare const identifyAttributeType: (value: any) => AttributeType;
export declare const convertToDynamoSyntax: (value: any, key?: string) => {
    [x: string]: any;
};
export declare const iterateAndProcessObject: (obj: any, callback: any, processCallback?: any) => any;
