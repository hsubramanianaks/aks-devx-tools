import { Subscription, SubscriptionClient } from "@azure/arm-subscriptions";
import * as vscode from "vscode";

export interface ContextApi {
  getPort(): string | undefined;
  setPort(port: string): void;
  getImage(): string | undefined;
  setImage(image: string): void;
  getSubscription(): string | undefined;
  setSubscription(sub: string): void;
  getResourceGroupName(): string | undefined;
  setResourceGroupName(name: string): void;
  getClusterName(): string | undefined;
  setClusterName(name: string): void;
}

const portKey = "port";
const imageKey = "image";
const subscription = "subscription";
const resourceGroupName = "resourceGroupName";
const clusterName = "clusterName";

export class Context implements ContextApi {
  constructor(private ctx: vscode.ExtensionContext) {}

  getPort(): string | undefined {
    return this.get(portKey);
  }

  setPort(port: string) {
    return this.set(portKey, port);
  }

  getImage(): string | undefined {
    return this.get(imageKey);
  }

  setImage(image: string) {
    return this.set(imageKey, image);
  }

  getSubscription(): string | undefined {
    return this.get(subscription);
  }

  setSubscription(sub: string) {
    this.set(subscription, sub);
  }

  getResourceGroupName(): string | undefined {
    return this.get(resourceGroupName);
  }

  setResourceGroupName(name: string): void {
    this.set(resourceGroupName, name);
  }

  getClusterName(): string | undefined {
    return this.get(clusterName);
  }

  setClusterName(name: string): void {
    this.set(clusterName, name);
  }

  private get(key: string): string | undefined {
    return this.ctx.workspaceState.get(key);
  }

  private set(key: string, val: string) {
    return this.ctx.workspaceState.update(key, val);
  }
}
