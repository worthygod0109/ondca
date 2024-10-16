import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UpdatePlayer = ({ playerId }) => {
  // State management
  const [adha_num, setAdhaNum] = useState("");
  const [pfnmae, setFName] = useState("");
  const [pmname, setMName] = useState("");
  const [plnmae, setLName] = useState("");
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
  const [club1, setClub1] = useState("");
  const [club2, setClub2] = useState("");

  const [playerType, setPlayerType] = useState("");
  const [battingStyle, setBattingStyle] = useState("");
  const [bowlingStyle, setBowlingStyle] = useState("");
  const [battingPosition, setBattingPosition] = useState("");
  const [lastAssociation, setLastAssociation] = useState("");
  const [lastYear, setLastYear] = useState("");
  const [adharupload, setAdharUpload] = useState(""); // File upload state
  const [birthCertificate, setBirthCertificate] = useState(""); // File upload state
  const [sscCertificate, setSscCertificate] = useState(""); // File upload state
  const [schoolLcertificate, setSchoolLcertificate] = useState(""); // File upload state
  const [passport, setPassport] = useState(""); // File upload state

  const [errorMessage, setErrorMessage] = useState("");

  // Fetch player data when component mounts or playerId changes
  useEffect(() => {
    if (playerId) {
      const fetchPlayerData = async () => {
        try {
          const response = await axios.get(`http://localhost:8081/get-player/${playerId}`);
          const playerData = response.data;

          setAdhaNum(playerData.adha_num);
          setFName(playerData.pfnmae);
          setMName(playerData.pmname);
          setLName(playerData.plnmae);
          setGender(playerData.gender);
          setBloodGroup(playerData.bloodGroup);
          setEmail(playerData.email);
          setMobile(playerData.mobile);
          setPermanentAddress(playerData.permanentAddress);
          setCorrespondenceAddress(playerData.correspondenceAddress);
          setIsSameAsPermanent(playerData.correspondenceAddress === playerData.permanentAddress);
          setDobCertNo(playerData.dobCertNo);
          setDobCertDate(playerData.dobCertDate);
          setDobCertPlace(playerData.dobCertPlace);
          setSchoolCertNo(playerData.schoolCertNo);
          setSscCertDate(playerData.sscCertDate);
          setFatherName(playerData.fatherName);
          setMotherName(playerData.motherName);
          setGuardianName(playerData.guardianName);
          setRelationType(playerData.relationType);
          setGuardianAddress(playerData.guardianAddress);
          setEmergencyContact(playerData.emergencyContact);
          setDob(playerData.dob);
          setAge(playerData.age);
          setClub1(playerData.club1);
          setClub2(playerData.club2);
          setPlayerType(playerData.playerType);
          setBattingStyle(playerData.battingStyle);
          setBowlingStyle(playerData.bowlingStyle);
          setBattingPosition(playerData.battingPosition);
          setLastAssociation(playerData.lastAssociation);
          setLastYear(playerData.lastYear);

          // Set file upload states if URLs are provided
          // Example: setAdharUpload(playerData.adharuploadUrl);
        } catch (error) {
          console.error("Error fetching player data:", error);
        }
      };

      fetchPlayerData();
    }
  }, [playerId]);

  // Calculate age when dob changes
  useEffect(() => {
    if (dob) {
      const birthDate = new Date(dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) { age--; }
      setAge(age);
    }
  }, [dob]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'adharupload') {
      setAdharUpload(files ? files[0] : null);
    } else if (name === 'birthCertificate') {
      setBirthCertificate(files ? files[0] : null);
    } else if (name === 'sscCertificate') {
      setSscCertificate(files ? files[0] : null);
    } else if (name === 'schoolLcertificate') {
      setSchoolLcertificate(files ? files[0] : null);
    } else if (name === 'passport') {
      setPassport(files ? files[0] : null);
    } else {
      // Handle other form fields
      switch (name) {
        case 'adha_num':
          setAdhaNum(value);
          break;
        case 'pfnmae':
          setFName(value);
          break;
        case 'pmname':
          setMName(value);
          break;
        case 'plnmae':
          setLName(value);
          break;
        case 'gender':
          setGender(value);
          break;
        case 'bloodGroup':
          setBloodGroup(value);
          break;
        case 'email':
          setEmail(value);
          break;
        case 'mobile':
          setMobile(value);
          break;
        case 'permanentAddress':
          setPermanentAddress(value);
          break;
        case 'correspondenceAddress':
          setCorrespondenceAddress(value);
          break;
        case 'isSameAsPermanent':
          setIsSameAsPermanent(e.target.checked);
          break;
        case 'dobCertNo':
          setDobCertNo(value);
          break;
        case 'dobCertDate':
          setDobCertDate(value);
          break;
        case 'dobCertPlace':
          setDobCertPlace(value);
          break;
        case 'schoolCertNo':
          setSchoolCertNo(value);
          break;
        case 'sscCertDate':
          setSscCertDate(value);
          break;
        case 'fatherName':
          setFatherName(value);
          break;
        case 'motherName':
          setMotherName(value);
          break;
        case 'guardianName':
          setGuardianName(value);
          break;
        case 'relationType':
          setRelationType(value);
          break;
        case 'guardianAddress':
          setGuardianAddress(value);
          break;
        case 'emergencyContact':
          setEmergencyContact(value);
          break;
        case 'dob':
          setDob(value);
          break;
        case 'club1':
          setClub1(value);
          break;
        case 'club2':
          setClub2(value);
          break;
        case 'playerType':
          setPlayerType(value);
          break;
        case 'battingStyle':
          setBattingStyle(value);
          break;
        case 'bowlingStyle':
          setBowlingStyle(value);
          break;
        case 'battingPosition':
          setBattingPosition(value);
          break;
        case 'lastAssociation':
          setLastAssociation(value);
          break;
        case 'lastYear':
          setLastYear(value);
          break;
        default:
          break;
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('adha_num', adha_num);
      formData.append('pfnmae', pfnmae);
      formData.append('pmname', pmname);
      formData.append('plnmae', plnmae);
      formData.append('gender', gender);
      formData.append('bloodGroup', bloodGroup);
      formData.append('email', email);
      formData.append('mobile', mobile);
      formData.append('permanentAddress', permanentAddress);
      formData.append('correspondenceAddress', correspondenceAddress);
      formData.append('isSameAsPermanent', isSameAsPermanent);
      formData.append('dobCertNo', dobCertNo);
      formData.append('dobCertDate', dobCertDate);
      formData.append('dobCertPlace', dobCertPlace);
      formData.append('schoolCertNo', schoolCertNo);
      formData.append('sscCertDate', sscCertDate);
      formData.append('fatherName', fatherName);
      formData.append('motherName', motherName);
      formData.append('guardianName', guardianName);
      formData.append('relationType', relationType);
      formData.append('guardianAddress', guardianAddress);
      formData.append('emergencyContact', emergencyContact);
      formData.append('dob', dob);
      formData.append('age', age);
      formData.append('club1', club1);
      formData.append('club2', club2);
      formData.append('playerType', playerType);
      formData.append('battingStyle', battingStyle);
      formData.append('bowlingStyle', bowlingStyle);
      formData.append('battingPosition', battingPosition);
      formData.append('lastAssociation', lastAssociation);
      formData.append('lastYear', lastYear);
      
      if (adharupload) formData.append('adharupload', adharupload);
      if (birthCertificate) formData.append('birthCertificate', birthCertificate);
      if (sscCertificate) formData.append('sscCertificate', sscCertificate);
      if (schoolLcertificate) formData.append('schoolLcertificate', schoolLcertificate);
      if (passport) formData.append('passport', passport);

      await axios.post(`http://localhost:8081/update-player/${playerId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      alert('Player updated successfully!');
    } catch (error) {
      console.error('Error updating player:', error);
      setErrorMessage('Failed to update player.');
    }
  };

  return (
    <div>
      <h2>Update Player</h2>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Aadhar Number:
          <input type="text" name="adha_num" value={adha_num} onChange={handleChange} />
        </label>
        <label>
          First Name:
          <input type="text" name="pfnmae" value={pfnmae} onChange={handleChange} />
        </label>
        <label>
          Middle Name:
          <input type="text" name="pmname" value={pmname} onChange={handleChange} />
        </label>
        <label>
          Last Name:
          <input type="text" name="plnmae" value={plnmae} onChange={handleChange} />
        </label>
        <label>
          Gender:
          <input type="text" name="gender" value={gender} onChange={handleChange} />
        </label>
        <label>
          Blood Group:
          <input type="text" name="bloodGroup" value={bloodGroup} onChange={handleChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={email} onChange={handleChange} />
        </label>
        <label>
          Mobile:
          <input type="text" name="mobile" value={mobile} onChange={handleChange} />
        </label>
        <label>
          Permanent Address:
          <input type="text" name="permanentAddress" value={permanentAddress} onChange={handleChange} />
        </label>
        <label>
          Correspondence Address:
          <input type="text" name="correspondenceAddress" value={correspondenceAddress} onChange={handleChange} />
        </label>
        <label>
          Same as Permanent Address:
          <input type="checkbox" name="isSameAsPermanent" checked={isSameAsPermanent} onChange={handleChange} />
        </label>
        <label>
          Date of Birth Certificate No:
          <input type="text" name="dobCertNo" value={dobCertNo} onChange={handleChange} />
        </label>
        <label>
          Date of Birth Certificate Date:
          <input type="text" name="dobCertDate" value={dobCertDate} onChange={handleChange} />
        </label>
        <label>
          Date of Birth Certificate Place:
          <input type="text" name="dobCertPlace" value={dobCertPlace} onChange={handleChange} />
        </label>
        <label>
          School Certificate No:
          <input type="text" name="schoolCertNo" value={schoolCertNo} onChange={handleChange} />
        </label>
        <label>
          SSC Certificate Date:
          <input type="text" name="sscCertDate" value={sscCertDate} onChange={handleChange} />
        </label>
        <label>
          Father Name:
          <input type="text" name="fatherName" value={fatherName} onChange={handleChange} />
        </label>
        <label>
          Mother Name:
          <input type="text" name="motherName" value={motherName} onChange={handleChange} />
        </label>
        <label>
          Guardian Name:
          <input type="text" name="guardianName" value={guardianName} onChange={handleChange} />
        </label>
        <label>
          Relation Type:
          <input type="text" name="relationType" value={relationType} onChange={handleChange} />
        </label>
        <label>
          Guardian Address:
          <input type="text" name="guardianAddress" value={guardianAddress} onChange={handleChange} />
        </label>
        <label>
          Emergency Contact:
          <input type="text" name="emergencyContact" value={emergencyContact} onChange={handleChange} />
        </label>
        <label>
          Date of Birth:
          <input type="date" name="dob" value={dob} onChange={handleChange} />
        </label>
        <label>
          Age:
          <input type="text" name="age" value={age} readOnly />
        </label>
        <label>
          Club Association 1:
          <input type="text" name="club1" value={club1} onChange={handleChange} />
        </label>
        <label>
          Club Association 2:
          <input type="text" name="club2" value={club2} onChange={handleChange} />
        </label>
        <label>
          Player Type:
          <input type="text" name="playerType" value={playerType} onChange={handleChange} />
        </label>
        <label>
          Batting Style:
          <input type="text" name="battingStyle" value={battingStyle} onChange={handleChange} />
        </label>
        <label>
          Bowling Style:
          <input type="text" name="bowlingStyle" value={bowlingStyle} onChange={handleChange} />
        </label>
        <label>
          Batting Position:
          <input type="text" name="battingPosition" value={battingPosition} onChange={handleChange} />
        </label>
        <label>
          Last Association:
          <input type="text" name="lastAssociation" value={lastAssociation} onChange={handleChange} />
        </label>
        <label>
          Last Year:
          <input type="text" name="lastYear" value={lastYear} onChange={handleChange} />
        </label>
        <label>
          Aadhar Upload:
          <input type="file" name="adharupload" onChange={handleChange} />
        </label>
        <label>
          Birth Certificate:
          <input type="file" name="birthCertificate" onChange={handleChange} />
        </label>
        <label>
          SSC Certificate:
          <input type="file" name="sscCertificate" onChange={handleChange} />
        </label>
        <label>
          School Leaving Certificate:
          <input type="file" name="schoolLcertificate" onChange={handleChange} />
        </label>
        <label>
          Passport:
          <input type="file" name="passport" onChange={handleChange} />
        </label>
        <button type="submit">Update Player</button>
      </form>
    </div>
  );
};

export default UpdatePlayer;
