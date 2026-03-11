
// // import { BrowserRouter, Routes, Route } from "react-router-dom";

// // /* AUTH */
// // import Home from "./pages/Auth/Home";
// // import Login from "./pages/Auth/Login";
// // import Register from "./pages/Auth/Register";
// // import ForgotPassword from "./pages/Auth/ForgotPassword";
// // import ResetPassword from "./pages/Auth/ResetPassword";

// // /* USER */
// // import UserDashboard from "./pages/Users/UserDashboard";
// // import MyEvents from "./pages/Users/MyEvents";
// // import MyBookings from "./pages/Users/MyBookings";
// // import UserProfile from "./pages/Users/UserProfile";

// // /* VENDOR */
// // import VendorDashboard from "./pages/Vendor/VendorDashboard";
// // import VendorBookings from "./pages/Vendor/VendorBookings";
// // import VendorAvailability from "./pages/Vendor/VendorAvailability";
// // import VendorPortfolio from "./pages/Vendor/VendorPortfolio";
// // import VendorAddEvent from "./pages/Vendor/VendorAddEvent";
// // import VendorMyEvents from "./pages/Vendor/VendorMyEvents";

// // /* ADMIN */
// // import AdminDashboard from "./pages/Admin/AdminDashboard";
// // import ManageUsers from "./pages/Admin/ManageUsers";
// // import ManageVendors from "./pages/Admin/ManageVendors";
// // import ManageEvents from "./pages/Admin/ManageEvents";
// // import ManageReports from "./pages/Admin/ManageReports";
// // import AddEvent from "./pages/Admin/AddEvent";
// // import PendingEvents from "./pages/Admin/PendingEvents";

// // /* EVENTS */
// // import EventPanel from "./pages/Events/EventPanel";
// // import EventList from "./pages/Events/EventList";
// // import EditEvent from "./pages/Events/EditEvent";

// // /* BOOKING */
// // import Step1PersonsCatering from "./pages/Booking/Step1PersonsCatering";
// // import Step2Services from "./pages/Booking/Step2Services";
// // import Step3Summary from "./pages/Booking/Step3Summary";
// // import Step4Payment from "./pages/Booking/Step4Payment";
// // import Step5Confirmation from "./pages/Booking/Step5Confirmation";

// // /* PAYMENT */
// // import PaymentPage from "./pages/Payments/PaymentPage";
// // import PaymentStatus from "./pages/Payments/PaymentStatus";

// // /* GALLERY */
// // import EventGallery from "./pages/Gallery/EventGallery";
// // import VendorGallery from "./pages/Gallery/VendorGallery";

// // /* FEEDBACK */
// // import Rating from "./pages/Feedback/Ratings";
// // import Reviews from "./pages/Feedback/Reviews";

// // function App() {
// //   return (
// //     <BrowserRouter>
// //       <Routes>

// //         {/* AUTH */}
// //         <Route path="/" element={<Home />} />
// //         <Route path="/login" element={<Login />} />
// //         <Route path="/register" element={<Register />} />
// //         <Route path="/forgot-password" element={<ForgotPassword />} />
// //         <Route path="/reset-password" element={<ResetPassword />} />

// //         {/* USER */}
// //         <Route path="/users/dashboard" element={<UserDashboard />}>
// //           <Route index element={<MyEvents />} />
// //           <Route path="my-events" element={<MyEvents />} />
// //           <Route path="my-bookings" element={<MyBookings />} />
// //           <Route path="profile" element={<UserProfile />} />
// //         </Route>

// //         {/* VENDOR */}
// //         <Route path="/vendor/dashboard" element={<VendorDashboard />}>
// //           <Route index element={<VendorBookings />} />
// //           <Route path="bookings" element={<VendorBookings />} />
// //           <Route path="add-event" element={<VendorAddEvent />} />
// //           <Route path="my-events" element={<VendorMyEvents />} />
// //           <Route path="availability" element={<VendorAvailability />} />
// //           <Route path="portfolio" element={<VendorPortfolio />} />
// //         </Route>

// //         {/* ADMIN */}
// //         <Route path="/admin/dashboard" element={<AdminDashboard />}>
// //           <Route index element={<ManageUsers />} />
// //           <Route path="users" element={<ManageUsers />} />
// //           <Route path="vendors" element={<ManageVendors />} />
// //           <Route path="events" element={<ManageEvents />} />
// //           {/* <Route path="pending-events" element={<PendingEvents />} /> */}
// //           <Route path="/admin/pending-events" element={<PendingEvents />} />

