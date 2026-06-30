// src/layouts/MainLayout.jsx
import React from "react";
import PageContainer from "@/components/common/PageContainer";
import OfflineBanner from "@/components/common/OfflineBanner";

function MainLayout({ children }) {
  return (
    <PageContainer>
      <OfflineBanner />
      {children}
    </PageContainer>
  );
}

export default MainLayout;