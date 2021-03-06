import { CelesteContract } from './spec/CelesteContract'
import { AccessRightContract } from './spec/AccessRightContract'
import { createGroupByKey } from './utils';
import { createTreeView } from './utils/createTreeView';
import {
    FunctionalityContract,
    FunctionalityGroupContract,
    FunctionalityTreeContract
} from './spec/FunctionalityContract'

export default class Celeste implements CelesteContract {
    private functionalities: Array<FunctionalityContract> = [];
    private rights: Array<AccessRightContract> = [];

    /**
     * Create a new instance of Celeste
     * @param functionalities
     * @param rights
     */
    constructor(functionalities: Array<FunctionalityContract> = [], rights: Array<AccessRightContract> = []) {
        this.functionalities = functionalities
        this.rights = rights
    }

    /**
     * Add new functionality
     * @param functionality
     */
    addFunctionality(functionalityID: Number) {
        const functionality = this.findFunctionalityById(functionalityID);

        if ([functionality.index].includes(-1)) {
            // throw func not found
        }

        return this
    }

    /**
     * Add new Access Right to existing functionality
     * @param functionalityID
     * @param rights
     */
    addAccessRights(functionalityID: Number, rightsID: Number) {
        const functionality = this.findFunctionalityById(functionalityID)
        const rights = this.findRightsById(rightsID)

        return this
    }

    /**
     * Find functionality by ID
     * @param id
     */
    findFunctionalityById(id: Number) {
        const index = this.functionalities.findIndex(item => item.id === id);
        if (index === -1) this.throwFunctionalityNotFoundException();
        const item = this.functionalities[index];
        return { index, item };
    }

    /**
     * Find rights by ID
     * @param id
     */
    findRightsById(id: Number) {
        const index = this.rights.findIndex((item) => item.id === id);
        if (index === -1) this.throwAccessRightsNotFoundException()
        const item = this.rights[index];
        return { index, item };
    }

    /**
     * Create a group of Functionalities
     */
    group(key: string = 'type'): FunctionalityGroupContract {
        const factory = createGroupByKey(key)
        return factory(this.functionalities);
    }

    /**
     * Create a tree view of Functionalities
     */
    tree(key: string = "type"): FunctionalityTreeContract {
        const factory = createTreeView(key)
        return factory(this.functionalities)
    }

    /**
     * Throw functionality not found exception
     */
    private throwFunctionalityNotFoundException() {
        this.throwError('Functionality not found.')
    }

    /**
     * Throw access rights not found exception
     */
    private throwAccessRightsNotFoundException() {
        this.throwError("AccessRights not found.");
    }

    /**
     * Throw error exception
     * @param message
     */
    private throwError(message: String) {
        throw new Error(`[Celeste]: ${message}`);
    }
}
