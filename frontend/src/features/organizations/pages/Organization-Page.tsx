import PageHeader from "@/components/shared/page/Page-Header";
import PageHeading from "@/components/shared/page/Page-Heading";
import PageLayout from "@/components/shared/page/Page-Layout";
import OrganizationProfile from "../components/Organization-Profile";

export default function OrganizationPage() {
  return (
    <PageLayout>
      <PageHeader>
        <PageHeading
          title="Organization"
          description="Manage your organization."
        />
      </PageHeader>
      <div className="px-10">
        <OrganizationProfile />
      </div>
    </PageLayout>
  );
}
