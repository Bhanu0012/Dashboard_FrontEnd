import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../../Store/store";
import { Link } from "react-router-dom";
import { GrView } from "react-icons/gr";
import { AdminDataContext } from "../AdiminData";
import Loader from "../../../Components/Loader";

function PendingFeesStudents() {
const {loading} = useContext(AdminDataContext)

  const [studentPending, setStudentPending] = useState([]);
  const {token}=useContext(DataContext);
	const [searchTerm, setSearchTerm] = useState("");
const [filteredStudents, setFilteredStudents] = useState([]);
  const currentYear = new Date().getFullYear();
  const currentMonth = String(new Date().getMonth() + 1).padStart(2, "0"); // Ensure two digits

  const [penYear, setPenYear] = useState(`${currentYear}-${currentMonth}`);
  // Calculate min value (restrict future dates)
  const minYear = currentYear;
  const minMonth = currentMonth;
  const minDate = `${minYear}-${minMonth}`;

  // Fetch pending fees data
  const pending = async () => {
    try {
      const pendingFees = await fetch(
        `http://localhost:3000/fee-collection/payment-status/${penYear}`,{
          headers: {
            'Content-Type': 'application/json', // Set content type
            'Authorization': `Bearer ${token}` // Include the token in the Authorization header
          },
        }
      );
      const resPending = await pendingFees.json();
      console.log(resPending, "resPending");
      setStudentPending(resPending || []); // Safeguard for no data
    } catch (error) {
      console.error("Error fetching pending fees:", error);
    }
  };

  useEffect(() => {
    pending();
  }, [penYear]);


  // Filtered students effect
  const [currentPage, setCurrentPage] = useState(1);
      useEffect(() => {
        // Search by name
        setCurrentPage(1)
          const students = studentPending.filter((student) =>
            student.student.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
          );
       
    
    
        setFilteredStudents(students);
      }, [searchTerm,studentPending]);

      // Pagination logic 

      const itemsPerPage = 10; 
      
      
      const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
      const startIndex = (currentPage - 1) * itemsPerPage;
      const currentStudents = filteredStudents.slice(startIndex, startIndex + itemsPerPage);
      

  return (
    <>
    <div className="flex gap-[12px] mb-[10px]">
      <input
      className="rounded-[5px] p-[10px] text-[14px]"
        type="month"
        value={penYear}
        onChange={(e) => setPenYear(e.target.value)}
        max={minDate}
        placeholder={penYear}
      />
 {/* <div className="flex gap-4 mb-4 w-[97.5%]"> */}
 <input
        className="rounded-[5px]   border px-4 py-2 w-full"
          type="text"
          placeholder="Search by student name"
          
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
</div>

{!loading && currentStudents.length>0?

      <div className="flex flex-col">
        <div className="py-2 overflow-x-auto">
          <div className="inline-block min-w-full overflow-hidden align-middle  sm:rounded-lg border-b border-gray-200 ">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                    NAME
                  </th>
                  <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                    INSTITUTION NAME
                  </th>
                  <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                    Status
                  </th>
                  <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                    COURSE ENROLLED
                  </th>
                  <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                    Fee Pending
                  </th>
                  <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                    Payment Details
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">


                {currentStudents.map((items, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-10 h-10">
                          <img
                            className="w-10 h-10 rounded-full"
                            src={items.student.imageUrl}
                            alt=""
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium leading-5 text-gray-900">
                            {items.student.name}
                          </div>
                          <div className="text-sm leading-5 text-gray-500">
                            {items.student.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="text-sm leading-5 text-gray-500">
                        {items.student.institute_id
                          ? items.student.institute_id.institute_name
                          : "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                      <span className="bg-yellow-300 py-1 px-3 text-black text-sm font-bold rounded">
                        Pending
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                      {items.student.course_id ? items.student.course_id.courseName : "N/A"}
                    </td>
                    <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                      {items.pendingFee ? items.pendingFee : "N/A"}
                    </td>
                    <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                    <Link to={`/payment-details/${items?.student?._id}`} className="flex gap-3 items-center justify-center bg-[#4f46e5] text-white px-4 py-2 rounded-lg"> <GrView /> View Details</Link>
                    </td>
                  </tr>
                ))}
               


              </tbody>
            </table>
          </div>
        </div>

        {totalPages > 1 && (

<div className="flex justify-between items-center mt-4">
<button
  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
  disabled={currentPage === 1}
  className="border px-4 py-2 rounded-lg bg-[#4f46e5] text-white disabled:opacity-50"
>
  Previous
</button>
<span>Page {currentPage} of {totalPages}</span>
<button
  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
  disabled={currentPage === totalPages}
  className="border px-4 py-2 rounded-lg bg-[#4f46e5] text-white disabled:opacity-50"
>
  Next
</button>
</div>
)}


      </div>

:
<>
<Loader/>

</>


}

    </>
  );
}

export default PendingFeesStudents;
