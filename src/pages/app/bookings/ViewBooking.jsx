import { useLocation } from "react-router-dom";
import ProfileImage from "../../../components/ProfileImage";
import { AvatarSM } from "../../../components/svg/Avatar";
import { formatDate, numberFormatter } from "../../../utils";
import Switch from "../../../components/Switch";
import Button from "../../../components/Button";
import useBookings from "../../../hooks/api/useBookings";
import CurrencyInput from "../../../components/CurrencyInput";
import Input from "../../../components/Input";
import { useState } from "react";
import banks from "../../../utils/banks";

function ViewBooking() {
  const [checkedOut, setCheckedout] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [refundNote, setRefundNote] = useState("");
  const [refundMethod, setRefundMethod] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [cautionDeposite, setCautionDeposite] = useState(0);
  const {
    state: { booking },
  } = useLocation();
  const [refundAmount, setRefundAmount] = useState(
    booking.cautionDeposite || 0
  );
  const { checkInBooking, checkOutBooking, isLoading } = useBookings();
  const { refundDeposite, isLoading: depositeLoading } = useBookings();
  const { confirmDeposite, isLoading: paymentLoading } = useBookings();

  return (
    <div>
      <div className="hover flex booking border">
        <div className="user flex align-center">
          <div className="img flex justify-center align-center">
            <ProfileImage svg={<AvatarSM />} />
          </div>
          <div>
            <h3 className="t-primary">
              {booking.firstName} {booking.lastName}
            </h3>
            <span>
              <a
                href={`mailto:${booking.email}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {booking.email}
              </a>{" "}
              |{" "}
              <a
                href={`mailto:${booking.phoneNumber}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {booking.phoneNumber}
              </a>
            </span>
          </div>
        </div>
        <div className="info">
          <h3 className="t-primary">Manage Booking</h3>
          <br />
          <Button
            disabled={
              !(booking.status === "active" || booking.status === "checkedin")
            }
            className={booking.status === "active" ? "checkedin" : "checkedout"}
            loading={isLoading}
            onClick={() =>
              booking.status === "active"
                ? checkInBooking(booking._id)
                : checkOutBooking(booking._id, () => setCheckedout(true))
            }
            style={{ height: 40 }}
            title={booking.status === "active" ? "Checked In" : "Checked Out"}
          />
        </div>
      </div>
      {booking.onHold && !booking.transaction.amountPaid && !isDone && (
        <>
          <br />
          <div className="hover booking border">
            <div className="info">
              <h3 className="t-primary">Reservation Payment</h3>
              <br />
            </div>
            <CurrencyInput
              value={refundAmount}
              onChange={setRefundAmount}
              placeholder="Amount"
            />
            <CurrencyInput
              value={cautionDeposite}
              onChange={setCautionDeposite}
              placeholder="Caution Deposite"
            />

            <div className="flex justify-between">
              <select onChange={(v) => setRefundMethod(v.target.value)}>
                <option value="">Payment Method</option>
                <option value="cash">Cash</option>
                <option value="bank-transfer">Bank Transfer</option>
              </select>
              <Button
                loading={paymentLoading}
                onClick={() =>
                  confirmDeposite(
                    booking._id,
                    {
                      method: refundMethod,
                      amount: refundAmount,
                      cautionDeposite,
                    },
                    () => setIsDone(true)
                  )
                }
                disabled={!refundAmount || !refundMethod || !cautionDeposite}
                style={{ marginBottom: 0 }}
                className="btn-submit"
                title="Save"
              />
            </div>
          </div>
        </>
      )}
      <br />
      {((booking.status === "checkedout" && !booking.cautionRefund.amount) ||
        checkedOut) && (
        <>
          <div className="hover booking border">
            <div className="info">
              <h3 className="t-primary">Caution Deposite Refund</h3>
              <br />
            </div>
            <CurrencyInput
              value={refundAmount}
              onChange={setRefundAmount}
              placeholder="Amount"
            />
            <Input
              value={accountNumber}
              onChange={setAccountNumber}
              placeholder="Account Number"
            />
            <div className="input">
              <select
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
              >
                <option value="">Bank Name</option>
                {banks.map((b, idx) => (
                  <option value={b.bankName}>{b.bankName}</option>
                ))}
              </select>
            </div>
            <Input
              value={refundNote}
              onChange={setRefundNote}
              placeholder="Note"
            />
            <div className="flex justify-between">
              <select onChange={(v) => setRefundMethod(v.target.value)}>
                <option value="">Refund Method</option>
                <option value="cash">Cash</option>
                <option value="bank-transfer">Bank Transfer</option>
              </select>
              <Button
                loading={depositeLoading}
                onClick={() =>
                  refundDeposite(booking._id, {
                    method: refundMethod,
                    amount: refundAmount,
                    note: refundNote,
                    accountNumber,
                    bankName,
                  })
                }
                disabled={!refundAmount || !refundMethod}
                style={{ marginBottom: 0 }}
                className="btn-submit"
                title="Save"
              />
            </div>
          </div>
          <br />
        </>
      )}

      <div className="hover booking border">
        <h3 className="t-primary">Booking Information</h3>
        <table className="btable">
          <tr>
            <td>Apartment: </td>
            <td>{booking.apartment.name}</td>
          </tr>
          <tr>
            <td>From Date: </td>
            <td>{formatDate(new Date(booking.from))}</td>
          </tr>
          <tr>
            <td>To Date: </td>
            <td>{formatDate(new Date(booking.to))}</td>
          </tr>
          <tr>
            <td>Check-In Date: </td>
            <td>
              {booking.checkedIn
                ? formatDate(new Date(booking.checkedIn))
                : "-"}
            </td>
          </tr>
          <tr>
            <td>Check-Out Date: </td>
            <td>
              {booking.checkedOut
                ? formatDate(new Date(booking.checkedOut))
                : "-"}
            </td>
          </tr>
          <tr>
            <td>Booking Status: </td>
            <td>
              <span className={`status ${booking.status}`}>
                {booking.status}
              </span>
            </td>
          </tr>
          <tr>
            <td>Booking Refrence: </td>
            <td>{booking.code}</td>
          </tr>
          <tr>
            <td>Amount to pay: </td>
            <td>{numberFormatter(booking.transaction?.total || 0)}</td>
          </tr>
          <tr>
            <td>Amount paid: </td>
            <td>{numberFormatter(booking.transaction?.amountPaid || 0)}</td>
          </tr>
          <tr>
            <td>Booking fare: </td>
            <td>{numberFormatter(booking.transaction?.amount || 0)}</td>
          </tr>
          <tr>
            <td>Vat: </td>
            <td>
              {numberFormatter(booking.transaction?.vat?.toFixed(0) || 0)}
            </td>
          </tr>
          <tr>
            <td>Service Charge: </td>
            <td>
              {numberFormatter(
                booking.transaction?.serviceCharge?.toFixed(0) || 0
              )}
            </td>
          </tr>
          <tr>
            <td>Caution Deposite: </td>
            <td>{numberFormatter(booking.cautionDeposite || 0)}</td>
          </tr>
          <tr>
            <td>Caution Deposite Refund: </td>
            <td>
              {numberFormatter(booking.cautionRefund?.amount || 0)} - (
              {!booking.cautionRefund?.amount ? (
                <i>"Not refunded!"</i>
              ) : (
                `${booking.cautionRefund?.note} | ${booking.cautionRefund?.method} to ${booking.cautionRefund?.accountNumber} - ${booking.cautionRefund.bankName}`
              )}
              )
            </td>
          </tr>
          <tr>
            <td>Emergency Contact: </td>
            <td>
              {booking.emergencyContact?.name} (
              <a
                href={`tel:${booking.emergencyContact?.phoneNumber}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {booking.emergencyContact?.phoneNumber}
              </a>
              )
            </td>
          </tr>
          {!!booking.discountCode && (
            <>
              <tr>
                <td>Discount: </td>
                <td>
                  {booking.discountCode.type === "flat"
                    ? numberFormatter(booking.discountCode.discount)
                    : `${booking.discountCode.discount}%`}
                </td>
              </tr>
              {booking.discountCode.agent && (
                <tr>
                  <td>Associate: </td>
                  <td>{booking.discountCode.agent.name}</td>
                </tr>
              )}
            </>
          )}
        </table>
      </div>
      <br />
    </div>
  );
}

export default ViewBooking;
