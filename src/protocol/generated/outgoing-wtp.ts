import { Protocol } from './protocol';
import { Messages } from './messages';
import { Common } from '../../util/common';
import { MessageConnection } from 'vscode-jsonrpc';

/**
 * WTP Server Outgoing
 */
export class OutgoingWTP {

    private connection: MessageConnection;

     /**
     * Constructs a new WTP outgoing handler
     * @param connection message connection to the RSP
     */
    constructor(connection: MessageConnection) {
        this.connection = connection;
    }

    startModule(param: Protocol.ServerDeployableReference, timeout: number = Common.DEFAULT_TIMEOUT): Promise<Protocol.Status> {
        return Common.sendSimpleRequest(this.connection, Messages.WTPServer.StartModuleRequest.type,
            param, timeout, ErrorMessagesWTP.STARTMODULE_TIMEOUT);
    }

    stopModule(param: Protocol.ServerDeployableReference, timeout: number = Common.DEFAULT_TIMEOUT): Promise<Protocol.Status> {
        return Common.sendSimpleRequest(this.connection, Messages.WTPServer.StopModuleRequest.type,
            param, timeout, ErrorMessagesWTP.STOPMODULE_TIMEOUT);
    }

    getModuleStates(param: Protocol.ServerHandle, timeout: number = Common.DEFAULT_TIMEOUT): Promise<Array<Protocol.ModuleState>> {
        return Common.sendSimpleRequest(this.connection, Messages.WTPServer.GetModuleStatesRequest.type,
            param, timeout, ErrorMessagesWTP.GETMODULESTATES_TIMEOUT);
    }

    getDeployableResources(param: Protocol.ServerHandle, timeout: number = Common.DEFAULT_TIMEOUT): Promise<Protocol.ListDeployableResourcesResponse> {
        return Common.sendSimpleRequest(this.connection, Messages.WTPServer.GetDeployableResourcesRequest.type,
            param, timeout, ErrorMessagesWTP.GETDEPLOYABLERESOURCES_TIMEOUT);
    }

    listWorkspaceProjects(timeout: number = Common.DEFAULT_TIMEOUT): Promise<Protocol.ListWorkspaceProjectsResponse> {
        return Common.sendSimpleRequest(this.connection, Messages.WTPServer.ListWorkspaceProjectsRequest.type,
            null, timeout, ErrorMessagesWTP.LISTWORKSPACEPROJECTS_TIMEOUT);
    }

    listDeploymentAssemblyProjects(param: Protocol.DeploymentAssemblyRequest, timeout: number = Common.DEFAULT_TIMEOUT): Promise<Protocol.ListWorkspaceProjectsResponse> {
        return Common.sendSimpleRequest(this.connection, Messages.WTPServer.ListDeploymentAssemblyProjectsRequest.type,
            param, timeout, ErrorMessagesWTP.LISTDEPLOYMENTASSEMBLYPROJECTS_TIMEOUT);
    }

    getDeploymentAssembly(param: Protocol.DeploymentAssemblyRequest, timeout: number = Common.DEFAULT_TIMEOUT): Promise<Protocol.DeploymentAssemblyResponse> {
        return Common.sendSimpleRequest(this.connection, Messages.WTPServer.GetDeploymentAssemblyRequest.type,
            param, timeout, ErrorMessagesWTP.GETDEPLOYMENTASSEMBLY_TIMEOUT);
    }

    addDeploymentAssemblyEntry(param: Protocol.DeploymentAssemblyUpdateRequest, timeout: number = Common.DEFAULT_TIMEOUT): Promise<Protocol.Status> {
        return Common.sendSimpleRequest(this.connection, Messages.WTPServer.AddDeploymentAssemblyEntryRequest.type,
            param, timeout, ErrorMessagesWTP.ADDDEPLOYMENTASSEMBLYENTRY_TIMEOUT);
    }

    removeDeploymentAssemblyEntry(param: Protocol.DeploymentAssemblyUpdateRequest, timeout: number = Common.DEFAULT_TIMEOUT): Promise<Protocol.Status> {
        return Common.sendSimpleRequest(this.connection, Messages.WTPServer.RemoveDeploymentAssemblyEntryRequest.type,
            param, timeout, ErrorMessagesWTP.REMOVEDEPLOYMENTASSEMBLYENTRY_TIMEOUT);
    }

    didChangeWorkspaceFolders(param: Protocol.DidChangeWorkspaceFoldersParams, timeout: number = Common.DEFAULT_TIMEOUT): void {
        return Common.sendSimpleNotification(this.connection, Messages.WTPServer.DidChangeWorkspaceFoldersNotification.type, param);
    }
}

/**
 * WTP Error messages
 */
export namespace ErrorMessagesWTP {
    export const STARTMODULE_TIMEOUT = 'Failed to start module in time';
    export const STOPMODULE_TIMEOUT = 'Failed to stop module in time';
    export const GETMODULESTATES_TIMEOUT = 'Failed to get module states in time';
    export const GETDEPLOYABLERESOURCES_TIMEOUT = 'Failed to get deployable resources in time';
    export const LISTWORKSPACEPROJECTS_TIMEOUT = 'Failed to list workspace projects in time';
    export const LISTDEPLOYMENTASSEMBLYPROJECTS_TIMEOUT = 'Failed to list deployment assembly projects in time';
    export const GETDEPLOYMENTASSEMBLY_TIMEOUT = 'Failed to get deployment assembly in time';
    export const ADDDEPLOYMENTASSEMBLYENTRY_TIMEOUT = 'Failed to add deployment assembly entry in time';
    export const REMOVEDEPLOYMENTASSEMBLYENTRY_TIMEOUT = 'Failed to remove deployment assembly entry in time';
}
