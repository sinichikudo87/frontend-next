import { hrdConfig } from "./hrd/config";
import { crmConfig } from "./crm/config";
import { kpiConfig } from "./kpi/config";
import { operationsConfig } from "./operations/config";
import { accountingConfig } from "./accounting/config";

export const moduleConfig = {
  hrd: hrdConfig,
  crm: crmConfig,
  kpi: kpiConfig,
  operations: operationsConfig,
  accounting: accountingConfig,
};