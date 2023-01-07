import React, { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { MenuItem } from "../../common/menu";
import { useNavigate } from "react-router-dom";

const Menu: React.FC = () => {
  const navigate = useNavigate();

  const [list, setList] = useState<MenuItem[]>([]);

  const loadMenu = async () => {
    const reply = await fetch("http://localhost:3001/api/menu", {credentials: "include"});
    if(reply.ok) {
      const json: MenuItem[] = await reply.json();
      setList(json);
    } else {
      navigate("/auth");
    }
  }

  useEffect(() => {
    loadMenu();
  }, []);

  return <DashboardLayout>
    {
      list.map((item: MenuItem) => 
        <div key={item.id}>
          <p>{item.id}</p>
          <h3>{item.title}</h3>
          <p>{item.href}</p>
          <hr />
        </div>
      )
    }
    </DashboardLayout>;
};

export default Menu;
