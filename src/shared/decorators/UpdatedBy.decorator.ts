export function UpdatedBy() {
  return (target: any, propertyKey: any, descriptor: any) => {
    const originalMethod = descriptor.value;
    const newDescriptor = { ...descriptor };

    newDescriptor.value = async function (...args: any[]) {
      try {
        const email = this.clsService.get("email");
        args[0]["data"]["updatedBy"] = email;
        return originalMethod.apply(this, args);
      } catch (err) {
        return originalMethod.apply(this, args);
      }
    };
    return newDescriptor;
  };
}
