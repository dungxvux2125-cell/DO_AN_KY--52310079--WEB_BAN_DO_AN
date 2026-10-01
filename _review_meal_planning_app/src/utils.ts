export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value)

export const maskPhone = (value: string) => value.replace(/\d(?=\d{3})/g, "*")

export const maskAddress = (value: string) =>
  value.length <= 14 ? "Đã mã hóa AES-256" : `${value.slice(0, 9)}...${value.slice(-5)}`
