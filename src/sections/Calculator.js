import { useEffect, useState } from "react";
import Result from "../components/Result";
import InputBox from "../components/InputBox";
import Label from "../components/Label";
import Input from "../components/Input";
import CompensationForm from "./CompensationForm";
import CompensationResult from "./CompensationResult";
import { numberToLocaleString } from "../js/functions";

export default function Calculator() {
  const [averageIncome, setAverageIncome] = useState("");
  const [sickLeaveDays, setSickLeaveDays] = useState("");
  const [hasTuberculosis, setHasTuberculosis] = useState(false);

  const [result, setResult] = useState({
    employeeCompensationDays: 0,
    employeeNetCompensation: 0,
    healthInsuranceCompensationDays: 0,
    healthInsuranceNetCompensation: 0,
    netCompensation: 0,
    dailyAllowance: 0,
    sickLeaveDays: sickLeaveDays,
  });

  const maximumInsuranceEventDuration = hasTuberculosis ? 240 : 182;
  const sickLeaveDaysNotPaidFor = 3;

  const clearValues = () => {
    setResult((prevState) => {
      for (let key in prevState) {
        prevState[key] = 0;
      }
      return { ...prevState };
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (sickLeaveDays < sickLeaveDaysNotPaidFor + 1) {
      clearValues();
      return;
    }

    setResult((prevState) => {
      const dailyAllowance = (averageIncome / 30) * 0.7 * 0.8;
      const employeeCompensationDays =
        sickLeaveDays >= 9 ? 5 : sickLeaveDays - sickLeaveDaysNotPaidFor;
      const employeeNetCompensation = employeeCompensationDays * dailyAllowance;
      const healthInsuranceCompensationDays =
        sickLeaveDays - (employeeCompensationDays + sickLeaveDaysNotPaidFor);
      const healthInsuranceNetCompensation =
        healthInsuranceCompensationDays * dailyAllowance;
      const netCompensation =
        employeeNetCompensation + healthInsuranceNetCompensation;

      return {
        ...prevState,
        employeeCompensationDays,
        employeeNetCompensation,
        healthInsuranceCompensationDays,
        healthInsuranceNetCompensation,
        netCompensation,
        dailyAllowance,
        sickLeaveDays,
      };
    });
  };

  useEffect(() => {
    const intRx = /\d/,
      integerChange = (event) => {
        if (
          event.key.length > 1 ||
          (!event.key === "-" && !event.currentTarget.value.length) ||
          intRx.test(event.key)
        )
          return;
        event.preventDefault();
      };

    for (let input of document.querySelectorAll(
      'input[type="number"][step="1"]'
    ))
      input.addEventListener("keydown", integerChange);

    return () => {
      for (let input of document.querySelectorAll(
        'input[type="number"][step="1"]'
      ))
        input.removeEventListener("keydown", integerChange);
    };
  }, []);

  return (
    <div className="calculator">
      <h4>Compensation Calculator</h4>
      <CompensationForm onSubmit={onSubmit}>
        <InputBox>
          <Label htmlFor="average-income">Average income</Label>
          <Input
            type="number"
            id="average-income"
            value={averageIncome}
            onChange={(e) => setAverageIncome(e.target.value)}
            suffix="€"
            step="1"
            pattern="/d+"
            min="0"
            max="1000000000000"
            required
          />
        </InputBox>
        <InputBox>
          <Label htmlFor="sick-leave">Days on sick-leave</Label>
          <Input
            type="number"
            id="sick-leave"
            value={sickLeaveDays}
            onChange={(e) => setSickLeaveDays(e.target.value)}
            suffix="days"
            step="1"
            pattern="/d+"
            min="0"
            max={maximumInsuranceEventDuration}
            required
          />
        </InputBox>
        <InputBox inline>
          <Input
            type="checkbox"
            id="tuberculosis"
            checked={hasTuberculosis}
            onChange={() => setHasTuberculosis((prevState) => !prevState)}
          />
          <Label htmlFor="tuberculosis">I have tuberculosis</Label>
        </InputBox>
        <Input className="submit-button" type="submit" value="Calculate" />
      </CompensationForm>
      <CompensationResult>
        <hr />
        <div className="results">
          <div className="wrapper">
            <Result
              compensationDays={result.employeeCompensationDays}
              netCompensation={result.employeeNetCompensation}
              dailyAllowance={result.dailyAllowance}
            />
            <Result
              compensationDays={result.healthInsuranceCompensationDays}
              netCompensation={result.healthInsuranceNetCompensation}
              dailyAllowance={result.dailyAllowance}
            />
          </div>
        </div>
        <hr />
        <div className="total">
          <p className="compensation-days">
            Compensation total for {result.sickLeaveDays || 0} days (net)
          </p>
          <p className="compensation-total">
            {numberToLocaleString(result.netCompensation)}€
          </p>
        </div>
      </CompensationResult>
    </div>
  );
}
