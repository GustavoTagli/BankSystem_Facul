export default function formatCurrency(valor: number): string {
  // Utiliza o Intl.NumberFormat para formatar o número
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor)
}
