"use client";

export default function TermosPage() {
  return (
    <div className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Termos de Uso</h1>
        <p className="text-gray-500 mb-8">Última atualização: Maio de 2026</p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Aceitação dos Termos</h2>
          <p className="text-gray-600 leading-relaxed">
            Ao acessar este site e portal, você concorda com os presentes Termos de Uso. Caso não concorde, não utilize nossos serviços.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Uso do Portal</h2>
          <p className="text-gray-600 leading-relaxed">
            O acesso ao portal é restrito a clientes e parceiros autorizados pela JK Consulting. Você é responsável pela confidencialidade das suas credenciais.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Propriedade Intelectual</h2>
          <p className="text-gray-600 leading-relaxed">
            Todo o conteúdo deste site — incluindo textos, imagens, marca e materiais — é propriedade da JK Consulting. É proibida a reprodução sem autorização.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Limitação de Responsabilidade</h2>
          <p className="text-gray-600 leading-relaxed">
            A JK Consulting não se responsabiliza por danos indiretos decorrentes do uso do site ou portal, incluindo interrupções temporárias de serviço.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Lei Aplicável</h2>
          <p className="text-gray-600 leading-relaxed">
            Estes termos são regidos pela legislação brasileira. O foro competente para quaisquer disputas é o da comarca do domicílio da JK Consulting.
          </p>
        </section>
      </div>
    </div>
  );
}
