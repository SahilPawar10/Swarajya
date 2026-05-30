import React, { useEffect, useState } from "react";
import LayoutAdmin from "../Layout2/LayoutAdmin";
import { approveVisitorRequest, getVisitor } from "../../api/apiService";
import "./visitor.css";

function Visitors() {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [approvingId, setApprovingId] = useState("");
  const [message, setMessage] = useState("");

  const fetchVisitors = () => {
    getVisitor()
      .then((res) => {
        setData(res.data);
      })
      .catch(() => setMessage("Unable to load visitor requests"));
  };

  useEffect(() => {
    fetchVisitors();
  }, []);

  const handleApprove = async (visitorId) => {
    setApprovingId(visitorId);
    setMessage("");

    try {
      const res = await approveVisitorRequest(visitorId);
      const temporaryPassword = res.data?.temporaryPassword;

      setData((currentData) =>
        currentData.map((visitor) =>
          visitor.id === visitorId || visitor._id === visitorId
            ? {
                ...visitor,
                status: "approved",
                approvedAt: new Date().toISOString(),
              }
            : visitor,
        ),
      );
      setMessage(
        temporaryPassword
          ? `Request approved. Welcome email failed, temporary password: ${temporaryPassword}`
          : "Request approved successfully.",
      );
    } catch (error) {
      setMessage(error.response?.data?.message || "Unable to approve request");
    } finally {
      setApprovingId("");
    }
  };

  const filteredVisitors = data.filter((visitor) => {
    const query = searchText.trim().toLowerCase();
    if (!query) {
      return true;
    }

    return [visitor.name, visitor.email, visitor.number, visitor.status]
      .filter(Boolean)
      .some((value) => String(value).toLowerCase().includes(query));
  });

  return (
    <div id="visitors">
      {message && <div className="visitor-message">{message}</div>}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Here"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />
      </div>
      {/* Table */}
      <div className="visitor-table">
        <table>
          <thead>
            <tr>
              <th className="visitortable-heading">Sr.no</th>
              <th className="visitortable-heading">Name</th>
              <th className="visitortable-heading">Number</th>
              <th className="visitortable-heading">Email</th>
              <th className="visitortable-heading">Status</th>
              <th className="visitortable-heading">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredVisitors.map((visitor, index) => {
              const visitorId = visitor.id || visitor._id;
              const isApproved = visitor.status === "approved";
              const isApproving = approvingId === visitorId;

              return (
                <tr key={visitorId || index}>
                  <td data-label="Sr.no">{index + 1}</td>
                  <td data-label="Name">{visitor.name}</td>
                  <td data-label="Number">{visitor.number}</td>
                  <td data-label="Email">{visitor.email}</td>
                  <td data-label="Status">
                    <span
                      className={`visitor-status ${visitor.status || "pending"}`}
                    >
                      {visitor.status || "pending"}
                    </span>
                  </td>
                  <td data-label="Action">
                    <button
                      className="visitor-approve-button"
                      type="button"
                      disabled={isApproved || isApproving}
                      onClick={() => handleApprove(visitorId)}
                    >
                      {isApproving
                        ? "Approving..."
                        : isApproved
                          ? "Approved"
                          : "Accept"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LayoutAdmin(Visitors, "visit");
