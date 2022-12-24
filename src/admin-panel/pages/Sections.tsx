import React from "react";
import { Section } from "../../common/sections";

import DashboardLayout from "../components/DashboardLayout";
import Sections from "../components/Sections";

const fakeSections: Section[] = [
  {
    id: "1",
    type: "paragraph",
    contents:
      "Consectetur aliqua ea culpa excepteur. Irure commodo nostrud nisi sunt ad aliquip adipisicing in culpa enim reprehenderit. Veniam dolor excepteur tempor ipsum mollit labore proident anim et consequat. Deserunt dolor duis ad esse exercitation in esse adipisicing reprehenderit.",
  },
  {
    id: "2",
    type: "paragraph",
    contents:
      "Id sit pariatur et irure ea aute ut reprehenderit aliquip voluptate enim officia mollit dolor. Officia magna sunt laboris et reprehenderit deserunt reprehenderit officia officia id ullamco. Amet commodo adipisicing irure duis labore ad est ex ad ullamco veniam sint. Ex laborum quis pariatur elit sint esse officia velit amet excepteur incididunt voluptate cillum laboris. Tempor fugiat sunt labore in ex magna magna deserunt dolor officia ex Lorem. Cillum culpa ipsum laborum duis qui ut excepteur ex.",
  },
  {
    id: "3",
    type: "header",
    header: "Ea id minim occaecat incididunt",
  },
];

const SectionsPage: React.FC = () => {
  return (
    <DashboardLayout>
      <Sections sections={fakeSections} />
    </DashboardLayout>
  );
};

export default SectionsPage;