// //           <Route path="add-event" element={<AddEvent />} />
// //           <Route path="reports" element={<ManageReports />} />
// //         </Route>

// //         {/* EVENTS */}
// //         <Route path="/events" element={<EventPanel />} />
// //         <Route path="/events/list" element={<EventList />} />
// //         <Route path="/events/edit/:id" element={<EditEvent />} />

// //         {/* BOOKING */}
// //         <Route path="/booking/step1" element={<Step1PersonsCatering />} />
// //         <Route path="/booking/step2" element={<Step2Services />} />
// //         <Route path="/booking/step3" element={<Step3Summary />} />
// //         <Route path="/booking/payment" element={<Step4Payment />} />
// //         <Route path="/booking/confirmation" element={<Step5Confirmation />} />

// //         {/* PAYMENT */}
// //         <Route path="/payment" element={<PaymentPage />} />
// //         <Route path="/payment/:id" element={<PaymentPage />} />
// //         <Route path="/payment-status" element={<PaymentStatus />} />

// //         {/* GALLERY */}
// //         <Route path="/gallery/event" element={<EventGallery />} />
// //         <Route path="/gallery/vendor" element={<VendorGallery />} />

// //         {/* FEEDBACK */}
// //         <Route path="/feedback" element={<Rating />} />
// //         <Route path="/feedback/:eventId" element={<Reviews />} />

// //       </Routes>
// //     </BrowserRouter>
// //   );
// // }

// // export default App;








// import { BrowserRouter, Routes, Route } from "react-router-dom";

// /* AUTH */
// import Home from "./pages/Auth/Home";
// import Login from "./pages/Auth/Login";
// import Register from "./pages/Auth/Register";
// import ForgotPassword from "./pages/Auth/ForgotPassword";
// import ResetPassword from "./pages/Auth/ResetPassword";

// /* USER */
// import UserDashboard from "./pages/Users/UserDashboard";
// import MyEvents from "./pages/Users/MyEvents";
// import MyBookings from "./pages/Users/MyBookings";
// import UserProfile from "./pages/Users/UserProfile";

// /* VENDOR */
// import VendorDashboard from "./pages/Vendor/VendorDashboard";
// import VendorBookings from "./pages/Vendor/VendorBookings";
// import AddService from "./pages/Vendor/AddService";

// import VendorAvailability from "./pages/Vendor/VendorAvailability";
// import VendorPortfolio from "./pages/Vendor/VendorPortfolio";
// import VendorAddEvent from "./pages/Vendor/VendorAddEvent";
// import VendorMyEvents from "./pages/Vendor/VendorMyEvents";
// import MyServices from "./pages/Vendor/MyServices";

// /* ADMIN */
// import AdminDashboard from "./pages/Admin/AdminDashboard";
// import ManageUsers from "./pages/Admin/ManageUsers";
// import ManageVendors from "./pages/Admin/ManageVendors";
// import ManageEvents from "./pages/Admin/ManageEvents";
// import ManageReports from "./pages/Admin/ManageReports";
// import AddEvent from "./pages/Admin/AddEvent";
// import PendingEvents from "./pages/Admin/PendingEvents";
// import AllServices from "./pages/Admin/AllServices";

// /* EVENTS */
// import EventPanel from "./pages/Events/EventPanel";
// import EventList from "./pages/Events/EventList";
// import EditEvent from "./pages/Events/EditEvent";

// /* BOOKING */
// import Step1PersonsCatering from "./pages/Booking/Step1PersonsCatering";
// import Step2Services from "./pages/Booking/Step2Services";
// import Step3Summary from "./pages/Booking/Step3Summary";
// import Step4Payment from "./pages/Booking/Step4Payment";
// import Step5Confirmation from "./pages/Booking/Step5Confirmation";

// /* PAYMENT */
// import PaymentPage from "./pages/Payments/PaymentPage";
// import PaymentStatus from "./pages/Payments/PaymentStatus";

// /* GALLERY */
// import EventGallery from "./pages/Gallery/EventGallery";
// import VendorGallery from "./pages/Gallery/VendorGallery";

// /* FEEDBACK */
// import Rating from "./pages/Feedback/Ratings";
// import Reviews from "./pages/Feedback/Reviews";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>

//         {/* AUTH */}
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/reset-password" element={<ResetPassword />} />

