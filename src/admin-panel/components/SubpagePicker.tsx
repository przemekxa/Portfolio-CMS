import { MenuItem, Select } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageSummary } from "../../common/pages";
import { getSessionFetch } from "../checkSessionFetch";

type Props = {
  subpageIds: string[];
  onChange?: (subpageIds: string[]) => void;
};
const SubpagePicker: React.FC<Props>= ({ subpageIds, onChange }) => {
  const navigate = useNavigate();

  const sessionFetch = useMemo(() => getSessionFetch(navigate), [navigate]);

  const [subpages, setSubpages] = useState<PageSummary[]>([]);
  const [selectedSubpageIds, setSelectedSubpageIds] = useState<string[]>([]);

  const loadSubpages = useCallback(async () => {
    try {
      const data = await sessionFetch("/api/pages");
      setSubpages(data);
    } catch (error) {
      // TODO
      console.error(error);
    }
  }, [sessionFetch]);

  useEffect(() => {
    loadSubpages();
  }, [loadSubpages]);

  useEffect(() => {
    setSelectedSubpageIds(subpageIds);
  }, [subpageIds]);
  
  return <Select
    value={selectedSubpageIds}
    onChange={e => {
        setSelectedSubpageIds(e.target.value as string[]);
        onChange?.(e.target.value as string[]);
      }}
      multiple
    >
      {subpages.map(subpage =>
        <MenuItem value={subpage.id} key={subpage.id}>{subpage.title}</MenuItem>
        )}
    </Select>
};

export default SubpagePicker;