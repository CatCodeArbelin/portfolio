import { useCallback } from 'react';
import { getDesignCards } from '../api/portfolio';
import { useSectionData } from './useSectionData';

export function DesignCardsSection() {
  const getFallbackError = useCallback(
    () => 'Не удалось загрузить карточки системного дизайна.',
    [],
  );
  const [designCardsState, retryLoadDesignCards] = useSectionData({
    loadData: getDesignCards,
    getFallbackError,
  });

  return (
    <section className="sectionCard" aria-labelledby="design-cards-title">
      <div className="sectionHeader">
        <p className="eyebrow">System Design</p>
        <h2 id="design-cards-title">Как я проектирую системы</h2>
        <p>
          Карточки показывают задачу, схему, стек, ключевые решения, частые ошибки и путь
          масштабирования.
        </p>
      </div>

      {designCardsState.status === 'loading' && (
        <p className="stateMessage" aria-live="polite">
          Загружаем system design cards…
        </p>
      )}
      {designCardsState.status === 'error' && (
        <div className="stateMessage stateMessageError" role="status">
          <p>System design cards временно недоступны, остальные секции сайта продолжают работать.</p>
          <p className="stateDetails">{designCardsState.message}</p>
          <button className="stateRetryButton" type="button" onClick={retryLoadDesignCards}>
            Повторить загрузку карточек
          </button>
        </div>
      )}
      {designCardsState.status === 'ready' && (
        <div className="designGrid">
          {designCardsState.data.map((card) => (
            <article className="designCard" key={card.slug}>
              <h3>{card.title}</h3>
              <p>{card.task}</p>
              <pre className="schemeBox" aria-label={`Схема ${card.title}`}>
                {card.scheme}
              </pre>
              <div className="designColumns">
                <div>
                  <h4>Ключевые решения</h4>
                  <ul>
                    {card.key_decisions.map((decision) => (
                      <li key={decision}>{decision}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4>Ошибки</h4>
                  <ul>
                    {card.common_mistakes.map((mistake) => (
                      <li key={mistake}>{mistake}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4>Масштабирование</h4>
                  <ul>
                    {card.scaling_notes.map((note) => (
                      <li key={note}>{note}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <ul className="inlineList" aria-label={`Стек карточки ${card.title}`}>
                {card.stack.map((stackItem) => (
                  <li key={stackItem}>{stackItem}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
