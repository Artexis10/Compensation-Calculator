import { numberToLocaleString } from "../js/functions";

export default function Result({
  compensationDays,
  netCompensation,
  dailyAllowance,
}) {
  return (
    <div className="result">
      <p className="compensation-days">
        The employer compensates <b>{compensationDays} days</b>
      </p>
      <p className="amount-of-compensation">
        {numberToLocaleString(netCompensation)}€
      </p>
      <p className="daily-allowance">
        Daily allowance <br />
        {numberToLocaleString(dailyAllowance)} €
      </p>
    </div>
  );
}
