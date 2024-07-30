import { useEffect } from "react";
import DisplayCard from "../../../components/DisplayCard";
import Table from "../../../components/table/Table";
import useBookings from "../../../hooks/api/useBookings";
import { formatDate } from "../../../utils";
import { svgs } from "../../../utils/svgs";

function Dashboard(props) {
  const { getReviews, reviews, isLoading, changeReviewStatus } = useBookings();

  useEffect(() => {
    getReviews();
  }, []);
  return (
    <div>
      <div className="flex cards">
        <DisplayCard
          svg={svgs.messsage}
          value={reviews.length}
          title="Total Feedbacks"
        />
        <DisplayCard
          svg={svgs.messsage}
          value={reviews.filter((r) => r.published).length}
          title="Published Feedbacks"
        />
      </div>
      <Table
        loading={isLoading}
        data={reviews}
        title="Customer Feedbacks"
        head={[
          ...head,
          {
            title: "",
            target: ["_id", "published"],
            render: (v) => (
              <button
                onClick={() => changeReviewStatus(v[0])}
                className={`status btn-status ${v[1] ? "false" : "true"}`}
              >
                {!v[1] ? "Publish" : "Unpublish"}
              </button>
            ),
          },
        ]}
      />
    </div>
  );
}

export default Dashboard;

const head = [
  {
    title: "Customer",
    target: ["booking.firstName", "booking.lastName"],
  },
  {
    title: "Comment",
    target: "comment",
    className: "fx-3",
  },
  {
    title: "Rating",
    target: "rating",
  },
  {
    title: "Date",
    target: "createdAt",
    render: formatDate,
  },
];
