export function Audit() {
  return (target: any, propertyKey: any, descriptor: any) => {
    const originalMethod = descriptor.value;
    const newDescriptor = { ...descriptor };

    newDescriptor.value = async function (...args: any[]) {
      try {
        const email = this.clsService.get("email");
        if (originalMethod.name == "create") {
          this.emitter.emit("audit.event", {
            entityId: args[0]["data"]["id"],
            entityName: this.entityName,
            updatedBy: email || "system",
            data: args[0]["data"],
          });
        } else if (originalMethod.name == "update") {
          this.emitter.emit("audit.event", {
            entityId: args[0],
            entityName: this.entityName,
            updatedBy: email || "system",
            data: args[1],
          });
        }

        return originalMethod.apply(this, args);
      } catch (err) {
        return originalMethod.apply(this, args);
      }
    };
    return newDescriptor;
  };
}
