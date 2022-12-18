interface Section {
  id: string;
  type: string;
}

export interface Header extends Section {
  type: "header";
  header: string;
}
