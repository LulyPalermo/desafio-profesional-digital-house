import { policies } from "../Data/policies";

export const PoliciesBlock = () => {
  return (
    <div className="product-policies">
      <h3 className="policies-title">Políticas del alquiler</h3>
      <div className="policies-grid">
        {policies.map((policy, index) => (
          <div className="policy-item" key={index}>
            <h3>{policy.title}</h3>
            <p>{policy.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