//         {/* USER */}
//         <Route path="/users/dashboard" element={<UserDashboard />}>
//           <Route index element={<MyEvents />} />
//           <Route path="my-events" element={<MyEvents />} />
//           <Route path="my-bookings" element={<MyBookings />} />
//           <Route path="profile" element={<UserProfile />} />
//         </Route>

//         {/* VENDOR */}
//         <Route path="/vendor/dashboard" element={<VendorDashboard />}>
//           <Route index element={<VendorBookings />} />
//           <Route path="bookings" element={<VendorBookings />} />
//           <Route path="add-event" element={<VendorAddEvent />} />
//           <Route path="add-service" element={<AddService />} />
//           <Route path="/vendor/services" element={<MyServices />} />
//           <Route path="my-events" element={<VendorMyEvents />} />
//           <Route path="availability" element={<VendorAvailability />} />
//           <Route path="portfolio" element={<VendorPortfolio />} />
//         </Route>

//         {/* ADMIN */}
//         <Route path="/admin/dashboard" element={<AdminDashboard />}>
//           <Route index element={<ManageUsers />} />
//           <Route path="users" element={<ManageUsers />} />
//           <Route path="vendors" element={<ManageVendors />} />
//           <Route path="events" element={<ManageEvents />} />
//           <Route path="services" element={<AllServices />} />



//           {/* ✅ FIXED */}
//           <Route path="pending-events" element={<PendingEvents />} />

//           <Route path="add-event" element={<AddEvent />} />
//           <Route path="reports" element={<ManageReports />} />
//         </Route>

//         {/* EVENTS */}
//         <Route path="/events" element={<EventPanel />} />
//         <Route path="/events/list" element={<EventList />} />
//         <Route path="/events/edit/:id" element={<EditEvent />} />

//         {/* BOOKING */}
//         <Route path="/booking/step1" element={<Step1PersonsCatering />} />
//         <Route path="/booking/step2" element={<Step2Services />} />
//         <Route path="/booking/step3" element={<Step3Summary />} />
//         <Route path="/booking/payment" element={<Step4Payment />} />
//         <Route path="/booking/confirmation" element={<Step5Confirmation />} />

//         {/* PAYMENT */}
//         <Route path="/payment" element={<PaymentPage />} />
//         <Route path="/payment/:id" element={<PaymentPage />} />
//         <Route path="/payment-status" element={<PaymentStatus />} />

//         {/* GALLERY */}
//         <Route path="/gallery/event" element={<EventGallery />} />
//         <Route path="/gallery/vendor" element={<VendorGallery />} />

//         {/* FEEDBACK */}
//         <Route path="/feedback" element={<Rating />} />
//         <Route path="/feedback/:eventId" element={<Reviews />} />

//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;









import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastProvider, ConfirmProvider } from "./components/Toast";

/* AUTH */
import Home from "./pages/Auth/Home";
import About from "./pages/Auth/About";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";

/* USER */
import UserDashboard from "./pages/Users/UserDashboard";
import MyEvents from "./pages/Users/MyEvents";
import MyBookings from "./pages/Users/MyBookings";
import UserProfile from "./pages/Users/UserProfile";
import UserGallery from "./pages/Users/UserGallery";
import MyFeedback from "./pages/Users/MyFeedback";
import MyPayments from "./pages/Users/MyPayments";

/* VENDOR */
import VendorDashboard from "./pages/Vendor/VendorDashboard";
import VendorBookings from "./pages/Vendor/VendorBookings";
import VendorAddEvent from "./pages/Vendor/VendorAddEvent";
import VendorMyEvents from "./pages/Vendor/VendorMyEvents";
import VendorAvailability from "./pages/Vendor/VendorAvailability";
import VendorProfile from "./pages/Vendor/VendorProfile";
import AddService from "./pages/Vendor/AddService";
import MyServices from "./pages/Vendor/MyServices";
import VendorFeedback from "./pages/Vendor/VendorFeedback";
import ManageMenu from "./pages/Vendor/ManageMenu";

/* ADMIN */
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ManageUsers from "./pages/Admin/ManageUsers";
import ManageVendors from "./pages/Admin/ManageVendors";
import ManageEvents from "./pages/Admin/ManageEvents";
import ManageReports from "./pages/Admin/ManageReports";
import AddEvent from "./pages/Admin/AddEvent";
import PendingEvents from "./pages/Admin/PendingEvents";
import AllServices from "./pages/Admin/AllServices";
import ManageGallery from "./pages/Admin/ManageGallery";
import ManageBookings from "./pages/Admin/ManageBookings";
import ManageFeedback from "./pages/Admin/ManageFeedback";
import ManageCancellations from "./pages/Admin/ManageCancellations";

