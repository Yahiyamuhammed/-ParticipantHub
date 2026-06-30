import PageContainer from "@/components/common/PageContainer";

function MainLayout({ children }) {
  return (
    <PageContainer>
      {children}
    </PageContainer>
  );
}

export default MainLayout;