import React, { useState } from "react";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Clock, Download, UserCheck, Users } from "lucide-react";
import { jsPDF } from "jspdf";

const students = [
  { id: "222-15-6288", name: "Md. Tuhin Sheikh", present: false },
  { id: "222-15-6116", name: "Jobaydul Islam", present: false },
  { id: "222-15-6299", name: "Md Naimul Islam", present: false },
  { id: "222-15-6500", name: "Md. Imran", present: false },
  { id: "222-15-6259", name: "Swadhin Biswas", present: false },
  { id: "222-15-6316", name: "Minhajul Islam Rana Khan", present: false },
  { id: "222-15-6364", name: "Md. Mehedi Hasan", present: false },
  { id: "222-15-6365", name: "Noman Al Badhon", present: false },
  { id: "222-15-6354", name: "Shahriar Kabir", present: false },
  { id: "222-15-6083", name: "Shakibul Hasan", present: false },
  { id: "222-15-6305", name: "Shihab Salimullah Khan", present: false },
  { id: "222-15-6411", name: "Anisur Rahman Noyon Sarker", present: false },
  { id: "222-15-6486", name: "Shakib Hossain", present: false },
  { id: "221-15-5780", name: "Emon Dhar", present: false },
  { id: "222-15-6242", name: "Dhrubajit Acharya Bishal", present: false },
  { id: "222-15-6332", name: "Nadia Sharmin Sumya", present: false },
  { id: "222-15-6335", name: "Fardin Khan Showdha", present: false },
  { id: "222-15-6247", name: "Aslam Shekh", present: false },
  { id: "222-15-6532", name: "Antony Tony Mondal", present: false },
  { id: "222-15-6476", name: "Hridoy Saha", present: false },
  { id: "222-15-6419", name: "Atonu Chakraborty", present: false },
  { id: "222-15-6105", name: "Fahim Muntasir Khan", present: false },
  { id: "222-15-6097", name: "Most Jarin Anjum", present: false },
  { id: "222-15-6422", name: "Nasim Parvez", present: false },
  { id: "222-15-6329", name: "Afia Morsheda Neladry", present: false },
  { id: "222-15-6469", name: "Afroja Akter Lamia", present: false },
  { id: "222-15-6399", name: "Jannatul Ferdous", present: false },
  { id: "222-15-6231", name: "Didarul Islam", present: false },
  { id: "222-15-6531", name: "Daiyaan Muhammad Fardeen", present: false },
  { id: "222-15-6281", name: "Sanzida Chowdhury Dristee", present: false },
  { id: "222-15-6487", name: "Yeasir Arafat", present: false },
  { id: "222-15-6163", name: "Md Fahim Abdullah", present: false },
  { id: "222-15-6301", name: "S.M. Mojahedul Islam Sezan", present: false },
  { id: "222-15-6403", name: "Kaiyum Ahmed", present: false },
  { id: "222-15-6380", name: "Md. Tauhid", present: false },
  { id: "222-15-6488", name: "S M Ahad Maruf", present: false },
  { id: "222-15-6439", name: "Shahadat Hosen Emon", present: false },
  { id: "222-15-6387", name: "Tasnim Rahman Eva", present: false },
  { id: "222-15-6371", name: "Ali Arman Parash", present: false },
  { id: "222-15-6239", name: "Jannatul Hasan Naim", present: false },
  { id: "222-15-6108", name: "Muhammad Al Amin", present: false },
  { id: "222-15-6185", name: "Rakibul Hasan", present: false },
  { id: "222-15-6206", name: "Md Saimur Rahman Robin", present: false },
  { id: "222-15-6297", name: "Farhana Ali", present: false }
];