/* EVENTS */
import EventPanel from "./pages/Events/EventPanel";
import EventList from "./pages/Events/EventList";
import EditEvent from "./pages/Events/EditEvent";

/* BOOKING */
import Step1PersonsCatering from "./pages/Booking/Step1PersonsCatering";
import Step2Services from "./pages/Booking/Step2Services";
import Step3Summary from "./pages/Booking/Step3Summary";
import Step4Payment from "./pages/Booking/Step4Payment";
import Step5Confirmation from "./pages/Booking/Step5Confirmation";
import CateringMenu from "./pages/Booking/CateringMenu";

/* PAYMENT */
import PaymentPage from "./pages/Payments/PaymentPage";
import PaymentStatus from "./pages/Payments/PaymentStatus";

/* GALLERY */
import EventGallery from "./pages/Gallery/EventGallery";
import VendorGallery from "./pages/Gallery/VendorGallery";

/* FEEDBACK */
import Rating from "./pages/Feedback/Ratings";
import Reviews from "./pages/Feedback/Reviews";

function App() {
  return (
    <ToastProvider>
      <ConfirmProvider>
        <BrowserRouter>
          <Routes>

            {/* AUTH */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* USER */}
            <Route path="/users/dashboard" element={<UserDashboard />}>
              <Route index element={<MyEvents />} />
              <Route path="my-events" element={<MyEvents />} />
              <Route path="my-bookings" element={<MyBookings />} />
              <Route path="payments" element={<MyPayments />} />
              <Route path="gallery" element={<UserGallery />} />
              <Route path="feedback" element={<MyFeedback />} />
              <Route path="profile" element={<UserProfile />} />
            </Route>

            {/* VENDOR */}
            <Route path="/vendor/dashboard" element={<VendorDashboard />}>
              <Route index element={<VendorBookings />} />
              <Route path="bookings" element={<VendorBookings />} />
              <Route path="add-event" element={<VendorAddEvent />} />
              <Route path="add-service" element={<AddService />} />
              <Route path="services" element={<MyServices />} />
              <Route path="menu" element={<ManageMenu />} />
              <Route path="my-events" element={<VendorMyEvents />} />
              <Route path="availability" element={<VendorAvailability />} />
              <Route path="profile" element={<VendorProfile />} />
              <Route path="feedback" element={<VendorFeedback />} />
            </Route>

            {/* ADMIN */}
            <Route path="/admin/dashboard" element={<AdminDashboard />}>
              <Route index element={<ManageUsers />} />
              <Route path="users" element={<ManageUsers />} />
              <Route path="vendors" element={<ManageVendors />} />
              <Route path="events" element={<ManageEvents />} />
              <Route path="services" element={<AllServices />} />
              <Route path="pending-events" element={<PendingEvents />} />
              <Route path="gallery" element={<ManageGallery />} />
              <Route path="bookings" element={<ManageBookings />} />
              <Route path="feedback" element={<ManageFeedback />} />
              <Route path="cancellations" element={<ManageCancellations />} />
              <Route path="add-event" element={<AddEvent />} />
              <Route path="reports" element={<ManageReports />} />
            </Route>

            {/* EVENTS */}
            <Route path="/events" element={<EventList />} />

            {/* BOOKING */}
            <Route path="/booking/step1" element={<Step1PersonsCatering />} />
            <Route path="/booking/step2" element={<Step2Services />} />
            <Route path="/booking/step3" element={<Step3Summary />} />
            <Route path="/booking/payment" element={<Step4Payment />} />
            <Route path="/booking/confirmation" element={<Step5Confirmation />} />
            <Route path="/booking/catering-menu" element={<CateringMenu />} />

            {/* PAYMENT */}
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/payment/:id" element={<PaymentPage />} />
            <Route path="/payment-status" element={<PaymentStatus />} />

            {/* GALLERY */}
            <Route path="/gallery/event" element={<EventGallery />} />
            <Route path="/gallery/vendor" element={<VendorGallery />} />

            {/* FEEDBACK */}
            <Route path="/feedback" element={<Rating />} />
            <Route path="/feedback/:eventId" element={<Reviews />} />

          </Routes>
        </BrowserRouter>
      </ConfirmProvider>
    </ToastProvider>
  );
}

export default App;
