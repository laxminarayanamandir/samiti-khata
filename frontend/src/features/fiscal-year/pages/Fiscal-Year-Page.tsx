import {
  PageHeader,
  PageHeading,
  PageLayout,
  PageSection,
} from "@/components/shared/page";
import useGetFiscalYears from "../hooks/useGetFiscalYear";
import { ClientDataTable } from "@/components/shared/data-table";
import CreateFiscalYearDialog from "../components/Create-Fiscal-Year-Dialog";
import { fiscalYearDataTableColumns } from "../components/Fiscal-Year-Columns";

export default function FiscalYearPage() {
  const { data, isPending } = useGetFiscalYears();

  return (
    <PageLayout>
      <PageHeader>
        <PageHeading title="Fiscal Year" description="Manage fiscal years." />
        <CreateFiscalYearDialog />
      </PageHeader>
      <PageSection>
        <ClientDataTable
          searchColumn="name"
          columns={fiscalYearDataTableColumns}
          data={data}
          isLoading={isPending}
        />
      </PageSection>
    </PageLayout>
  );
}
