import React from "react";

const stats = [
    { title: "Partidos esta semana", value: 8 },
    { title: "Próximos Partidos", value: 3 },
    { title: "Partidos organizados", value: 15 },
    { title: "Ranking promedio", value: 4.5 },
];

const StatsGrid = () => {
    return (
        <div className="row g-3">
            {stats.map((item, index) => (
                <div className="col-md-3" key={index}>
                    <div className="card shadow-sm p-3">
                        <p className="text-muted mb-1">{item.title}</p>
                        <h2 className="fw-bold">{item.value}</h2>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StatsGrid;
