import React, { useState, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Add_Player() {
  const serverUrl = "https://ndca.onrender.com";
  const navigate = useNavigate();
  // Existing state variables
  // State variables
  const [adha_num, setadhar] = useState("");
  const [pfnmae, setfname] = useState("");
  const [pmname, setpmname] = useState("");
  const [plnmae, setlname] = useState("");
  const [gender, setGender] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [permanentAddress, setPermanentAddress] = useState("");
  const [correspondenceAddress, setCorrespondenceAddress] = useState("");
  const [isSameAsPermanent, setIsSameAsPermanent] = useState(false);
  const [dobCertNo, setDobCertNo] = useState("");
  const [dobCertDate, setDobCertDate] = useState("");
  const [dobCertPlace, setDobCertPlace] = useState("");
  const [schoolCertNo, setSchoolCertNo] = useState("");
  const [sscCertDate, setSscCertDate] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [guardianName, setGuardianName] = useState("");
  const [relationType, setRelationType] = useState("");
  const [guardianAddress, setGuardianAddress] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [dob, setDob] = useState(""); // Date of Birth
  const [age, setAge] = useState("");
  // const [club1, setclub1] = useState("");
  // const [club2, setclub2] = useState("");

  const [playerType, setPlayerType] = useState("");
  const [battingStyle, setBattingStyle] = useState("");
  const [bowlingStyle, setBowlingStyle] = useState("");
  const [battingPosition, setBattingPosition] = useState("");
  const [lastAssociation, setLastAssociation] = useState("");
  const [lastYear, setLastYear] = useState("");
  const [adharupload, setadharupload] = useState(""); // File upload state
  const [Birth_certificate, setBirth_certificate] = useState(""); // File upload state
  const [ssc_certificate, setssc_certificate] = useState(""); // File upload state
  const [school_lcertificate, setschool_lcertificate] = useState(""); // File upload state
  const [passport, setpassport] = useState(""); // File upload state
  const [sidebarToggled, setSidebarToggled] = useState(false); // State to track sidebar toggle
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    // Redirect to login page if not logged in
    const id = localStorage.getItem("id");
    if (!id) {
      navigate("/"); // If not logged in, redirect to Admin login page
    }
  }, [navigate]);

  useEffect(() => {
    if (dob) {
      const birthDate = new Date(dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }
      setAge(age);
    }
  }, [dob]);
  
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "adharupload") {
      setadharupload(files ? files[0] : null);
    } else if (name === "Birth_certificate") {
      setBirth_certificate(files ? files[0] : null);
    } else if (name === "ssc_certificate") {
      setssc_certificate(files ? files[0] : null);
    } else if (name === "school_lcertificate") {
      setschool_lcertificate(files ? files[0] : null);
    } else if (name === "passport") {
      setpassport(files ? files[0] : null);
    } else if (name === "correspondenceAddress") {
      setCorrespondenceAddress(value);
    } else {
      // Update other state variables as needed
      switch (name) {
        case "adha_num":
          setadhar(value);
          break;
        case "pfnmae":
          setfname(value);
          break;
        case "pmname":
          setpmname(value);
          break;
        case "plnmae":
          setlname(value);
          break;
        case "gender":
          setGender(value);
          break;
        case "bloodGroup":
          setBloodGroup(value);
          break;
        case "email":
          setEmail(value);
          break;
        case "mobile":
          setMobile(value);
          break;
        case "permanentAddress":
          setPermanentAddress(value);
          break;
        case "dobCertNo":
          setDobCertNo(value);
          break;
        case "dobCertDate":
          setDobCertDate(value);
          break;
        case "dobCertPlace":
          setDobCertPlace(value);
          break;
        case "schoolCertNo":
          setSchoolCertNo(value);
          break;
        case "sscCertDate":
          setSscCertDate(value);
          break;
        case "fatherName":
          setFatherName(value);
          break;
        case "motherName":
          setMotherName(value);
          break;
        case "guardianName":
          setGuardianName(value);
          break;
        case "relationType":
          setRelationType(value);
          break;
        case "guardianAddress":
          setGuardianAddress(value);
          break;
        case "emergencyContact":
          setEmergencyContact(value);
          break;
        case "dob":
          setDob(value);
          break;
        // case "club1":
        //   setclub1(value);
        //   break;
        // case "club2":
        //   setclub2(value);
        //   break;
        case "playerType":
          setPlayerType(value);
          break;
        case "battingStyle":
          setBattingStyle(value);
          break;
        case "bowlingStyle":
          setBowlingStyle(value);
          break;
        case "battingPosition":
          setBattingPosition(value);
          break;
        case "lastAssociation":
          setLastAssociation(value);
          break;
        case "lastYear":
          setLastYear(value);
          break;
        default:
          break;
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (
      !adha_num ||
      !pfnmae ||
      !plnmae ||
      !gender ||
      !email ||
      !mobile ||
      !dob ||
      !permanentAddress
    ) {
      console.error("Please fill in all required fields.");
      setErrorMessage("Please fill in all required fields.");
      return; // Stop form submission if validation fails
    }

    const teamId = localStorage.getItem("id"); // Get team ID from localStorage

    const formData = new FormData();
    formData.append("teamId", teamId); // Add teamId to the form data
    formData.append("adha_num", adha_num);
    formData.append("pfnmae", pfnmae);
    formData.append("pmname", pmname);
    formData.append("plnmae", plnmae);
    formData.append("gender", gender);
    formData.append("bloodGroup", bloodGroup);
    formData.append("email", email);
    formData.append("mobile", mobile);
    formData.append("permanentAddress", permanentAddress);
    formData.append(
      "correspondenceAddress",
      isSameAsPermanent ? permanentAddress : correspondenceAddress
    );
    formData.append("dobCertNo", dobCertNo);
    formData.append("dobCertDate", dobCertDate);
    formData.append("dobCertPlace", dobCertPlace);
    formData.append("schoolCertNo", schoolCertNo);
    formData.append("sscCertDate", sscCertDate);
    formData.append("fatherName", fatherName);
    formData.append("motherName", motherName);
    formData.append("guardianName", guardianName);
    formData.append("relationType", relationType);
    formData.append("guardianAddress", guardianAddress);
    formData.append("emergencyContact", emergencyContact);
    formData.append("dob", dob);
    formData.append("age", age);
    formData.append("playerType", playerType);
    formData.append("battingStyle", battingStyle);
    formData.append("bowlingStyle", bowlingStyle);
    formData.append("battingPosition", battingPosition);
    formData.append("lastAssociation", lastAssociation);
    formData.append("lastYear", lastYear);

    // Append file uploads
    if (adharupload) {
      formData.append("adharupload", adharupload);
    }

    if (Birth_certificate) {
      formData.append("Birth_certificate", Birth_certificate);
    }
    if (ssc_certificate) {
      formData.append("ssc_certificate", ssc_certificate);
    }
    if (school_lcertificate) {
      formData.append("school_lcertificate", school_lcertificate);
    }
    if (passport) {
      formData.append("passport", passport);
    }

    // Add status column with value "pending"
    formData.append("status", `pending`);

    try {
      const response = await axios.post(`${serverUrl}/add-player`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Clear the form
      setadhar("");
      setfname("");
      setpmname("");
      setlname("");
      setGender("");
      setBloodGroup("");
      setEmail("");
      setMobile("");
      setPermanentAddress("");
      setCorrespondenceAddress("");
      setIsSameAsPermanent(false);
      setDobCertNo("");
      setDobCertDate("");
      setDobCertPlace("");
      setSchoolCertNo("");
      setSscCertDate("");
      setFatherName("");
      setMotherName("");
      setGuardianName("");
      setRelationType("");
      setGuardianAddress("");
      setEmergencyContact("");
      setDob("");
      setAge("");
      setPlayerType("");
      setBattingStyle("");
      setBowlingStyle("");
      setBattingPosition("");
      setLastAssociation("");
      setLastYear("");
      setadharupload("");
      setBirth_certificate("");
      setssc_certificate("");
      setschool_lcertificate("");
      setpassport("");

      setErrorMessage("");
      alert("Player added successfully");
    } catch (error) {
      if (error.response && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Server error. Please try again later.");
      }
      console.error("Error during submission:", error);
    }
  };
  const handleSameAsPermanentChange = (e) => {
    setIsSameAsPermanent(e.target.checked);
    if (e.target.checked) {
      setCorrespondenceAddress(permanentAddress);
    } else {
      setCorrespondenceAddress("");
    }
  };
  const handleToggle = () => {
    setSidebarToggled(!sidebarToggled);
  };
  return (
    <>
      <div
        className={`app sidebar-mini ${
          sidebarToggled ? "sidenav-toggled" : ""
        }`}
      >
        <Header handleToggle={handleToggle} />
        <Sidebar />
        <main className="app-content">
          <div className="row">
            <div className="col-md-12">
              <div className="tile">
                <form
                  className="input_form m-0 needs-validation"
                  noValidate
                  id="form_action"
                  role="form"
                  onSubmit={handleSubmit}
                  enctype="multipart/form-data"
                  autoComplete="off"
                >
                  <span className="text-danger fs-4">
                    (First Captain Should Add In This Information)
                  </span>
                  <h2 className="text-center p-2 text-light bg-primary">
                    Player Registration
                  </h2>
                  <div className="form_card mt-3 mb-5">
                    <div className="row p-2">
                      {/* Existing fields */}
                      <div className="form-group col-md-3 mb-4">
                        <label className="form_lbl">
                          Adhar Number<span className="text-danger">*</span>
                        </label>
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          name="adha_num"
                          id="adha_num"
                          value={adha_num}
                          placeholder="Aadhar number"
                          onChange={(e) => {
                            const value = e.target.value;
                            // Check if the value is a number and has 12 digits
                            if (/^\d{0,12}$/.test(value)) {
                              setadhar(value);
                            }
                          }}
                          required
                          maxLength={12} // optional: to prevent users from typing more than 12 digits
                        />
                      </div>
                      <h2 className="text-center p-2 text-light bg-primary">
                        Personal Information
                      </h2>

                      <div className="form-group col-md-3 mb-2">
                        <label className="form_lbl">
                          First Name<span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="pfnmae"
                          id="pfnmae"
                          value={pfnmae}
                          placeholder="First Name"
                          onChange={(e) => setfname(e.target.value)}
                          required
                        />
                        <div className="invalid-feedback">
                          Please enter First Name
                        </div>
                      </div>

                      <div className="form-group col-md-3 mb-2">
                        <label className="form_lbl">Middle Name</label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="pmname"
                          id="pmname"
                          value={pmname}
                          placeholder="Middle Name"
                          onChange={(e) => setpmname(e.target.value)}
                          required
                        />
                        <div className="invalid-feedback">
                          Please enter Middle Name
                        </div>
                      </div>

                      <div className="form-group col-md-3 mb-2">
                        <label className="form_lbl">
                          Last Name<span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="plnmae"
                          id="plnmae"
                          value={plnmae}
                          placeholder="Last Name"
                          onChange={(e) => setlname(e.target.value)}
                          required
                        />
                        <div className="invalid-feedback">
                          Please enter Last Name
                        </div>
                      </div>

                      <div className="form-group col-md-3 mb-2">
                        <label className="form_lbl">
                          Gender<span className="text-danger">*</span>
                        </label>
                        <select
                          className="form-control form-control-sm"
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                          required
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                        <div className="invalid-feedback">
                          Please select Gender
                        </div>
                      </div>

                      <div className="form-group col-md-3 mb-2">
                        <label className="form_lbl">
                          Blood Group<span className="text-danger">*</span>
                        </label>
                        <select
                          className="form-control form-control-sm"
                          value={bloodGroup}
                          onChange={(e) => setBloodGroup(e.target.value)}
                          required
                        >
                          <option value="">Select Blood Group</option>
                          <option value="A+">A+</option>
                          <option value="A-">A-</option>
                          <option value="B+">B+</option>
                          <option value="B-">B-</option>
                          <option value="AB+">AB+</option>
                          <option value="AB-">AB-</option>
                          <option value="O+">O+</option>
                          <option value="O-">O-</option>
                        </select>
                        <div className="invalid-feedback">
                          Please select Blood Group
                        </div>
                      </div>

                      <div className="form-group col-md-3 mb-2">
                        <label className="form_lbl">
                          Email ID<span className="text-danger">*</span>
                        </label>
                        <input
                          type="email"
                          className="form-control form-control-sm"
                          name="email"
                          id="email"
                          value={email}
                          placeholder="Email ID"
                          onChange={(e) => setEmail(e.target.value)}
                          min="0"
                          required
                        />
                        <div className="invalid-feedback">
                          Please enter Email ID
                        </div>
                      </div>

                      <div className="form-group col-md-3 mb-2">
                        <label className="form_lbl">
                          Mobile Number<span className="text-danger">*</span>
                        </label>
                        <input
                          type="text" // Input type is text
                          className="form-control form-control-sm"
                          name="mobile"
                          id="mobile"
                          value={mobile}
                          placeholder="Mobile Number"
                          onChange={(e) => {
                            const value = e.target.value;
                            // Allow only numeric values and limit to 10 characters
                            if (/^\d*$/.test(value) && value.length <= 10) {
                              setMobile(value); // Send only valid values to state
                            }
                          }}
                          maxLength={10} // Enforces a max length of 10 characters
                          required
                        />

                        <div className="invalid-feedback">
                          Please enter Mobile Number
                        </div>
                      </div>

                      <div className="form-group col-md-6 mb-2">
                        <label className="form_lbl">
                          Permanent Address
                          <span className="text-danger">*</span>
                        </label>
                        <textarea
                          className="form-control form-control-sm"
                          name="player_per_addr"
                          id="player_per_addr"
                          rows="3"
                          placeholder="Enter Permanent Address"
                          value={permanentAddress}
                          onChange={(e) => setPermanentAddress(e.target.value)}
                          required
                        ></textarea>
                        <div className="invalid-feedback">
                          Please enter Permanent Address
                        </div>
                      </div>

                      <div className="form-group col-md-6 mb-2">
                        <label className="form_lbl">
                          Correspondence Address
                          <span className="text-danger">*</span>{" "}
                          &nbsp;&nbsp;&nbsp;
                          <input
                            type="checkbox"
                            id="same_per_addr"
                            checked={isSameAsPermanent}
                            onChange={handleSameAsPermanentChange}
                          />{" "}
                          Same as Permanent Address
                        </label>
                        <textarea
                          className="form-control form-control-sm"
                          name="player_cor_addr"
                          id="player_cor_addr"
                          rows="3"
                          placeholder="Enter Correspondence Address"
                          value={
                            isSameAsPermanent
                              ? permanentAddress
                              : correspondenceAddress
                          }
                          onChange={(e) =>
                            setCorrespondenceAddress(e.target.value)
                          }
                          required
                        ></textarea>
                        <div className="invalid-feedback">
                          Please enter Correspondence Address
                        </div>
                      </div>

                      <div className="form-group col-md-3 mb-2">
                        <label className="form_lbl">
                          DOB Digital Certificate Reg No.
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="player_dob_cer_no"
                          id="player_dob_cer_no"
                          value={dobCertNo}
                          placeholder="Enter DOB Digital Certificate Reg No."
                          onChange={(e) => setDobCertNo(e.target.value)}
                          required
                        />
                        <div className="invalid-feedback">
                          Please enter DOB Certificate Reg No.
                        </div>
                      </div>

                      <div className="form-group col-md-3 mb-2">
                        <label className="form_lbl">
                          DOB Digital Certificate Issued Date
                        </label>
                        <input
                          type="date"
                          className="form-control form-control-sm datetimepicker-input"
                          name="player_dob_cer_date"
                          id="player_dob_cer_date"
                          value={dobCertDate}
                          placeholder="Enter Issued Date"
                          onChange={(e) => setDobCertDate(e.target.value)}
                          required
                        />
                        <div className="invalid-feedback">
                          Please enter Issued Date
                        </div>
                      </div>

                      <div className="form-group col-md-3 mb-2">
                        <label className="form_lbl">
                          DOB Digital Certificate Issued Place
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="player_dob_cer_place"
                          id="player_dob_cer_place"
                          value={dobCertPlace}
                          placeholder="Enter Certificate Issued Place"
                          onChange={(e) => setDobCertPlace(e.target.value)}
                          required
                        />
                        <div className="invalid-feedback">
                          Please enter Certificate Issued Place
                        </div>
                      </div>

                      <div className="form-group col-md-3 mb-2">
                        <label className="form_lbl">
                          School/College Certificate No.
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="player_sch_cer_no"
                          id="player_sch_cer_no"
                          value={schoolCertNo}
                          placeholder="Enter School/College Certificate No."
                          onChange={(e) => setSchoolCertNo(e.target.value)}
                        />
                        <div className="invalid-feedback">
                          Please enter School/College Certificate No.
                        </div>
                      </div>

                      <div className="form-group col-md-3 mb-2">
                        <label className="form_lbl">
                          SSC Certificate Date of Issue
                        </label>
                        <input
                          type="date"
                          className="form-control form-control-sm datetimepicker-input"
                          name="player_ssc_cer_date"
                          id="player_ssc_cer_date"
                          value={sscCertDate}
                          placeholder="Enter SSC Certificate Date of Issue"
                          onChange={(e) => setSscCertDate(e.target.value)}
                        />
                        <div className="invalid-feedback">
                          Please enter SSC Certificate Date of Issue
                        </div>
                      </div>

                      <div className="form-group col-md-3 mb-2">
                        <label className="form_lbl">
                          Father's Name<span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="player_father_name"
                          id="player_father_name"
                          value={fatherName}
                          placeholder="Enter Father's Name"
                          onChange={(e) => setFatherName(e.target.value)}
                          required
                        />
                        <div className="invalid-feedback">
                          Please enter Father's Name
                        </div>
                      </div>

                      <div className="form-group col-md-3 mb-2">
                        <label className="form_lbl">
                          Mother's Name<span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="player_mother_name"
                          id="player_mother_name"
                          value={motherName}
                          placeholder="Enter Mother's Name"
                          onChange={(e) => setMotherName(e.target.value)}
                          required
                        />
                        <div className="invalid-feedback">
                          Please enter Mother's Name
                        </div>
                      </div>

                      <div className="form-group col-md-3 mb-2">
                        <label className="form_lbl">Guardian Name</label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="player_guard_name"
                          id="player_guard_name"
                          value={guardianName}
                          placeholder="Enter Guardian Name"
                          onChange={(e) => setGuardianName(e.target.value)}
                        />
                        <div className="invalid-feedback">
                          Please enter Guardian Name
                        </div>
                      </div>

                      <div className="form-group col-md-3 mb-2">
                        <label className="form_lbl">Relation Type</label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="player_relation"
                          id="player_relation"
                          value={relationType}
                          placeholder="Enter Relation Type"
                          onChange={(e) => setRelationType(e.target.value)}
                        />
                        <div className="invalid-feedback">
                          Please enter Relation Type
                        </div>
                      </div>

                      <div className="form-group col-md-3 mb-2">
                        <label className="form_lbl">Guardian Address</label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="player_guard_addr"
                          id="player_guard_addr"
                          value={guardianAddress}
                          placeholder="Enter Guardian Address"
                          onChange={(e) => setGuardianAddress(e.target.value)}
                        />
                        <div className="invalid-feedback">
                          Please enter Guardian Address
                        </div>
                      </div>

                      <div className="form-group col-md-3 mb-2">
                        <label className="form_lbl">
                          Emergency Contact No.
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text" // Change input type to text to manage the validation manually
                          className="form-control form-control-sm"
                          name="player_emerg_no"
                          id="player_emerg_no"
                          value={emergencyContact}
                          placeholder="Enter Emergency Contact No."
                          onChange={(e) => {
                            const value = e.target.value;
                            // Allow only numeric values and limit to 10 characters
                            if (/^\d*$/.test(value) && value.length <= 10) {
                              setEmergencyContact(value); // Update state with valid values
                            }
                          }}
                          maxLength={10} // Enforces a max length of 10 characters
                          required
                        />

                        <div className="invalid-feedback">
                          Please enter Emergency Contact No.
                        </div>
                      </div>

                      {/* New fields */}
                      <div className="form-group col-md-3 mb-2">
                        <label className="form_lbl">
                          Date of Birth<span className="text-danger">*</span>
                        </label>
                        <input
                          type="date"
                          className="form-control form-control-sm"
                          name="dob"
                          id="dob"
                          value={dob}
                          onChange={(e) => setDob(e.target.value)}
                          required
                        />
                        <div className="invalid-feedback">
                          Please enter Date of Birth
                        </div>
                      </div>

                      <div className="form-group col-md-3 mb-2">
                        <label className="form_lbl">Age</label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="age"
                          id="age"
                          value={age}
                          readOnly
                        />
                      </div>
                      <span className="text-danger ">
                        {" "}
                        Age will be calculated automatically
                      </span>

                      {/* <div className="col-md-12 mt-4">
                      <h4 className=" text-center p-3 text-light bg-primary">
                        Club Association 1
                      </h4>
                    </div>

                    <div className="form-group col-md-6 select_sm mb-2">
                      <label className="form_lbl">
                        Club Association
                        <span className="text-danger">*</span>
                      </label>
                      <select className="form-control form-control-sm" value={club1} onChange={(e)=>
                        setclub1(e.target.value)}
                        >
                        <option value="">Select club1</option>
                        <option value="Raigad Cricket Association" reg_no_prefix="RGD">
                          Raigad Cricket Association
                        </option>
                        <option value="Ratnagiri  Cricket Association" reg_no_prefix="RTN">
                          Ratnagiri Cricket Association
                        </option>
                        <option value="Sindhudurg Cricket Association" reg_no_prefix="SDG">
                          Sindhudurg Cricket Association
                        </option>
                        <option value="Kolhapur Cricket Association" reg_no_prefix="KHP">
                          Kolhapur Cricket Association
                        </option>
                        <option value="Pune Cricket Association" reg_no_prefix="PDA">
                          Pune Cricket Association
                        </option>
                      </select>
                      <div className="invalid-feedback">
                        Please select Club Association
                      </div>
                      <input type="hidden" name="reg_no_prefix" id="reg_no_prefix" />
                    </div>
                    <div className="col-md-12 mt-4">
                      <h4 className=" text-center p-3 text-light bg-primary">
                        Club Association 2
                      </h4>
                    </div>
                    <div className="form-group col-md-6 select_sm mb-2">
                      <label className="form_lbl">
                        Club Association
                        <span className="text-danger">*</span>
                      </label>
                      <select className="form-control form-control-sm" value={club2} onChange={(e)=>
                        setclub2(e.target.value)}
                        >
                        <option value="">Select club2</option>
                        <option value="Raigad Cricket Association" reg_no_prefix="RGD">
                          Raigad Cricket Association
                        </option>
                        <option value="Ratnagiri  Cricket Association" reg_no_prefix="RTN">
                          Ratnagiri Cricket Association
                        </option>
                        <option value="Sindhudurg Cricket Association" reg_no_prefix="SDG">
                          Sindhudurg Cricket Association
                        </option>
                        <option value="Kolhapur Cricket Association" reg_no_prefix="KHP">
                          Kolhapur Cricket Association
                        </option>
                        <option value="Pune Cricket Association" reg_no_prefix="PDA">
                          Pune Cricket Association
                        </option>
                      </select>
                      <div className="invalid-feedback">
                        Please select Club Association
                      </div>
                      <input type="hidden" name="reg_no_prefix" id="reg_no_prefix" />
                    </div> */}

                      <div className="col-md-12 mt-4">
                        <h4 className=" text-center p-3 text-light bg-primary">
                          Cricket Information
                        </h4>
                      </div>

                      <div className="form-group col-md-4 select_sm mb-2">
                        <label className="form_lbl">
                          Player Type<span className="text-danger">*</span>
                        </label>
                        <select
                          className="form-control select2"
                          name="player_type_name"
                          id="player_type_name"
                          value={playerType}
                          onChange={(e) => setPlayerType(e.target.value)}
                          required
                        >
                          <option value="">Select Player Type</option>
                          <option value="All Rounder">All Rounder</option>
                          <option value="Batsman">Batsman</option>
                          <option value="Bowler">Bowler</option>
                          <option value="Wicket Keeper">Wicket Keeper</option>
                        </select>
                        <div className="invalid-feedback">
                          Please select Player Type
                        </div>
                      </div>

                      {/* Show Batting Style and Batting Position for All Rounder and Batsman */}
                      {(playerType === "All Rounder" ||
                        playerType === "Batsman") && (
                        <>
                          <div className="form-group col-md-4 select_sm mb-2">
                            <label className="form_lbl">
                              Batting Style
                              <span className="text-danger">*</span>
                            </label>
                            <select
                              className="form-control select2"
                              name="batting_style_name"
                              id="batting_style_name"
                              value={battingStyle}
                              onChange={(e) => setBattingStyle(e.target.value)}
                              required
                            >
                              <option value="">Select Batting Style</option>
                              <option value="Righthand Bat">
                                Righthand Bat
                              </option>
                              <option value="Lefthand Bat">Lefthand Bat</option>
                            </select>
                            <div className="invalid-feedback">
                              Please select Batting Style
                            </div>
                          </div>

                          <div className="form-group col-md-4 select_sm mb-2">
                            <label className="form_lbl">
                              Batting Position
                              <span className="text-danger">*</span>
                            </label>
                            <select
                              className="form-control select2"
                              name="batting_position"
                              id="batting_position"
                              value={battingPosition}
                              onChange={(e) =>
                                setBattingPosition(e.target.value)
                              }
                              required
                            >
                              <option value="">Select Batting Position</option>
                              <option value="Open">Open</option>
                              <option value="Middle order">Middle order</option>
                            </select>
                            <div className="invalid-feedback">
                              Please select Batting Position
                            </div>
                          </div>
                        </>
                      )}

                      {/* Show Bowling Style for All Rounder and Bowler */}
                      {(playerType === "All Rounder" ||
                        playerType === "Bowler") && (
                        <div className="form-group col-md-4 select_sm mb-2">
                          <label className="form_lbl">
                            Bowling Style<span className="text-danger">*</span>
                          </label>
                          <select
                            className="form-control select2"
                            name="bowling_style_name"
                            id="bowling_style_name"
                            value={bowlingStyle}
                            onChange={(e) => setBowlingStyle(e.target.value)}
                            required
                          >
                            <option value="">Select Bowling Style</option>
                            <option value="RAF">RAF</option>
                            <option value="LAF">LAF</option>
                            <option value="RAOF">RAOF</option>
                            <option value="LAOF">LAOF</option>
                            <option value="RALS">RALS</option>
                            <option value="LALS">LALS</option>
                          </select>
                          <div className="invalid-feedback">
                            Please select Bowling Style
                          </div>
                        </div>
                      )}

                      <div className="form-group col-md-4 select_sm mb-2">
                        <label className="form_lbl">
                          Name of Association Last Represented
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="player_last_assoc"
                          id="player_last_assoc"
                          value={lastAssociation}
                          placeholder="Enter Name of Association Last Represented"
                          onChange={(e) => setLastAssociation(e.target.value)}
                        />
                        <div className="invalid-feedback">
                          Please enter Name of Association Last Represented
                        </div>
                      </div>
                      <div className="form-group col-md-4 select_sm mb-2">
                        <label className="form_lbl">Year</label>
                        <select
                          className="form-control select2"
                          name="player_last_year"
                          id="player_last_year"
                          value={lastYear}
                          onChange={(e) => setLastYear(e.target.value)}
                        >
                          <option value="">Select Year</option>
                          <option value="2024">2024</option>
                          <option value="2023">2023</option>
                          <option value="2022">2022</option>
                          <option value="2021">2021</option>
                          <option value="2020">2020</option>
                          <option value="2019">2019</option>
                          <option value="2018">2018</option>
                        </select>
                        <div className="invalid-feedback">
                          Please select Year
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 mt-4">
                    <h4 className="text-center p-3 text-light bg-primary">
                      Document Information
                    </h4>
                  </div>

                  <div className="row col-md-12 mt-4">
                    <div className="form-group col-md-4 offset-md-1 mb-2">
                      <label className="form_lbl">
                        Player Aadhar Card (Both Sides)
                        <span className="text-danger">*</span>
                      </label>
                      <p className="mb-0 f-12">
                        (Scan and Upload the Original Document)
                      </p>
                      <input
                        type="file"
                        className="form-control form-control-sm"
                        name="adharupload"
                        id="adharupload"
                        onChange={(e) => setadharupload(e.target.files[0])}
                        required
                      />
                      <div className="invalid-feedback">
                        Please select document
                      </div>
                    </div>

                    <div className="form-group col-md-4 mb-2">
                      <label className="form_lbl">
                        Digital Birth Certificate
                      </label>
                      <p className="mb-0 f-12">
                        (Scan and upload the Original Document)
                      </p>
                      <input
                        type="file"
                        className="form-control form-control-sm"
                        name="Birth_certificate"
                        id="Birth_certificate"
                        onChange={(e) =>
                          setBirth_certificate(e.target.files[0])
                        }
                        required
                      />
                    </div>

                    <div className="form-group col-md-4 offset-md-1 mb-2">
                      <label className="form_lbl">10th Pass Certificate</label>
                      <p className="mb-0 f-12">
                        (Scan Original document, Generate PDF for multiple pages
                        and upload)
                      </p>
                      <input
                        type="file"
                        className="form-control form-control-sm"
                        name="ssc_certificate"
                        id="ssc_certificate"
                        onChange={(e) => setssc_certificate(e.target.files[0])}
                        required
                      />
                    </div>

                    <div className="form-group col-md-4 mb-2">
                      <label className="form_lbl">
                        School Leaving Certificate
                      </label>
                      <p className="mb-0 f-12">
                        (Scan Original document, Generate PDF for multiple pages
                        and upload)
                      </p>
                      <input
                        type="file"
                        className="form-control form-control-sm"
                        name="school_lcertificate"
                        id="school_lcertificate"
                        onChange={(e) =>
                          setschool_lcertificate(e.target.files[0])
                        }
                        required
                      />
                    </div>

                    <div className="form-group col-md-4 offset-md-1 mb-2">
                      <label className="form_lbl">
                        Passport (If Available)
                      </label>
                      <p className="mb-0 f-12">
                        (Scan and Upload the Original Document, Generate PDF for
                        front and back passport pages and upload)
                      </p>
                      <input
                        type="file"
                        className="form-control form-control-sm"
                        name="passport"
                        id="passport"
                        onChange={(e) => setpassport(e.target.files[0])}
                      />
                    </div>
                  </div>
                  {errorMessage && (
                    <div className="alert alert-danger">{errorMessage}</div>
                  )}

                  <button type="submit" className="btn btn-primary" id="submit">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Add_Player;
