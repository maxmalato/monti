export default function Footer() {
    const yearCurrent = new Date().getFullYear()

    return (
        <div className="mt-5 border-t py-3">
            <p>© {yearCurrent} Monti. Todos os direitos reservados. Explore nossos produtos e aproveite a melhor experiência de compra online.</p>
        </div>
    )
}