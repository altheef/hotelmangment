function DashboardCard({
  title,
  count,
  bgColor,
  textColor,
  icon,
}) {
  return (
    <div className="card shadow border-0 h-100">
      <div
        className={`card-body text-center ${bgColor}`}
      >
        <div className="fs-1 mb-3">
          {icon}
        </div>

        <h5 className={textColor}>
          {title}
        </h5>

        <h2 className={`fw-bold ${textColor}`}>
          {count}
        </h2>
      </div>
    </div>
  );
}

export default DashboardCard;
