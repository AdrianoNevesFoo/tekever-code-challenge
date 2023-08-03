import AppError from "../core/errors/AppError";

export class StringUtils {
  static verifyLength(str: string, length: number) {
    if (!str || str.length > 0) throw new AppError("", 400);

    if (str.length !== length)
      throw new AppError("", 500, {
        message: `Tamanho de campo incompatível. O campo deveria ter ${length} caracteres, mas foi apresentado com ${str.length} caracteres.`,
      });
  }

  static hasLength(str: string | undefined): boolean {
    return str && str.length > 0 ? true : false;
  }

  static generateFileName(
    fileName: string,
    service: string = "",
    identifier: string = "",
    extension: string = ""
  ) {
    const today = new Date().toISOString().split("T")[0];
    return StringUtils.hasLength(extension)
      ? `${service}-${today}-${identifier}-${fileName}.${extension}`
      : `${service}-${today}-${identifier}-${fileName}`;
  }

  static isEmpty(element: string): boolean {
    const elementString = JSON.stringify(element);
    if (elementString === "{}" || elementString === "") {
      return true;
    }
    return false;
  }

  static parseMoneyCurrenyBRL(value: string): string {
    if (!value) return "";
    return parseFloat(String(value)).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  /**
   * @param VALOR - valor do cpf sem pontos por exemplo: 08364523477
   * este método irá retornar o cpf com as devidas pontuações: 083.645.234-77
   */
  static mascaraCpf(valor: string): string {
    if (!this.hasLength(valor)) return "";
    return valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4");
  }

  /**
   * @param VALOR - valor do cnpj sem pontos por exemplo: 46338551000160
   * este método irá retornar o cnpj com as devidas pontuações: 46.338.551/0001-60
   */
  static mascaraCnpj(valor: string): string {
    if (!this.hasLength(valor)) return "";
    return valor.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,
      "$1.$2.$3/$4-$5"
    );
  }

  static onlyNumbers(value: string): string {
    if (typeof value !== "string") return "";
    return String(value).replace(/\D/g, "");
  }
}
