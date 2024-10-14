import { createContext, useEffect, useState } from "react";
import { FaUser, FaBookReader } from "react-icons/fa";
import { BiRupee } from "react-icons/bi";

export const DataContext = createContext();

function Store({ children }) {
  // Dashboard Card Data
  const cardDAta = [
    {
      icon: <BiRupee />,
      bgColor: "#7b74ec",
      title: "8,282",
      descriptioin: "Fees Collection",
    },
    {
      icon: <FaUser />,
      bgColor: "#ea580cbf",
      title: "200,521",
      descriptioin: "Total Students",
    },
    {
      icon: <FaBookReader />,
      bgColor: "#e45d99",
      title: "15",
      descriptioin: "Available Courses",
    },
  ];

  // Add Student button handle

  const [popup, setPopup] = useState(false);

  const [btn, setBtn] = useState(false);

  const handleOnclick = () => {
    setUpdateData("");
    setBtn(false);
    setPopup(true);
  };
  const removeOnclick = () => {
    setPopup(false);
  };

  // Edit Student
  const [updateData, setUpdateData] = useState([]);

  const handleUpdate = (id) => {
    setBtn(true);
    setPopup(true);
    const updateData = addStudent[id];
    console.log(updateData);
    setUpdateData(updateData);
  };

  const handleContentClick = (e) => {
    e.stopPropagation();
  };
  // Add Student

  const addStudentHeading = [
    {
      headline: "NAME",
    },
    {
      headline: "INSTITUTION NAME",
    },
    {
      headline: "COURSE ENROLLED",
    },
    {
      headline: "",
    },
  ];

  // Add Student API Data
  const [addStudent, setAddStudent] = useState([]);
  const addStudentData = async () => {
    const listedStudent = await fetch(
      "https://mocki.io/v1/f556c11e-4966-4fd8-a33b-9c26b4295d67"
    );
    const data = await listedStudent.json();
    setAddStudent(data);
  };
  useEffect(() => {
    addStudentData();
  }, []);
  // Dashboard StudenList Headings

  const studentHeading = [
    {
      headline: "NAME",
    },
    {
      headline: "TITLE",
    },
    {
      headline: "STATUS",
    },
    {
      headline: "COURSE",
    },
  ];

  // Dashboard StudentList
  const [studentsList, setStudentList] = useState([]);
  const studentList = async () => {
    const studentListData = await fetch(
      "https://mocki.io/v1/bab9648e-2c95-45a9-bc0b-6f9c92c3ca78"
    );
    const studentData = await studentListData.json();
    setStudentList(studentData);
  };
  useEffect(() => {
    studentList();
  }, []);



  // course page Api Data
  const [Button, setButton] = useState(false);
  const [courses, setCourses] = useState([]);
  const [courseImage, setCourseImage] = useState("");
  const [courseName, setCourseName] = useState("");
  const [coursePopup, setCoursePopup] = useState(false);
  const [updateCourseData, setUpdateCourseData] = useState(null);

  // Fetch courses on component mount
  useEffect(() => {
    const showCourses = async () => {
      try {
        const response = await fetch("http://localhost:3000/courses");
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    showCourses();
  }, []);

  // Open popup for adding/updating course
  const handleCoursePopup = () => {
    setCoursePopup(true);
    setButton(false);
    setCourseImage("");
    setCourseName("");
    setUpdateCourseData(null);
  };

  // Close popup
  const removeCoursePopup = () => {
    setCoursePopup(false);
  };

  const contentCoursePopup = (e) => {
    e.stopPropagation();
  };

  // Handle adding a new course
  const handleAddCourse = async () => {
    if (courseImage === "" || courseName === "") {
      return alert("All fields are required");
    }

    const newCourseData = {
      title: courseName,
      institute: "Default Institute", // Set default or dynamic institute if needed
      studentsEnrolled: 0, // Set initial value
      fee: 0, // Set initial value
    };

    try {
      const response = await fetch("http://localhost:3000/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCourseData),
      });

      const addedCourse = await response.json();
      setCourses([addedCourse.newCourse, ...courses]); // Adjust based on response structure
      setCourseImage("");
      setCourseName("");
      setCoursePopup(false);
      setButton(false);
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  // Handle deleting a course
  const deleteCourseItem = async (id) => {
    const deleted = confirm("Are you sure you want to delete this course?");

    if (deleted) {
      try {
        await fetch(`http://localhost:3000/courses/${id}`, {
          method: "DELETE",
        });
        const remainingCourses = courses.filter((item) => item._id !== id);
        setCourses(remainingCourses);
      } catch (error) {
        console.error("Error deleting course:", error);
      }
    }
  };

  // Handle editing course data
  const editCourseData = (index) => {
    setCoursePopup(true);
    const courseToEdit = courses[index];
    console.log(courseToEdit)
    setCourseImage(courseToEdit.image || ""); // Add a default if necessary
    setCourseName(courseToEdit.title);
    setUpdateCourseData(courseToEdit);
    setButton(true);
  };

  // Handle updating a course
  const handleCourseUpdate = async () => {
    if (courseImage === "" || courseName === "") {
      return alert("All fields are required");
    }

    try {
      const response = await fetch(`http://localhost:3000/courses/${updateCourseData._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: courseName,
          institute: updateCourseData.institute,
          studentsEnrolled: updateCourseData.studentsEnrolled,
          fee: updateCourseData.fee,
        }),
      });

      const updatedCourse = await response.json();
      setCourses((prev) =>
        prev.map((course) => (course._id === updatedCourse.updatedCourse._id ? updatedCourse.updatedCourse : course))
      );

      setCoursePopup(false);
      setCourseImage("");
      setCourseName("");
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };


  
  // Announcement page

const [anTitle, setAnTitle] = useState("");
const [anDes, setAnDes] = useState("");
const [anbtn, setAnbtn] = useState(false);
const [announce, setAnnounce] = useState([]);
const [updateAnData, setupdateAnData] = useState(null);
const [announcPopup, setAnnouncePopup] = useState(false);

// Fetch announcements on component mount
useEffect(() => {
  const fetchAnnouncements = async () => {
    try {
      const response = await fetch("http://localhost:3000/announcements");
      const data = await response.json();
      setAnnounce(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };

  fetchAnnouncements();
}, []);

// Open popup for new announcement
const handleAnnouncementPopup = () => {
  setAnnouncePopup(true);
};

// Close popup and reset fields
const removeAnnouncementPopup = () => {
  setAnnouncePopup(false);
  setAnbtn(false);
  setAnDes("");
  setAnTitle("");
};

// Handle form submission for adding new announcement
// const handleAnFun = async () => {


//   try {
//     const formData = {
//       title: anTitle,
//       description: anDes,
//     };
//   console.log("form and ", formData.title, formData.descriptioin)
//     if (!formData.title || !formData.description) {
//       alert("All fields are required");
//       return;
//     }
//     // Send new announcement to the backend
//     const response = await fetch("http://localhost:3000/announcements", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(formData),
//     });

//     const newAnnouncement = await response.json();

//     // Update state to include new announcement
//     setAnnounce([newAnnouncement, ...announce]);

//     // Close popup and reset fields
//     setAnnouncePopup(false);
//     setAnbtn(false);
//     setAnDes("");
//     setAnTitle("");
//   } catch (error) {
//     console.error("Error adding announcement:", error);
//   }
// };

// Handle editing of an announcement
const handleAnnEdit = (id) => {
  setAnnouncePopup(true);
  setAnbtn(true);
  const updateAn = announce[id];
  console.log(updateAn)
  setupdateAnData(updateAn);
  setAnTitle(updateAn.title);
  setAnDes(updateAn.description);
};

// Handle form submission for updating an announcement
const updateAnFun = async () => {
  if (anTitle === "" || anDes === "") {
    return alert("All fields are required");
  }

  // console.log("updateAnData inside edit announcement", updateAnData)
  try {
    // Send updated announcement to the backend
    const response = await fetch(`http://localhost:3000/announcements/${updateAnData._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: anTitle, description: anDes }),
    });

    const updatedAnnouncement = await response.json();
    console.log(updatedAnnouncement.updatedAnnouncement._id)
    // Update state with the edited announcement
    setAnnounce((prev) =>
      prev.map((an) => (an._id === updatedAnnouncement.updatedAnnouncement._id ? updatedAnnouncement.updatedAnnouncement : an))
    );

    // Close popup and reset fields
    setAnnouncePopup(false);
    setAnbtn(false);
    setAnTitle("");
    setAnDes("");
  } catch (error) {
    console.error("Error updating announcement:", error);
  }
};


  const handleAnnouncmentContent = (e) => {
    e.stopPropagation();
  };






  return (
    <DataContext.Provider
      value={{
        cardDAta,
        studentsList,
        studentHeading,
        addStudentHeading,
        addStudent,
        handleOnclick,
        removeOnclick,
        popup,
        handleContentClick,
        setAddStudent,
        setPopup,
        handleUpdate,
        updateData,
        setUpdateData,
        btn,
        setBtn,
        courses,
        coursePopup,
        setCoursePopup,
        handleCoursePopup,
        removeCoursePopup,
        contentCoursePopup,
        courseImage,
        setCourseImage,
        courseName,
        setCourseName,
        handleAddCourse,
        deleteCourseItem,
        editCourseData,
        Button,
        setButton,
        handleCourseUpdate,
        announce,setAnnounce,
        handleAnnouncementPopup,
        announcPopup,
        setAnnouncePopup,
        removeAnnouncementPopup,
        handleAnnouncmentContent,
        anTitle, setAnTitle,
        anDes, setAnDes,
        // handleAnFun,
        handleAnnEdit, 
        setAnbtn, anbtn, 
        updateAnFun, 
        // editAnData, 
        // editAnData
        // updateAnData, setupdateAnData
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default Store;