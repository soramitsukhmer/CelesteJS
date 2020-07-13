import { AccessRightContract } from './AccessRightContract'

export interface FunctionalityContract {
    id: Number;
    name: String;
    type: String;
    function: String;
    description: String;
    accessRights: Array<AccessRightContract>
}

export type FunctionalityType = {
    id?: Number;
    name: String;
    type: String;
    function: String;
    description?: String;
    accessRights?: Array<AccessRightContract>;
};