export default function AttendancePage() {
  const [courseCode, setCourseCode] = useState("");
  const [classTime, setClassTime] = useState("");
  const [attendance, setAttendance] = useState(students);
  const [section, setSection] = useState("");

  const toggleAttendance = (id) => {
    setAttendance((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, present: !student.present } : student
      )
    );
  };

  const generatePDF = () => {
    try {
      const doc = new jsPDF();
      const currentDate = new Date().toLocaleDateString();
      const presentStudents = attendance.filter(s => s.present);
      doc.setFillColor(0, 102, 204);
      doc.rect(0, 0, 210, 30, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(20);
      doc.text("Student Attendance Report", 105, 20, { align: "center" });
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(12);
      doc.text(`Course Code: ${courseCode}`, 20, 40);
      doc.text(`Section: ${section}`, 20, 50);
      doc.text(`Class Time: ${classTime}`, 20, 60);
      doc.text(`Date: ${currentDate}`, 20, 70);
      doc.text(`Total Students: ${attendance.length}`, 120, 40);
      doc.text(`Present: ${presentStudents.length}`, 120, 50);
      doc.text(`Absent: ${attendance.length - presentStudents.length}`, 120, 60);
      const headers = ["ID", "Name", "Status"];
      let y = 90;
      doc.setFillColor(240, 240, 240);
      doc.rect(20, y - 10, 170, 10, "F");
      doc.setTextColor(60, 60, 60);
      doc.text(headers[0], 25, y);
      doc.text(headers[1], 55, y);
      doc.text(headers[2], 160, y);
      doc.setTextColor(0, 0, 0);
      presentStudents.forEach((student, index) => {
        y += 10;
        if (y > 270) {
          doc.addPage();
          y = 20;
          doc.setFillColor(240, 240, 240);
          doc.rect(20, y - 10, 170, 10, "F");
          doc.setTextColor(60, 60, 60);
          doc.text(headers[0], 25, y);
          doc.text(headers[1], 55, y);
          doc.text(headers[2], 160, y);
          y += 10;
        }
        if (index % 2 === 0) {
          doc.setFillColor(249, 249, 249);
          doc.rect(20, y - 8, 170, 10, "F");
        }
        doc.text(student.id, 25, y);
        doc.text(student.name, 55, y);
        doc.text("Present", 160, y);
      });
      
      doc.setFontSize(10);
      doc.setTextColor(150, 150, 150);
      doc.text("© 2025 Student Attendance System - All rights reserved", 105, 280, { align: "center" });
      
      doc.save(`attendance_${courseCode}_${currentDate.replace(/\//g, '-')}.pdf`);
      
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    }
  };
  
  
  const presentCount = attendance.filter(s => s.present).length;

  return (
    <div className="min-h-screen bg-gray-950 p-4 md:p-8">
      <Card className="max-w-4xl mx-auto bg-gray-900 border-gray-800">
        <CardHeader className="space-y-1 border-b border-gray-800">
          <CardTitle className="text-2xl font-bold text-center text-white">
            Student Attendance System
          </CardTitle>
          <div className="text-center text-gray-400">
            {new Date().toLocaleDateString()}
          </div>
        </CardHeader>
        
        <CardContent className="p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="space-y-2">
              <Label htmlFor="courseCode" className="text-gray-300">Course Code</Label>
              <Input
                id="courseCode"
                placeholder="e.g., CS101"
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="section" className="text-gray-300">Section</Label>
              <Input
                id="section"
                placeholder="e.g., A"
                value={section}
                onChange={(e) => setSection(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="classTime" className="text-gray-300">Class Time</Label>
              <Input
                id="classTime"
                type="time"
                value={classTime}
                onChange={(e) => setClassTime(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <Card className="bg-blue-900/20 border-blue-800">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-400" />
                  <span className="text-gray-300">Total</span>
                </div>
                <span className="text-blue-400 font-semibold">{attendance.length}</span>
              </CardContent>
            </Card>

            <Card className="bg-green-900/20 border-green-800">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <UserCheck className="h-5 w-5 text-green-400" />
                  <span className="text-gray-300">Present</span>
                </div>
                <span className="text-green-400 font-semibold">{presentCount}</span>
              </CardContent>
            </Card>

            <Card className="bg-red-900/20 border-red-800">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-red-400" />
                  <span className="text-gray-300">Absent</span>
                </div>
                <span className="text-red-400 font-semibold">{attendance.length - presentCount}</span>
              </CardContent>
            </Card>
          </div>

          <div className="border border-gray-800 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-800/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">ID</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Name</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-300">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {attendance.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-800/50">
                      <td className="px-4 py-3 text-sm text-gray-300">
                        {student.id}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-300">
                        {student.name}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Button
                          variant={student.present ? "default" : "outline"}
                          onClick={() => toggleAttendance(student.id)}
                          className={`w-24 ${
                            student.present 
                              ? "bg-blue-600 hover:bg-blue-700 text-white" 
                              : "border-gray-700 text-gray-400 hover:text-gray-200 hover:bg-gray-800"
                          }`}
                        >
                          {student.present ? "Present" : "Absent"}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button
              onClick={generatePDF}
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Generate PDF
            </Button>
          </div>

          <div className="mt-8 text-center text-sm text-gray-500">
            © 2025 Student Attendance System - All rights reserved
          </div>
        </CardContent>
      </Card>
    </div>
  );
}