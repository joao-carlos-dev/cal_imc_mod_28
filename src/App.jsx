import "./main.css";
import "./global.css";
import React, { useState } from "react";

function App() {
  const [imcData, setimcData] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    const { massa, altura } = data;
    if (!massa || !altura) {
      alert("Tem algum campo invalido!!");
      return;
    }

    const massaNumber = parseFloat(massa.replace(",", "."));
    const alturaNumber = parseFloat(altura.replace(",", "."));

    if (isNaN(massaNumber) || isNaN(alturaNumber)) {
      alert("Campos preenchidos de forma inadequada!!!");
      return;
    }

    if (massaNumber < 2 || massaNumber > 500) {
      alert("A massa precisa ser entre 2kg até 500kg");
    }

    if (alturaNumber < 0.5 || alturaNumber > 2.5) {
      alert("A altura tem que ser entre 0.5m e 2.5m");
    }

    const imc = massaNumber / (alturaNumber * alturaNumber);

    function imcResultado() {
      if (imc < 17) {
        return "Muito abaixo do peso";
      } else if (imc < 18.5) {
        return "Abaixo do peso";
      } else if (imc < 24.9) {
        return "Pesso normal";
      } else if (imc < 29.9) {
        return "Levemente acima do peso";
      } else if (imc < 34.9) {
        return "Obesidade grau I";
      } else if (imc < 39.9) {
        return "Obesidade grau II";
      } else {
        return "Obesidade grau III";
      }
    }

    const imcResult = imcResultado(imc);


    setimcData({
      massa: massaNumber,
      altura: alturaNumber,
      imc: imc.toFixed(2),
      imcResultado: imcResult,
    });

    // limpar form
    e.currentTarget.reset();
  };

  function handleClickReset (e) {
    e.preventDefault()
    setimcData(null);
  }

  return (
    <main>
      <section id="form">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="massa">Massa (kg)</label>
            <input disabled={!!imcData} name="massa" type="text" id="massa" />
          </div>
          <div className="altura">
            <label htmlFor="Altura">Altura (m)</label>
            <input disabled={!!imcData} name="altura" type="text" id="altura" />
          </div>
          {imcData ? (
            <button onClick={handleClickReset} type="button">Refazer</button>
          ) : (
            <button>Calcular</button>
          )}
        </form>
      </section>

      <section id="resultado">
        {imcData ? (
          <table className="tabelaResultado">
            <tbody>
              <tr>
                <td>Massa</td>
                <td>Altura</td>
                <td>IMC</td>
                <td>Resultado</td>
              </tr>
              <tr>
                <td>{imcData.massa} kg </td>
                <td>{imcData.altura} m </td>
                <td>{imcData.imc}</td>
                <td>{imcData.imcResultado}</td>
              </tr>
            </tbody>
          </table>
        ) : (
          <p>Saiba como está o seu Indice de Massa Corporal (IMC)</p>
        )}
      </section>

      <section id="tabela-referencia">
        <table>
          <thead>
            <tr>
              <th className="imc">IMC</th>
              <th>Classificação</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="imc-linha-par">Menor que 17</td>
              <td className="imc-linha-par">Muito abaixo do peso</td>
            </tr>
            <tr>
              <td className="imc-linha-impar">Menor que 18,5</td>
              <td className="imc-linha-impar">Abaixo do peso</td>
            </tr>
            <tr>
              <td className="imc-linha-par">Entre 18,6 e 24,9</td>
              <td className="imc-linha-par">Peso normal</td>
            </tr>
            <tr>
              <td className="imc-linha-impar">Entre 25,0 e 29,9</td>
              <td className="imc-linha-impar">Levemente acima do peso</td>
            </tr>
            <tr>
              <td className="imc-linha-par">Entre 30,0 e 34,9</td>
              <td className="imc-linha-par">Obsidade grau I</td>
            </tr>
            <tr>
              <td className="imc-linha-impar">Entre 35,0 e 39,9</td>
              <td className="imc-linha-impar">Obesidade grau II (severa)</td>
            </tr>
            <tr>
              <td className="imc-linha-par">Acima de 40</td>
              <td className="imc-linha-par">Obseidade III (mórbida)</td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  );
}

export default App;
