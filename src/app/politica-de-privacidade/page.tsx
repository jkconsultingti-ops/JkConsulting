"use client";

export default function PoliticaPage() {
  return (
    <div className="py-20 px-4">
      <div className="max-w-3xl mx-auto prose">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Política de Privacidade</h1>
        <p className="text-gray-500 mb-8">Última atualização: Maio de 2026</p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Informações que coletamos</h2>
          <p className="text-gray-600 leading-relaxed">
            Coletamos informações fornecidas diretamente por você, como nome, e-mail, telefone e empresa ao preencher formulários em nosso site. Também coletamos dados de uso do portal mediante autenticação.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Como usamos suas informações</h2>
          <p className="text-gray-600 leading-relaxed">
            Utilizamos suas informações para responder às suas solicitações, prestar os serviços contratados, enviar comunicações relevantes e melhorar nossa plataforma. Não vendemos suas informações a terceiros.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Segurança dos dados</h2>
          <p className="text-gray-600 leading-relaxed">
            Adotamos medidas técnicas e organizacionais para proteger seus dados, incluindo criptografia em trânsito (HTTPS/TLS) e autenticação segura via Supabase.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Seus direitos (LGPD)</h2>
          <p className="text-gray-600 leading-relaxed">
            Conforme a Lei Geral de Proteção de Dados (LGPD), você tem direito a acessar, corrigir, excluir ou portar seus dados. Entre em contato pelo e-mail para exercer esses direitos.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Contato</h2>
          <p className="text-gray-600 leading-relaxed">
            Para dúvidas sobre esta política, entre em contato pelo nosso <a href="/contato" className="text-blue-600 hover:underline">formulário de contato</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
