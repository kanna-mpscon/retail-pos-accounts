import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard";
import ChartTable from "./Components/AccountMaster/ChartTable";
import ChartForm from "./Components/AccountMaster/ChartForm";
import Accounts from "./Components/AccountMaster/Account/Account";
import AccountTable from "./Components/AccountMaster/Account/AccountTable";
import AccountEdit from "./Components/AccountMaster/Account/AccountEdit";
import DefaultEdit from "./Components/AccountMaster/Account/DefaultEdit"; // Import the AccountEdit component

import Transporter from "./Components/AccountMaster/Transporter";
import TransporterForm from "./Components/AccountMaster/TransporterForm";
import Item from "./Components/AccountMaster/Item";
import ItemForm from "./Components/AccountMaster/ItemForm";
import ItemGroup from "./Components/AccountMaster/ItemGroup/ItemGroup";
import ItemGroupForm from "./Components/AccountMaster/ItemGroup/ItemGroupForm";
import ItemCategory from "./Components/AccountMaster/ItemCategory/ItemCategory";
import ItemCategoryForm from "./Components/AccountMaster/ItemCategory/ItemCategoryForm";
import Unit from "./Components/AccountMaster/Unit/UnitTable";
import UnitForm from "./Components/AccountMaster/Unit/UnitForm";
import Quotation from "./Components/Sales/Quotation/Quotation";
import QuotationForm from "./Components/Sales/Quotation/QuotationForm";
import PageNotFound from "./Components/PageNotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="charts-of-account" element={<ChartTable />} />
          <Route path="chart" element={<ChartForm />} />

          {/* Account Routes */}
          <Route path="account" element={<Accounts />} />
          <Route path="accounttable" element={<AccountTable />} />
          <Route path="account/edit/:id" element={<AccountEdit />} />
          <Route path="account/default/edit/:id" element={<DefaultEdit />} />

          <Route path="Transporter" element={<Transporter />} />
          <Route path="transporter/new" element={<TransporterForm />} />

          {/* Item Routes */}
          <Route path="itemcategory" element={<ItemCategory />} />
          <Route path="itemcategory/new" element={<ItemCategoryForm />} />
          <Route path="item" element={<Item />} />
          <Route path="item/new" element={<ItemForm />} />
          <Route path="item/edit/:id" element={<ItemForm />} />

          <Route path="itemgroup" element={<ItemGroup />} />
          <Route path="itemgroup/new" element={<ItemGroupForm />} />

          {/* Unit Routes */}
          <Route path="unit" element={<Unit />} />
          <Route path="unit/new" element={<UnitForm />} />

          <Route path="Quotation" element={<Quotation />} />
          <Route path="Quotation/new" element={<QuotationForm />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
