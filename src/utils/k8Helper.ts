import * as k8s from 'vscode-kubernetes-tools-api';
import { Errorable } from './errorable';
const k8sJsClient = require('@kubernetes/client-node');

export async function invokeKubeCtl(command: string, kubeConfig: string): Promise<Errorable<any>> {
    const kubectl = await k8s.extension.kubectl.v1;
    if (!kubectl.available) {
        return { succeeded: false, error: `kubectl is not available: ${kubectl.reason}` };
    }
    const kubectlResult = await kubectl.api.invokeCommand(`${command} --kubeconfig="${kubeConfig}"`);

    if (!kubectlResult || kubectlResult.code !== 0) {
        return { succeeded: false, error: `Kubectl command failed for ${command}: ${kubectlResult ? kubectlResult.stderr : 'unable to run kubectl'}` };
    }
    return { succeeded: true, result: kubectlResult };
}



export async function listNamespaces() {
    const kc = new k8sJsClient.KubeConfig();
    kc.loadFromDefault();
    const k8sApi = kc.makeApiClient(k8sJsClient.CoreV1Api);
    k8sApi.listNamespaces()
        .then((res: { body: any; }) => {
            console.log(res.body);
            return res.body;
        });
}