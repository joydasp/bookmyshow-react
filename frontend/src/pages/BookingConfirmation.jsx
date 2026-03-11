import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import jsPDF from "jspdf";
import { getMovieDetails } from "../services/omdb";
import "./BookingConfirmation.css";

const BookingConfirmation = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;

    const fetchBooking = async () => {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/bookings/${id}`);
      const data = await res.json();

      const hasTitle = Boolean(
        data?.movieTitle?.trim?.() || data?.title?.trim?.() || data?.movieName?.trim?.()
      );

      if (!hasTitle && data?.imdbID) {
        try {
          const movie = await getMovieDetails(data.imdbID);
          if (movie?.Title) {
            data.movieTitle = movie.Title;
          }
        } catch {
          // Keep existing booking data if OMDb lookup fails
        }
      }

      if (isMounted) {
        setBooking(data);
      }
    };

    fetchBooking();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (!booking) return <h2 className="booking-loading">Loading...</h2>;

  const snacks = booking.snacks?.length ? booking.snacks : location.state?.snacks || [];
  const snackTotal = Number(booking.snackTotal) || snacks.reduce((sum, s) => sum + s.price, 0);
  const totalPaidValue = (Number(booking.totalAmount) || 0) ;

  const resolvedMovieTitle =
    booking.movieTitle?.trim?.() ||
    booking.title?.trim?.() ||
    booking.movieName?.trim?.() ||
    "Movie Title Not Available";

  const downloadTicket = () => {
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();
    const ticketX = 15;
    const ticketY = 20;
    const ticketWidth = pageWidth - 30;
    const headerHeight = 28;
    const bodyHeight = 142;
    const seats = booking.seats?.length ? booking.seats.join(", ") : "N/A";
    const totalPaid = `Rs. ${totalPaidValue.toLocaleString("en-IN")}`;
    const createdAt = booking.createdAt
      ? new Date(booking.createdAt).toLocaleString("en-IN")
      : new Date().toLocaleString("en-IN");

    doc.setDrawColor(204, 214, 221);
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(ticketX, ticketY, ticketWidth, headerHeight + bodyHeight, 3, 3, "FD");

    doc.setFillColor(227, 28, 37);
    doc.roundedRect(ticketX, ticketY, ticketWidth, headerHeight, 3, 3, "F");
    doc.setFillColor(227, 28, 37);
    doc.rect(ticketX, ticketY + 3, ticketWidth, headerHeight - 3, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("JUSTTICKETIT", ticketX + 8, ticketY + 11);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("E-TICKET", ticketX + 8, ticketY + 18);
    doc.text(`Booking ID: ${booking._id}`, ticketX + 8, ticketY + 24);

    let currentY = ticketY + headerHeight + 10;
    doc.setTextColor(28, 28, 30);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    const movieTitleLines = doc.splitTextToSize(resolvedMovieTitle, ticketWidth - 16);
    doc.text(movieTitleLines, ticketX + 8, currentY);
    currentY += movieTitleLines.length * 6 + 4;

    doc.setDrawColor(230, 234, 238);
    doc.line(ticketX + 8, currentY, ticketX + ticketWidth - 8, currentY);
    currentY += 8;

    const drawInfoRow = (label, value) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(99, 115, 129);
      doc.text(label, ticketX + 8, currentY);

      doc.setFont("helvetica", "normal");
      doc.setTextColor(17, 24, 39);
      const valueLines = doc.splitTextToSize(String(value), ticketWidth - 54);
      doc.text(valueLines, ticketX + 46, currentY);
      currentY += Math.max(7, valueLines.length * 5.2 + 1);
    };

    drawInfoRow("Theatre", booking.theatre || "N/A");
    drawInfoRow("Show Time", booking.showTime || "N/A");
    drawInfoRow("Seats", seats);
    // Show snack items
if (snacks.length > 0) {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(99, 115, 129);
  doc.text("Snacks", ticketX + 8, currentY);

  currentY += 6;

  doc.setFont("helvetica", "normal");
  doc.setTextColor(17, 24, 39);

  snacks.forEach((snack) => {
    doc.text(
      `${snack.name} - Rs. ${snack.price}`,
      ticketX + 12,
      currentY
    );
    currentY += 5;
  });

  currentY += 3;

  doc.setFont("helvetica", "bold");
  doc.text(`Snacks Total: Rs. ${snackTotal}`, ticketX + 8, currentY);

  currentY += 8;
} else {
  drawInfoRow("Snacks", "None");
}

    drawInfoRow("Amount Paid", totalPaid);

    currentY += 2;
    doc.setDrawColor(230, 234, 238);
    doc.line(ticketX + 8, currentY, ticketX + ticketWidth - 8, currentY);
    currentY += 8;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(99, 115, 129);
    doc.text(`Booked on: ${createdAt}`, ticketX + 8, currentY);
    doc.text("Please carry a valid ID proof to the theatre.", ticketX + 8, currentY + 6);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(227, 28, 37);
    doc.text("Enjoy the show!", ticketX + 8, currentY + 14);

    const safeMovieName = (resolvedMovieTitle || "ticket")
      .replace(/[^a-z0-9]/gi, "_")
      .slice(0, 30);
    doc.save(`ticket_${safeMovieName}.pdf`);
  };

  return (
    <div className="booking-page">
      <div className="booking-card">
        <h1>Booking Confirmed</h1>
        <p>
          <strong>Movie:</strong> {resolvedMovieTitle}
        </p>
        <p>
          <strong>Theatre:</strong> {booking.theatre}
        </p>
        <p>
          <strong>Show Time:</strong> {booking.showTime}
        </p>
        <p>
          <strong>Seats:</strong> {booking.seats ? booking.seats.join(", ") : "N/A"}
        </p>

        <h3>Food and Beverages</h3>
        {snacks.length === 0 ? (
          <p>No snacks selected</p>
        ) : (
          <ul>
            {snacks.map((snack) => (
              <li key={`${snack.id}-${snack.name}`}>
                {snack.name} - Rs. {snack.price}
              </li>
            ))}
          </ul>
        )}

        <p>Snacks Total: Rs. {snackTotal}</p>
        <h3>Total Paid: Rs. {totalPaidValue}</h3>

        <button className="booking-download-btn" onClick={downloadTicket}>
          Download Ticket
        </button>
      </div>
    </div>
  );
};

export default BookingConfirmation;
