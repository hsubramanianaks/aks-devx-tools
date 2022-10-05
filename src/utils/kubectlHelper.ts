import * as k8s from 'vscode-kubernetes-tools-api';
import { Errorable } from './errorable';

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