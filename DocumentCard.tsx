"use client";

import React from "react";
import { Card, Tag, Typography, Button, Space } from "antd";
import {
  FileOutlined,
  FolderOutlined,
  EyeOutlined,
  FilePdfOutlined,
  FileImageOutlined,
  FileTextOutlined,
  SoundOutlined,
} from "@ant-design/icons";
import type { DocumentNode, AIEntity } from "~/types/documents";

const { Text, Paragraph } = Typography;

interface DocumentCardProps {
  document: DocumentNode;
  isSelected: boolean;
  isCompact: boolean;
  onPreview: (document: DocumentNode) => void;
  onClick: (document: DocumentNode) => void;
}

const DocumentCard: React.FC<DocumentCardProps> = ({
  document,
  isSelected,
  isCompact,
  onPreview,
  onClick,
}) => {
  // Helper function to get icon based on document type
  const getDocumentIcon = (document: DocumentNode) => {
    if (document.type === "folder") {
      return <FolderOutlined style={{ fontSize: "24px", color: "#faad14" }} />;
    }

    // Different icons based on file type
    const iconStyle = { fontSize: "24px" };
    switch (document.fileType?.toLowerCase()) {
      case "pdf":
        return <FilePdfOutlined style={{ ...iconStyle, color: "#ff4d4f" }} />;
      case "docx":
      case "doc":
        return <FileTextOutlined style={{ ...iconStyle, color: "#1890ff" }} />;
      case "xlsx":
      case "xls":
        return <FileOutlined style={{ ...iconStyle, color: "#52c41a" }} />;
      case "pptx":
      case "ppt":
        return <FileOutlined style={{ ...iconStyle, color: "#fa8c16" }} />;
      case "txt":
      case "md":
        return <FileTextOutlined style={{ ...iconStyle, color: "#722ed1" }} />;
      case "wav":
      case "mp3":
      case "aac":
      case "flac":
        return <SoundOutlined style={{ ...iconStyle, color: "#13c2c2" }} />;
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
      case "bmp":
        return <FileImageOutlined style={{ ...iconStyle, color: "#eb2f96" }} />;
      default:
        return <FileOutlined style={{ ...iconStyle, color: "#1890ff" }} />;
    }
  };

  const renderAIEntities = (entities: AIEntity[]) => {
    const entityColors: Record<string, string> = {
      person: "blue",
      organization: "green",
      location: "orange",
      date: "purple",
      money: "red",
      other: "default",
    };

    return entities.map((entity, index) => (
      <Tag
        key={index}
        color={entityColors[entity.type] || "default"}
        style={{ margin: "2px" }}
      >
        {entity.text} ({entity.type})
      </Tag>
    ));
  };

  return (
    <Card
      hoverable
      bordered={false}
      className={[
        "transition-transform duration-300 ease-out",
        "shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:-translate-y-0.5",
        "hover:shadow-[0_12px_32px_rgba(162,140,109,0.55)]", // <- #a28c6d
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d1c9b7]",
        "rounded-[12px]",
        isSelected ? "border-2 border-[#1890ff]" : "border border-[#b7a78d]",
      ].join(" ")}
      style={{
        height: isCompact ? "200px" : "280px",
        borderRadius: "12px",
        overflow: "hidden",
        border: isSelected ? "2px solid #1890ff" : "1px solid #e8e8e8",
        // boxShadow: isSelected
        //   ? "0 4px 12px rgba(24, 144, 255, 0.15)"
        //   : "0 2px 8px rgba(0,0,0,0.06)",
        transition: "all 0.3s ease",
      }}
      // {/* HEADER COLOR */}
      cover={
        <div
          style={{
            padding: isCompact ? "12px 16px" : "16px 24px",
            background:
              document.type === "folder"
                ? "linear-gradient(135deg, #fff7e6 0%, #ffe7ba 100%)"
                : "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start", // <-- align content to the left
            gap: isCompact ? 10 : 12, // <-- space between icon and name
            position: "relative",
          }}
        >
          {/* LEFT: icon */}
          <div
            style={{
              fontSize: isCompact ? "20px" : "24px",
              lineHeight: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: isCompact ? 28 : 32,
              height: isCompact ? 28 : 32,
            }}
          >
            {getDocumentIcon(document)}
          </div>

          {/* RIGHT: document name (beside icon) */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <Text
              strong
              ellipsis={{ tooltip: document.name }}
              style={{
                fontSize: isCompact ? "13px" : "15px",
                color: isSelected ? "#1890ff" : "inherit",
              }}
            >
              {document.name}
            </Text>
          </div>

          {/* selected checkmark */}
          {isSelected && (
            <div
              style={{
                position: "absolute",
                top: 8,
                right: 8,
                background: "#1890ff",
                color: "white",
                borderRadius: "50%",
                width: 20,
                height: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 10,
              }}
            >
              ✓
            </div>
          )}
        </div>
      }
      // {/* PREVIEW BUTTON */}
      // actions={[
      //   <Button
      //     key="preview"
      //     type={isSelected ? "primary" : "text"}
      //     icon={<EyeOutlined />}
      //     onClick={(e) => {
      //       e.stopPropagation();
      //       onPreview(document);
      //     }}
      //     size="small"
      //   >
      //     {isSelected ? "Previewing" : "Preview"}
      //   </Button>,
      // ]}
      onClick={() => onClick(document)}
    >
      {/* MIDDLE CONTENT */}
      <Card.Meta
        title={
          <div style={{ marginBottom: "8px" }}>
            {/* <Text
              strong
              ellipsis={{ tooltip: document.name }}
              style={{
                fontSize: isCompact ? "12px" : "14px",
                color: isSelected ? "#1890ff" : "inherit",
              }}
            >
              {document.name}
            </Text> */}
          </div>
        }
        description={
          <div>
            <Paragraph
              ellipsis={{
                rows: isCompact ? 1 : 2,
                tooltip: document.aiSummary,
              }}
              style={{
                marginBottom: "8px",
                minHeight: isCompact ? "18px" : "36px",
                fontSize: isCompact ? "11px" : "12px",
                lineHeight: "1.4",
              }}
            >
              {document.aiSummary || "No summary available"}
            </Paragraph>
            <Text type="secondary" style={{ fontSize: "11px" }}>
              📍 {document.path}
            </Text>
            {document.aiEntities &&
              document.aiEntities.length > 0 &&
              !isCompact && (
                <div style={{ marginTop: "6px" }}>
                  {renderAIEntities(document.aiEntities.slice(0, 2)).map(
                    (entity, idx) => (
                      <span key={idx} style={{ fontSize: "10px" }}>
                        {entity}
                      </span>
                    ),
                  )}
                  {document.aiEntities.length > 2 && (
                    <Text type="secondary" style={{ fontSize: "10px" }}>
                      {" "}
                      +{document.aiEntities.length - 2} more
                    </Text>
                  )}
                </div>
              )}
          </div>
        }
      />
      {/* FIXED FOOTER */}{" "}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 48,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px 12px",
          background: "#fff",
          borderTop: "1px solid #f0f0f0",
          boxShadow: "0 -1px 3px rgba(0,0,0,0.03)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* LEFT: type + size */}{" "}
        <div style={{ display: "flex", gap: 0.2 }}>
          {document.type === "folder" && (
            <Tag color="orange" style={{ fontSize: "10px" }}>
              📁 FOLDER
            </Tag>
          )}
          {document.fileType && document.type !== "folder" && (
            <Tag color="blue" style={{ fontSize: "10px" }}>
              {document.fileType.toUpperCase()}
            </Tag>
          )}
          {document.size && document.type !== "folder" && (
            <Tag color="default" style={{ fontSize: "10px" }}>
              {(document.size / 1024).toFixed(1)} KB
            </Tag>
          )}
        </div>
        {/* RIGHT */}
        {[
          <Button
            key="preview"
            type={isSelected ? "primary" : "text"}
            icon={<EyeOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              onPreview(document);
            }}
            size="small"
          >
            {isSelected ? "" : ""}
          </Button>,
        ]}
      </div>
    </Card>
  );
};

export default DocumentCard;
