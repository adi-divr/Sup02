import Slotform from "./slotform/SlotForm";
import Calendar from "./Components/Calendar";
import AdminViewPage from "./admin/page";


const Page = () => {
  return (
    <div>
      <h1>Slot Booking</h1>
      {/* <Calendar /> */}
      <AdminViewPage/>
    </div>
  );
};  

export default Page;