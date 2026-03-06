export declare class Message_ProgressRange {
  UserBreak(): Standard_Boolean;
  More(): Standard_Boolean;
  IsActive(): Standard_Boolean;
  Close(): void;
  delete(): void;
}

  export declare class Message_ProgressRange_1 extends Message_ProgressRange {
    constructor();
  }

  export declare class Message_ProgressRange_2 extends Message_ProgressRange {
    constructor(theOther: Message_ProgressRange);
  }

export declare class Quantity_Color {
  Name_1(): Quantity_NameOfColor;
  SetValues_1(theName: Quantity_NameOfColor): void;
  Rgb(): any;
  SetValues_2(theC1: Standard_Real, theC2: Standard_Real, theC3: Standard_Real, theType: Quantity_TypeOfColor): void;
  Red(): Standard_Real;
  Green(): Standard_Real;
  Blue(): Standard_Real;
  Hue(): Standard_Real;
  Light(): Standard_Real;
  ChangeIntensity(theDelta: Standard_Real): void;
  Saturation(): Standard_Real;
  ChangeContrast(theDelta: Standard_Real): void;
  IsDifferent(theOther: Quantity_Color): Standard_Boolean;
  IsEqual(theOther: Quantity_Color): Standard_Boolean;
  Distance(theColor: Quantity_Color): Standard_Real;
  SquareDistance(theColor: Quantity_Color): Standard_Real;
  Delta(theColor: Quantity_Color, DC: Standard_Real, DI: Standard_Real): void;
  DeltaE2000(theOther: Quantity_Color): Standard_Real;
  static Name_2(theR: Standard_Real, theG: Standard_Real, theB: Standard_Real): Quantity_NameOfColor;
  static StringName(theColor: Quantity_NameOfColor): Standard_Character;
  static ColorFromHex(theHexColorString: Standard_Character, theColor: Quantity_Color): Standard_Boolean;
  static ColorToHex(theColor: Quantity_Color, theToPrefixHash: Standard_Boolean): XCAFDoc_PartId;
  static Convert_sRGB_To_HLS(theRgb: NCollection_Vec3<float>): any;
  static Convert_HLS_To_sRGB(theHls: NCollection_Vec3<float>): any;
  static Convert_LinearRGB_To_HLS(theRgb: NCollection_Vec3<float>): any;
  static Convert_HLS_To_LinearRGB(theHls: NCollection_Vec3<float>): any;
  static Convert_LinearRGB_To_Lab(theRgb: NCollection_Vec3<float>): any;
  static Convert_Lab_To_Lch(theLab: NCollection_Vec3<float>): any;
  static Convert_Lab_To_LinearRGB(theLab: NCollection_Vec3<float>): any;
  static Convert_Lch_To_Lab(theLch: NCollection_Vec3<float>): any;
  static Color2argb(theColor: Quantity_Color, theARGB: Standard_Integer): void;
  static Argb2color(theARGB: Standard_Integer, theColor: Quantity_Color): void;
  static Convert_LinearRGB_To_sRGB_1(theLinearValue: Standard_Real): Standard_Real;
  static Convert_LinearRGB_To_sRGB_2(theLinearValue: Standard_ShortReal): Standard_ShortReal;
  static Convert_sRGB_To_LinearRGB_1(thesRGBValue: Standard_Real): Standard_Real;
  static Convert_sRGB_To_LinearRGB_2(thesRGBValue: Standard_ShortReal): Standard_ShortReal;
  static Convert_LinearRGB_To_sRGB_approx22_1(theLinearValue: Standard_ShortReal): Standard_ShortReal;
  static Convert_sRGB_To_LinearRGB_approx22_1(thesRGBValue: Standard_ShortReal): Standard_ShortReal;
  static Convert_LinearRGB_To_sRGB_approx22_2(theRGB: NCollection_Vec3<float>): any;
  static Convert_sRGB_To_LinearRGB_approx22_2(theRGB: NCollection_Vec3<float>): any;
  static HlsRgb(theH: Standard_Real, theL: Standard_Real, theS: Standard_Real, theR: Standard_Real, theG: Standard_Real, theB: Standard_Real): void;
  static RgbHls(theR: Standard_Real, theG: Standard_Real, theB: Standard_Real, theH: Standard_Real, theL: Standard_Real, theS: Standard_Real): void;
  static Epsilon(): Standard_Real;
  static SetEpsilon(theEpsilon: Standard_Real): void;
  InitFromJson(theSStream: Standard_SStream, theStreamPos: Standard_Integer): Standard_Boolean;
  delete(): void;
}

  export declare class Quantity_Color_1 extends Quantity_Color {
    constructor();
  }

  export declare class Quantity_Color_2 extends Quantity_Color {
    constructor(theName: Quantity_NameOfColor);
  }

  export declare class Quantity_Color_3 extends Quantity_Color {
    constructor(theC1: Standard_Real, theC2: Standard_Real, theC3: Standard_Real, theType: Quantity_TypeOfColor);
  }

  export declare class Quantity_Color_4 extends Quantity_Color {
    constructor(theRgb: NCollection_Vec3<float>);
  }

export declare class Quantity_ColorRGBA {
  SetValues(theRed: Standard_ShortReal, theGreen: Standard_ShortReal, theBlue: Standard_ShortReal, theAlpha: Standard_ShortReal): void;
  GetRGB(): Quantity_Color;
  ChangeRGB(): Quantity_Color;
  SetRGB(theRgb: Quantity_Color): void;
  Alpha(): Standard_ShortReal;
  SetAlpha(theAlpha: Standard_ShortReal): void;
  IsDifferent(theOther: Quantity_ColorRGBA): Standard_Boolean;
  IsEqual(theOther: Quantity_ColorRGBA): Standard_Boolean;
  static ColorFromName(theColorNameString: Standard_Character, theColor: Quantity_ColorRGBA): Standard_Boolean;
  static ColorFromHex(theHexColorString: Standard_Character, theColor: Quantity_ColorRGBA, theAlphaComponentIsOff: Standard_Boolean): Standard_Boolean;
  static ColorToHex(theColor: Quantity_ColorRGBA, theToPrefixHash: Standard_Boolean): XCAFDoc_PartId;
  static Convert_LinearRGB_To_sRGB(theRGB: NCollection_Vec4<float>): any;
  static Convert_sRGB_To_LinearRGB(theRGB: NCollection_Vec4<float>): any;
  InitFromJson(theSStream: Standard_SStream, theStreamPos: Standard_Integer): Standard_Boolean;
  delete(): void;
}

  export declare class Quantity_ColorRGBA_1 extends Quantity_ColorRGBA {
    constructor();
  }

  export declare class Quantity_ColorRGBA_2 extends Quantity_ColorRGBA {
    constructor(theRgb: Quantity_Color);
  }

  export declare class Quantity_ColorRGBA_3 extends Quantity_ColorRGBA {
    constructor(theRgb: Quantity_Color, theAlpha: Standard_ShortReal);
  }

  export declare class Quantity_ColorRGBA_4 extends Quantity_ColorRGBA {
    constructor(theRgba: NCollection_Vec4<float>);
  }

  export declare class Quantity_ColorRGBA_5 extends Quantity_ColorRGBA {
    constructor(theRed: Standard_ShortReal, theGreen: Standard_ShortReal, theBlue: Standard_ShortReal, theAlpha: Standard_ShortReal);
  }

export declare class NCollection_BaseList {
  Extent(): Standard_Integer;
  IsEmpty(): Standard_Boolean;
  Allocator(): TDF_HAllocator;
  delete(): void;
}

export declare class Standard_Transient {
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): Handle_Standard_Type;
  DynamicType(): Handle_Standard_Type;
  IsInstance_1(theType: Handle_Standard_Type): Standard_Boolean;
  IsInstance_2(theTypeName: Standard_Character): Standard_Boolean;
  IsKind_1(theType: Handle_Standard_Type): Standard_Boolean;
  IsKind_2(theTypeName: Standard_Character): Standard_Boolean;
  This(): Standard_Transient;
  GetRefCount(): Standard_Integer;
  IncrementRefCounter(): void;
  DecrementRefCounter(): Standard_Integer;
  Delete(): void;
  delete(): void;
}

  export declare class Standard_Transient_1 extends Standard_Transient {
    constructor();
  }

  export declare class Standard_Transient_2 extends Standard_Transient {
    constructor(a: Standard_Transient);
  }

export declare class Precision {
  constructor();
  static Angular(): Standard_Real;
  static Confusion(): Standard_Real;
  static SquareConfusion(): Standard_Real;
  static Computational(): Standard_Real;
  static SquareComputational(): Standard_Real;
  static Intersection(): Standard_Real;
  static Approximation(): Standard_Real;
  static Parametric_1(P: Standard_Real, T: Standard_Real): Standard_Real;
  static PConfusion_1(T: Standard_Real): Standard_Real;
  static SquarePConfusion(): Standard_Real;
  static PIntersection_1(T: Standard_Real): Standard_Real;
  static PApproximation_1(T: Standard_Real): Standard_Real;
  static Parametric_2(P: Standard_Real): Standard_Real;
  static PConfusion_2(): Standard_Real;
  static PIntersection_2(): Standard_Real;
  static PApproximation_2(): Standard_Real;
  static IsInfinite(R: Standard_Real): Standard_Boolean;
  static IsPositiveInfinite(R: Standard_Real): Standard_Boolean;
  static IsNegativeInfinite(R: Standard_Real): Standard_Boolean;
  static Infinite(): Standard_Real;
  delete(): void;
}

export declare class TCollection_ExtendedString {
  AssignCat_1(theOther: TCollection_ExtendedString): void;
  AssignCat_2(theChar: Standard_ExtCharacter): void;
  AssignCat_3(theString: Standard_ExtCharacter, theLength: Standard_Integer): void;
  AssignCat_4(theString: Standard_ExtCharacter): void;
  AssignCat_6(theStringView: any): void;
  Cat_1(theOther: Standard_ExtCharacter, theLength: Standard_Integer): TCollection_ExtendedString;
  Cat_2(theOther: Standard_ExtCharacter): TCollection_ExtendedString;
  Cat_3(theOther: TCollection_ExtendedString): TCollection_ExtendedString;
  ChangeAll(theChar: Standard_ExtCharacter, theNewChar: Standard_ExtCharacter): void;
  Clear(): void;
  Copy_1(theString: Standard_ExtCharacter, theLength: Standard_Integer): void;
  Copy_2(theString: Standard_ExtCharacter): void;
  Copy_3(theFromWhere: TCollection_ExtendedString): void;
  Move(theOther: TCollection_ExtendedString): void;
  Swap(theOther: TCollection_ExtendedString): void;
  Insert_1(theWhere: Standard_Integer, theWhat: Standard_ExtCharacter): void;
  Insert_2(theWhere: Standard_Integer, theWhat: Standard_ExtCharacter, theLength: Standard_Integer): void;
  Insert_3(theWhere: Standard_Integer, theWhat: Standard_ExtCharacter): void;
  Insert_4(theWhere: Standard_Integer, theWhat: TCollection_ExtendedString): void;
  IsEmpty(): Standard_Boolean;
  IsEqual_1(theOther: Standard_ExtCharacter, theLength: Standard_Integer): Standard_Boolean;
  IsEqual_2(theOther: Standard_ExtCharacter): Standard_Boolean;
  IsEqual_3(theOther: TCollection_ExtendedString): Standard_Boolean;
  IsDifferent_1(theOther: Standard_ExtCharacter, theLength: Standard_Integer): Standard_Boolean;
  IsDifferent_2(theOther: Standard_ExtCharacter): Standard_Boolean;
  IsDifferent_3(theOther: TCollection_ExtendedString): Standard_Boolean;
  IsLess_1(theOther: Standard_ExtCharacter, theLength: Standard_Integer): Standard_Boolean;
  IsLess_2(theOther: Standard_ExtCharacter): Standard_Boolean;
  IsLess_3(theOther: TCollection_ExtendedString): Standard_Boolean;
  IsGreater_1(theOther: Standard_ExtCharacter, theLength: Standard_Integer): Standard_Boolean;
  IsGreater_2(theOther: Standard_ExtCharacter): Standard_Boolean;
  IsGreater_3(theOther: TCollection_ExtendedString): Standard_Boolean;
  StartsWith_1(theStartString: Standard_ExtCharacter, theLength: Standard_Integer): Standard_Boolean;
  StartsWith_2(theStartString: Standard_ExtCharacter): Standard_Boolean;
  StartsWith_3(theStartString: TCollection_ExtendedString): Standard_Boolean;
  EndsWith_1(theEndString: Standard_ExtCharacter, theLength: Standard_Integer): Standard_Boolean;
  EndsWith_2(theEndString: Standard_ExtCharacter): Standard_Boolean;
  EndsWith_3(theEndString: TCollection_ExtendedString): Standard_Boolean;
  IsAscii(): Standard_Boolean;
  Length(): Standard_Integer;
  RemoveAll(theWhat: Standard_ExtCharacter): void;
  Remove(theWhere: Standard_Integer, theHowMany: Standard_Integer): void;
  Search_1(theWhat: Standard_ExtCharacter, theLength: Standard_Integer): Standard_Integer;
  Search_2(theWhat: Standard_ExtCharacter): Standard_Integer;
  Search_3(theWhat: TCollection_ExtendedString): Standard_Integer;
  SearchFromEnd_1(theWhat: Standard_ExtCharacter, theLength: Standard_Integer): Standard_Integer;
  SearchFromEnd_2(theWhat: Standard_ExtCharacter): Standard_Integer;
  SearchFromEnd_3(theWhat: TCollection_ExtendedString): Standard_Integer;
  SetValue_1(theWhere: Standard_Integer, theWhat: Standard_ExtCharacter): void;
  SetValue_2(theWhere: Standard_Integer, theWhat: Standard_ExtCharacter, theLength: Standard_Integer): void;
  SetValue_3(theWhere: Standard_Integer, theWhat: Standard_ExtCharacter): void;
  SetValue_4(theWhere: Standard_Integer, theWhat: TCollection_ExtendedString): void;
  SubString(theFromIndex: Standard_Integer, theToIndex: Standard_Integer): TCollection_ExtendedString;
  Split(theWhere: Standard_Integer): TCollection_ExtendedString;
  Token(theSeparators: Standard_ExtCharacter, theWhichOne: Standard_Integer): TCollection_ExtendedString;
  ToExtString(): Standard_ExtCharacter;
  Trunc(theHowMany: Standard_Integer): void;
  Value(theWhere: Standard_Integer): Standard_ExtCharacter;
  HashCode(): Standard_Size;
  static EmptyString(): TCollection_ExtendedString;
  static IsEqual_4(theString1: TCollection_ExtendedString, theString2: TCollection_ExtendedString): Standard_Boolean;
  LengthOfCString(): Standard_Integer;
  LeftAdjust(): void;
  RightAdjust(): void;
  LeftJustify(theWidth: Standard_Integer, theFiller: Standard_ExtCharacter): void;
  RightJustify(theWidth: Standard_Integer, theFiller: Standard_ExtCharacter): void;
  Center(theWidth: Standard_Integer, theFiller: Standard_ExtCharacter): void;
  Capitalize(): void;
  Prepend_1(theOther: Standard_ExtCharacter, theLength: Standard_Integer): void;
  Prepend_2(theOther: Standard_ExtCharacter): void;
  Prepend_3(theOther: TCollection_ExtendedString): void;
  FirstLocationInSet(theSet: TCollection_ExtendedString, theFromIndex: Standard_Integer, theToIndex: Standard_Integer): Standard_Integer;
  FirstLocationNotInSet(theSet: TCollection_ExtendedString, theFromIndex: Standard_Integer, theToIndex: Standard_Integer): Standard_Integer;
  IntegerValue(): Standard_Integer;
  IsIntegerValue(): Standard_Boolean;
  RealValue(): Standard_Real;
  IsRealValue(theToCheckFull: Standard_Boolean): Standard_Boolean;
  IsSameString(theOther: TCollection_ExtendedString, theIsCaseSensitive: Standard_Boolean): Standard_Boolean;
  delete(): void;
}

  export declare class TCollection_ExtendedString_1 extends TCollection_ExtendedString {
    constructor();
  }

  export declare class TCollection_ExtendedString_2 extends TCollection_ExtendedString {
    constructor(theString: Standard_Character, theIsMultiByte: Standard_Boolean);
  }

  export declare class TCollection_ExtendedString_3 extends TCollection_ExtendedString {
    constructor(theString: Standard_ExtCharacter);
  }

  export declare class TCollection_ExtendedString_4 extends TCollection_ExtendedString {
    constructor(theStringUtf: Standard_WideChar);
  }

  export declare class TCollection_ExtendedString_5 extends TCollection_ExtendedString {
    constructor(theChar: Standard_Character);
  }

  export declare class TCollection_ExtendedString_6 extends TCollection_ExtendedString {
    constructor(theChar: Standard_ExtCharacter);
  }

  export declare class TCollection_ExtendedString_7 extends TCollection_ExtendedString {
    constructor(theLength: Standard_Integer, theFiller: Standard_ExtCharacter);
  }

  export declare class TCollection_ExtendedString_8 extends TCollection_ExtendedString {
    constructor(theValue: Standard_Integer);
  }

  export declare class TCollection_ExtendedString_9 extends TCollection_ExtendedString {
    constructor(theValue: Standard_Real);
  }

  export declare class TCollection_ExtendedString_10 extends TCollection_ExtendedString {
    constructor(theString: TCollection_ExtendedString);
  }

  export declare class TCollection_ExtendedString_11 extends TCollection_ExtendedString {
    constructor(theOther: TCollection_ExtendedString);
  }

  export declare class TCollection_ExtendedString_12 extends TCollection_ExtendedString {
    constructor(theString: XCAFDoc_PartId, theIsMultiByte: Standard_Boolean);
  }

  export declare class TCollection_ExtendedString_13 extends TCollection_ExtendedString {
    constructor(theString: Standard_ExtCharacter, theLength: Standard_Integer);
  }

  export declare class TCollection_ExtendedString_15 extends TCollection_ExtendedString {
    constructor(theStringView: any);
  }

export declare class TopLoc_Location {
  IsIdentity(): Standard_Boolean;
  Identity(): void;
  FirstDatum(): any;
  FirstPower(): Standard_Integer;
  NextLocation(): TopLoc_Location;
  Transformation(): gp_Trsf;
  Inverted(): TopLoc_Location;
  Multiplied(Other: TopLoc_Location): TopLoc_Location;
  Divided(Other: TopLoc_Location): TopLoc_Location;
  Predivided(Other: TopLoc_Location): TopLoc_Location;
  Powered(pwr: Standard_Integer): TopLoc_Location;
  HashCode(): Standard_Size;
  IsEqual(theOther: TopLoc_Location): Standard_Boolean;
  IsDifferent(theOther: TopLoc_Location): Standard_Boolean;
  Clear(): void;
  static ScalePrec(): Standard_Real;
  delete(): void;
}

  export declare class TopLoc_Location_1 extends TopLoc_Location {
    constructor();
  }

  export declare class TopLoc_Location_2 extends TopLoc_Location {
    constructor(theOther: TopLoc_Location);
  }

  export declare class TopLoc_Location_3 extends TopLoc_Location {
    constructor(theOther: TopLoc_Location);
  }

  export declare class TopLoc_Location_4 extends TopLoc_Location {
    constructor(T: gp_Trsf);
  }

  export declare class TopLoc_Location_5 extends TopLoc_Location {
    constructor(D: any);
  }

export declare class gp_Circ2d {
  SetLocation(theP: gp_Pnt2d): void;
  SetXAxis(theA: gp_Ax2d): void;
  SetAxis(theA: gp_Ax22d): void;
  SetYAxis(theA: gp_Ax2d): void;
  SetRadius(theRadius: Standard_Real): void;
  Area(): Standard_Real;
  Coefficients(theA: Standard_Real, theB: Standard_Real, theC: Standard_Real, theD: Standard_Real, theE: Standard_Real, theF: Standard_Real): void;
  Contains(theP: gp_Pnt2d, theLinearTolerance: Standard_Real): Standard_Boolean;
  Distance(theP: gp_Pnt2d): Standard_Real;
  SquareDistance(theP: gp_Pnt2d): Standard_Real;
  Length(): Standard_Real;
  Location(): gp_Pnt2d;
  Radius(): Standard_Real;
  Axis(): gp_Ax22d;
  Position(): gp_Ax22d;
  XAxis(): gp_Ax2d;
  YAxis(): gp_Ax2d;
  Reverse(): void;
  Reversed(): gp_Circ2d;
  IsDirect(): Standard_Boolean;
  Mirror_1(theP: gp_Pnt2d): void;
  Mirrored_1(theP: gp_Pnt2d): gp_Circ2d;
  Mirror_2(theA: gp_Ax2d): void;
  Mirrored_2(theA: gp_Ax2d): gp_Circ2d;
  Rotate(theP: gp_Pnt2d, theAng: Standard_Real): void;
  Rotated(theP: gp_Pnt2d, theAng: Standard_Real): gp_Circ2d;
  Scale(theP: gp_Pnt2d, theS: Standard_Real): void;
  Scaled(theP: gp_Pnt2d, theS: Standard_Real): gp_Circ2d;
  Transform(theT: gp_Trsf2d): void;
  Transformed(theT: gp_Trsf2d): gp_Circ2d;
  Translate_1(theV: gp_Vec2d): void;
  Translated_1(theV: gp_Vec2d): gp_Circ2d;
  Translate_2(theP1: gp_Pnt2d, theP2: gp_Pnt2d): void;
  Translated_2(theP1: gp_Pnt2d, theP2: gp_Pnt2d): gp_Circ2d;
  delete(): void;
}

  export declare class gp_Circ2d_1 extends gp_Circ2d {
    constructor();
  }

  export declare class gp_Circ2d_2 extends gp_Circ2d {
    constructor(theXAxis: gp_Ax2d, theRadius: Standard_Real, theIsSense: Standard_Boolean);
  }

  export declare class gp_Circ2d_3 extends gp_Circ2d {
    constructor(theAxis: gp_Ax22d, theRadius: Standard_Real);
  }

export declare class gp_Vec {
  SetCoord_1(theIndex: Standard_Integer, theXi: Standard_Real): void;
  SetCoord_2(theXv: Standard_Real, theYv: Standard_Real, theZv: Standard_Real): void;
  SetX(theX: Standard_Real): void;
  SetY(theY: Standard_Real): void;
  SetZ(theZ: Standard_Real): void;
  SetXYZ(theCoord: gp_XYZ): void;
  Coord_1(theIndex: Standard_Integer): Standard_Real;
  Coord_2(theXv: Standard_Real, theYv: Standard_Real, theZv: Standard_Real): void;
  X(): Standard_Real;
  Y(): Standard_Real;
  Z(): Standard_Real;
  XYZ(): gp_XYZ;
  IsEqual(theOther: gp_Vec, theLinearTolerance: Standard_Real, theAngularTolerance: Standard_Real): Standard_Boolean;
  IsNormal(theOther: gp_Vec, theAngularTolerance: Standard_Real): Standard_Boolean;
  IsOpposite(theOther: gp_Vec, theAngularTolerance: Standard_Real): Standard_Boolean;
  IsParallel(theOther: gp_Vec, theAngularTolerance: Standard_Real): Standard_Boolean;
  Angle(theOther: gp_Vec): Standard_Real;
  AngleWithRef(theOther: gp_Vec, theVRef: gp_Vec): Standard_Real;
  Magnitude(): Standard_Real;
  SquareMagnitude(): Standard_Real;
  Add(theOther: gp_Vec): void;
  Added(theOther: gp_Vec): gp_Vec;
  Subtract(theRight: gp_Vec): void;
  Subtracted(theRight: gp_Vec): gp_Vec;
  Multiply(theScalar: Standard_Real): void;
  Multiplied(theScalar: Standard_Real): gp_Vec;
  Divide(theScalar: Standard_Real): void;
  Divided(theScalar: Standard_Real): gp_Vec;
  Cross(theRight: gp_Vec): void;
  Crossed(theRight: gp_Vec): gp_Vec;
  CrossMagnitude(theRight: gp_Vec): Standard_Real;
  CrossSquareMagnitude(theRight: gp_Vec): Standard_Real;
  CrossCross(theV1: gp_Vec, theV2: gp_Vec): void;
  CrossCrossed(theV1: gp_Vec, theV2: gp_Vec): gp_Vec;
  Dot(theOther: gp_Vec): Standard_Real;
  DotCross(theV1: gp_Vec, theV2: gp_Vec): Standard_Real;
  Normalize(): void;
  Normalized(): gp_Vec;
  Reverse(): void;
  Reversed(): gp_Vec;
  SetLinearForm_1(theA1: Standard_Real, theV1: gp_Vec, theA2: Standard_Real, theV2: gp_Vec, theA3: Standard_Real, theV3: gp_Vec, theV4: gp_Vec): void;
  SetLinearForm_2(theA1: Standard_Real, theV1: gp_Vec, theA2: Standard_Real, theV2: gp_Vec, theA3: Standard_Real, theV3: gp_Vec): void;
  SetLinearForm_3(theA1: Standard_Real, theV1: gp_Vec, theA2: Standard_Real, theV2: gp_Vec, theV3: gp_Vec): void;
  SetLinearForm_4(theA1: Standard_Real, theV1: gp_Vec, theA2: Standard_Real, theV2: gp_Vec): void;
  SetLinearForm_5(theA1: Standard_Real, theV1: gp_Vec, theV2: gp_Vec): void;
  SetLinearForm_6(theV1: gp_Vec, theV2: gp_Vec): void;
  Mirror_1(theV: gp_Vec): void;
  Mirrored_1(theV: gp_Vec): gp_Vec;
  Mirror_2(theA1: gp_Ax1): void;
  Mirrored_2(theA1: gp_Ax1): gp_Vec;
  Mirror_3(theA2: gp_Ax2): void;
  Mirrored_3(theA2: gp_Ax2): gp_Vec;
  Rotate(theA1: gp_Ax1, theAng: Standard_Real): void;
  Rotated(theA1: gp_Ax1, theAng: Standard_Real): gp_Vec;
  Scale(theS: Standard_Real): void;
  Scaled(theS: Standard_Real): gp_Vec;
  Transform(theT: gp_Trsf): void;
  Transformed(theT: gp_Trsf): gp_Vec;
  delete(): void;
}

  export declare class gp_Vec_1 extends gp_Vec {
    constructor();
  }

  export declare class gp_Vec_2 extends gp_Vec {
    constructor(theV: gp_Dir);
  }

  export declare class gp_Vec_3 extends gp_Vec {
    constructor(theCoord: gp_XYZ);
  }

  export declare class gp_Vec_4 extends gp_Vec {
    constructor(theXv: Standard_Real, theYv: Standard_Real, theZv: Standard_Real);
  }

  export declare class gp_Vec_5 extends gp_Vec {
    constructor(theP1: gp_Pnt, theP2: gp_Pnt);
  }

export declare class gp_Elips2d {
  SetLocation(theP: gp_Pnt2d): void;
  SetMajorRadius(theMajorRadius: Standard_Real): void;
  SetMinorRadius(theMinorRadius: Standard_Real): void;
  SetAxis(theA: gp_Ax22d): void;
  SetXAxis(theA: gp_Ax2d): void;
  SetYAxis(theA: gp_Ax2d): void;
  Area(): Standard_Real;
  Coefficients(theA: Standard_Real, theB: Standard_Real, theC: Standard_Real, theD: Standard_Real, theE: Standard_Real, theF: Standard_Real): void;
  Directrix1(): gp_Ax2d;
  Directrix2(): gp_Ax2d;
  Eccentricity(): Standard_Real;
  Focal(): Standard_Real;
  Focus1(): gp_Pnt2d;
  Focus2(): gp_Pnt2d;
  Location(): gp_Pnt2d;
  MajorRadius(): Standard_Real;
  MinorRadius(): Standard_Real;
  Parameter(): Standard_Real;
  Axis(): gp_Ax22d;
  XAxis(): gp_Ax2d;
  YAxis(): gp_Ax2d;
  Reverse(): void;
  Reversed(): gp_Elips2d;
  IsDirect(): Standard_Boolean;
  Mirror_1(theP: gp_Pnt2d): void;
  Mirrored_1(theP: gp_Pnt2d): gp_Elips2d;
  Mirror_2(theA: gp_Ax2d): void;
  Mirrored_2(theA: gp_Ax2d): gp_Elips2d;
  Rotate(theP: gp_Pnt2d, theAng: Standard_Real): void;
  Rotated(theP: gp_Pnt2d, theAng: Standard_Real): gp_Elips2d;
  Scale(theP: gp_Pnt2d, theS: Standard_Real): void;
  Scaled(theP: gp_Pnt2d, theS: Standard_Real): gp_Elips2d;
  Transform(theT: gp_Trsf2d): void;
  Transformed(theT: gp_Trsf2d): gp_Elips2d;
  Translate_1(theV: gp_Vec2d): void;
  Translated_1(theV: gp_Vec2d): gp_Elips2d;
  Translate_2(theP1: gp_Pnt2d, theP2: gp_Pnt2d): void;
  Translated_2(theP1: gp_Pnt2d, theP2: gp_Pnt2d): gp_Elips2d;
  delete(): void;
}

  export declare class gp_Elips2d_1 extends gp_Elips2d {
    constructor();
  }

  export declare class gp_Elips2d_2 extends gp_Elips2d {
    constructor(theMajorAxis: gp_Ax2d, theMajorRadius: Standard_Real, theMinorRadius: Standard_Real, theIsSense: Standard_Boolean);
  }

  export declare class gp_Elips2d_3 extends gp_Elips2d {
    constructor(theA: gp_Ax22d, theMajorRadius: Standard_Real, theMinorRadius: Standard_Real);
  }

export declare class gp_GTrsf2d {
  SetAffinity(theA: gp_Ax2d, theRatio: Standard_Real): void;
  SetValue(theRow: Standard_Integer, theCol: Standard_Integer, theValue: Standard_Real): void;
  SetTranslationPart(theCoord: gp_XY): void;
  SetTrsf2d(theT: gp_Trsf2d): void;
  SetVectorialPart(theMatrix: gp_Mat2d): void;
  IsNegative(): Standard_Boolean;
  IsSingular(): Standard_Boolean;
  Form(): gp_TrsfForm;
  TranslationPart(): gp_XY;
  VectorialPart(): gp_Mat2d;
  Value(theRow: Standard_Integer, theCol: Standard_Integer): Standard_Real;
  Invert(): void;
  Inverted(): gp_GTrsf2d;
  Multiplied(theT: gp_GTrsf2d): gp_GTrsf2d;
  Multiply(theT: gp_GTrsf2d): void;
  PreMultiply(theT: gp_GTrsf2d): void;
  Power(theN: Standard_Integer): void;
  Powered(theN: Standard_Integer): gp_GTrsf2d;
  Transforms_1(theCoord: gp_XY): void;
  Transformed(theCoord: gp_XY): gp_XY;
  Transforms_2(theX: Standard_Real, theY: Standard_Real): void;
  Trsf2d(): gp_Trsf2d;
  delete(): void;
}

  export declare class gp_GTrsf2d_1 extends gp_GTrsf2d {
    constructor();
  }

  export declare class gp_GTrsf2d_2 extends gp_GTrsf2d {
    constructor(theT: gp_Trsf2d);
  }

  export declare class gp_GTrsf2d_3 extends gp_GTrsf2d {
    constructor(theM: gp_Mat2d, theV: gp_XY);
  }

export declare class gp_Ax1 {
  SetDirection(theV: gp_Dir): void;
  SetLocation(theP: gp_Pnt): void;
  Direction(): gp_Dir;
  Location(): gp_Pnt;
  IsCoaxial(Other: gp_Ax1, AngularTolerance: Standard_Real, LinearTolerance: Standard_Real): Standard_Boolean;
  IsNormal(theOther: gp_Ax1, theAngularTolerance: Standard_Real): Standard_Boolean;
  IsOpposite(theOther: gp_Ax1, theAngularTolerance: Standard_Real): Standard_Boolean;
  IsParallel(theOther: gp_Ax1, theAngularTolerance: Standard_Real): Standard_Boolean;
  Angle(theOther: gp_Ax1): Standard_Real;
  Reverse(): void;
  Reversed(): gp_Ax1;
  Mirror_1(P: gp_Pnt): void;
  Mirrored_1(P: gp_Pnt): gp_Ax1;
  Mirror_2(A1: gp_Ax1): void;
  Mirrored_2(A1: gp_Ax1): gp_Ax1;
  Mirror_3(A2: gp_Ax2): void;
  Mirrored_3(A2: gp_Ax2): gp_Ax1;
  Rotate(theA1: gp_Ax1, theAngRad: Standard_Real): void;
  Rotated(theA1: gp_Ax1, theAngRad: Standard_Real): gp_Ax1;
  Scale(theP: gp_Pnt, theS: Standard_Real): void;
  Scaled(theP: gp_Pnt, theS: Standard_Real): gp_Ax1;
  Transform(theT: gp_Trsf): void;
  Transformed(theT: gp_Trsf): gp_Ax1;
  Translate_1(theV: gp_Vec): void;
  Translated_1(theV: gp_Vec): gp_Ax1;
  Translate_2(theP1: gp_Pnt, theP2: gp_Pnt): void;
  Translated_2(theP1: gp_Pnt, theP2: gp_Pnt): gp_Ax1;
  InitFromJson(theSStream: Standard_SStream, theStreamPos: Standard_Integer): Standard_Boolean;
  delete(): void;
}

  export declare class gp_Ax1_1 extends gp_Ax1 {
    constructor();
  }

  export declare class gp_Ax1_2 extends gp_Ax1 {
    constructor(theP: gp_Pnt, theV: gp_Dir);
  }

  export declare class gp_Ax1_3 extends gp_Ax1 {
    constructor(theP: gp_Pnt, theDir: gp_Dir_D);
  }

  export declare class gp_Ax1_4 extends gp_Ax1 {
    constructor(theDir: gp_Dir_D);
  }

export declare class gp_Trsf {
  SetMirror_1(theP: gp_Pnt): void;
  SetMirror_2(theA1: gp_Ax1): void;
  SetMirror_3(theA2: gp_Ax2): void;
  SetRotation_1(theA1: gp_Ax1, theAng: Standard_Real): void;
  SetRotation_2(theR: gp_Quaternion): void;
  SetRotationPart(theR: gp_Quaternion): void;
  SetScale(theP: gp_Pnt, theS: Standard_Real): void;
  SetDisplacement(theFromSystem1: gp_Ax3, theToSystem2: gp_Ax3): void;
  SetTransformation_1(theFromSystem1: gp_Ax3, theToSystem2: gp_Ax3): void;
  SetTransformation_2(theToSystem: gp_Ax3): void;
  SetTransformation_3(R: gp_Quaternion, theT: gp_Vec): void;
  SetTranslation_1(theV: gp_Vec): void;
  SetTranslation_2(theP1: gp_Pnt, theP2: gp_Pnt): void;
  SetTranslationPart(theV: gp_Vec): void;
  SetScaleFactor(theS: Standard_Real): void;
  SetForm(theP: gp_TrsfForm): void;
  SetValues(a11: Standard_Real, a12: Standard_Real, a13: Standard_Real, a14: Standard_Real, a21: Standard_Real, a22: Standard_Real, a23: Standard_Real, a24: Standard_Real, a31: Standard_Real, a32: Standard_Real, a33: Standard_Real, a34: Standard_Real): void;
  IsNegative(): Standard_Boolean;
  Form(): gp_TrsfForm;
  ScaleFactor(): Standard_Real;
  TranslationPart(): gp_XYZ;
  GetRotation_1(theAxis: gp_XYZ, theAngle: Standard_Real): Standard_Boolean;
  GetRotation_2(): gp_Quaternion;
  VectorialPart(): gp_Mat;
  HVectorialPart(): gp_Mat;
  Value(theRow: Standard_Integer, theCol: Standard_Integer): Standard_Real;
  Invert(): void;
  Inverted(): gp_Trsf;
  Multiplied(theT: gp_Trsf): gp_Trsf;
  Multiply(theT: gp_Trsf): void;
  PreMultiply(theT: gp_Trsf): void;
  Power(theN: Standard_Integer): void;
  Powered(theN: Standard_Integer): gp_Trsf;
  Transforms_1(theX: Standard_Real, theY: Standard_Real, theZ: Standard_Real): void;
  Transforms_2(theCoord: gp_XYZ): void;
  InitFromJson(theSStream: Standard_SStream, theStreamPos: Standard_Integer): Standard_Boolean;
  delete(): void;
}

  export declare class gp_Trsf_1 extends gp_Trsf {
    constructor();
  }

  export declare class gp_Trsf_2 extends gp_Trsf {
    constructor(theT: gp_Trsf2d);
  }

export declare class gp_Pnt {
  SetCoord_1(theIndex: Standard_Integer, theXi: Standard_Real): void;
  SetCoord_2(theXp: Standard_Real, theYp: Standard_Real, theZp: Standard_Real): void;
  SetX(theX: Standard_Real): void;
  SetY(theY: Standard_Real): void;
  SetZ(theZ: Standard_Real): void;
  SetXYZ(theCoord: gp_XYZ): void;
  Coord_1(theIndex: Standard_Integer): Standard_Real;
  Coord_2(theXp: Standard_Real, theYp: Standard_Real, theZp: Standard_Real): void;
  X(): Standard_Real;
  Y(): Standard_Real;
  Z(): Standard_Real;
  XYZ(): gp_XYZ;
  Coord_3(): gp_XYZ;
  ChangeCoord(): gp_XYZ;
  BaryCenter(theAlpha: Standard_Real, theP: gp_Pnt, theBeta: Standard_Real): void;
  IsEqual(theOther: gp_Pnt, theLinearTolerance: Standard_Real): Standard_Boolean;
  Distance(theOther: gp_Pnt): Standard_Real;
  SquareDistance(theOther: gp_Pnt): Standard_Real;
  Mirror_1(theP: gp_Pnt): void;
  Mirrored_1(theP: gp_Pnt): gp_Pnt;
  Mirror_2(theA1: gp_Ax1): void;
  Mirrored_2(theA1: gp_Ax1): gp_Pnt;
  Mirror_3(theA2: gp_Ax2): void;
  Mirrored_3(theA2: gp_Ax2): gp_Pnt;
  Rotate(theA1: gp_Ax1, theAng: Standard_Real): void;
  Rotated(theA1: gp_Ax1, theAng: Standard_Real): gp_Pnt;
  Scale(theP: gp_Pnt, theS: Standard_Real): void;
  Scaled(theP: gp_Pnt, theS: Standard_Real): gp_Pnt;
  Transform(theT: gp_Trsf): void;
  Transformed(theT: gp_Trsf): gp_Pnt;
  Translate_1(theV: gp_Vec): void;
  Translated_1(theV: gp_Vec): gp_Pnt;
  Translate_2(theP1: gp_Pnt, theP2: gp_Pnt): void;
  Translated_2(theP1: gp_Pnt, theP2: gp_Pnt): gp_Pnt;
  InitFromJson(theSStream: Standard_SStream, theStreamPos: Standard_Integer): Standard_Boolean;
  delete(): void;
}

  export declare class gp_Pnt_1 extends gp_Pnt {
    constructor();
  }

  export declare class gp_Pnt_2 extends gp_Pnt {
    constructor(theCoord: gp_XYZ);
  }

  export declare class gp_Pnt_3 extends gp_Pnt {
    constructor(theXp: Standard_Real, theYp: Standard_Real, theZp: Standard_Real);
  }

export declare class gp_Elips {
  SetAxis(theA1: gp_Ax1): void;
  SetLocation(theP: gp_Pnt): void;
  SetMajorRadius(theMajorRadius: Standard_Real): void;
  SetMinorRadius(theMinorRadius: Standard_Real): void;
  SetPosition(theA2: gp_Ax2): void;
  Area(): Standard_Real;
  Axis(): gp_Ax1;
  Directrix1(): gp_Ax1;
  Directrix2(): gp_Ax1;
  Eccentricity(): Standard_Real;
  Focal(): Standard_Real;
  Focus1(): gp_Pnt;
  Focus2(): gp_Pnt;
  Location(): gp_Pnt;
  MajorRadius(): Standard_Real;
  MinorRadius(): Standard_Real;
  Parameter(): Standard_Real;
  Position(): gp_Ax2;
  XAxis(): gp_Ax1;
  YAxis(): gp_Ax1;
  Mirror_1(theP: gp_Pnt): void;
  Mirrored_1(theP: gp_Pnt): gp_Elips;
  Mirror_2(theA1: gp_Ax1): void;
  Mirrored_2(theA1: gp_Ax1): gp_Elips;
  Mirror_3(theA2: gp_Ax2): void;
  Mirrored_3(theA2: gp_Ax2): gp_Elips;
  Rotate(theA1: gp_Ax1, theAng: Standard_Real): void;
  Rotated(theA1: gp_Ax1, theAng: Standard_Real): gp_Elips;
  Scale(theP: gp_Pnt, theS: Standard_Real): void;
  Scaled(theP: gp_Pnt, theS: Standard_Real): gp_Elips;
  Transform(theT: gp_Trsf): void;
  Transformed(theT: gp_Trsf): gp_Elips;
  Translate_1(theV: gp_Vec): void;
  Translated_1(theV: gp_Vec): gp_Elips;
  Translate_2(theP1: gp_Pnt, theP2: gp_Pnt): void;
  Translated_2(theP1: gp_Pnt, theP2: gp_Pnt): gp_Elips;
  delete(): void;
}

  export declare class gp_Elips_1 extends gp_Elips {
    constructor();
  }

  export declare class gp_Elips_2 extends gp_Elips {
    constructor(theA2: gp_Ax2, theMajorRadius: Standard_Real, theMinorRadius: Standard_Real);
  }

export declare class gp_Ax3 {
  XReverse(): void;
  YReverse(): void;
  ZReverse(): void;
  SetAxis(theA1: gp_Ax1): void;
  SetDirection(theV: gp_Dir): void;
  SetLocation(theP: gp_Pnt): void;
  SetXDirection(theVx: gp_Dir): void;
  SetYDirection(theVy: gp_Dir): void;
  Angle(theOther: gp_Ax3): Standard_Real;
  Axis(): gp_Ax1;
  Ax2(): gp_Ax2;
  Direction(): gp_Dir;
  Location(): gp_Pnt;
  XDirection(): gp_Dir;
  YDirection(): gp_Dir;
  Direct(): Standard_Boolean;
  IsCoplanar_1(theOther: gp_Ax3, theLinearTolerance: Standard_Real, theAngularTolerance: Standard_Real): Standard_Boolean;
  IsCoplanar_2(theA1: gp_Ax1, theLinearTolerance: Standard_Real, theAngularTolerance: Standard_Real): Standard_Boolean;
  Mirror_1(theP: gp_Pnt): void;
  Mirrored_1(theP: gp_Pnt): gp_Ax3;
  Mirror_2(theA1: gp_Ax1): void;
  Mirrored_2(theA1: gp_Ax1): gp_Ax3;
  Mirror_3(theA2: gp_Ax2): void;
  Mirrored_3(theA2: gp_Ax2): gp_Ax3;
  Rotate(theA1: gp_Ax1, theAng: Standard_Real): void;
  Rotated(theA1: gp_Ax1, theAng: Standard_Real): gp_Ax3;
  Scale(theP: gp_Pnt, theS: Standard_Real): void;
  Scaled(theP: gp_Pnt, theS: Standard_Real): gp_Ax3;
  Transform(theT: gp_Trsf): void;
  Transformed(theT: gp_Trsf): gp_Ax3;
  Translate_1(theV: gp_Vec): void;
  Translated_1(theV: gp_Vec): gp_Ax3;
  Translate_2(theP1: gp_Pnt, theP2: gp_Pnt): void;
  Translated_2(theP1: gp_Pnt, theP2: gp_Pnt): gp_Ax3;
  InitFromJson(theSStream: Standard_SStream, theStreamPos: Standard_Integer): Standard_Boolean;
  delete(): void;
}

  export declare class gp_Ax3_1 extends gp_Ax3 {
    constructor();
  }

  export declare class gp_Ax3_2 extends gp_Ax3 {
    constructor(theA: gp_Ax2);
  }

  export declare class gp_Ax3_3 extends gp_Ax3 {
    constructor(theP: gp_Pnt, theN: gp_Dir, theVx: gp_Dir);
  }

  export declare class gp_Ax3_4 extends gp_Ax3 {
    constructor(theP: gp_Pnt, theN: gp_Dir_D, theVx: gp_Dir_D);
  }

  export declare class gp_Ax3_5 extends gp_Ax3 {
    constructor(theP: gp_Pnt, theV: gp_Dir);
  }

  export declare class gp_Ax3_6 extends gp_Ax3 {
    constructor(theP: gp_Pnt, theV: gp_Dir_D);
  }

  export declare class gp_Ax3_7 extends gp_Ax3 {
    constructor(theV: gp_Dir_D);
  }

export declare class gp_Ax2 {
  SetAxis(A1: gp_Ax1): void;
  SetDirection(V: gp_Dir): void;
  SetLocation(theP: gp_Pnt): void;
  SetXDirection(theVx: gp_Dir): void;
  SetYDirection(theVy: gp_Dir): void;
  Angle(theOther: gp_Ax2): Standard_Real;
  Axis(): gp_Ax1;
  Direction(): gp_Dir;
  Location(): gp_Pnt;
  XDirection(): gp_Dir;
  YDirection(): gp_Dir;
  IsCoplanar_1(Other: gp_Ax2, LinearTolerance: Standard_Real, AngularTolerance: Standard_Real): Standard_Boolean;
  IsCoplanar_2(A1: gp_Ax1, LinearTolerance: Standard_Real, AngularTolerance: Standard_Real): Standard_Boolean;
  Mirror_1(P: gp_Pnt): void;
  Mirrored_1(P: gp_Pnt): gp_Ax2;
  Mirror_2(A1: gp_Ax1): void;
  Mirrored_2(A1: gp_Ax1): gp_Ax2;
  Mirror_3(A2: gp_Ax2): void;
  Mirrored_3(A2: gp_Ax2): gp_Ax2;
  Rotate(theA1: gp_Ax1, theAng: Standard_Real): void;
  Rotated(theA1: gp_Ax1, theAng: Standard_Real): gp_Ax2;
  Scale(theP: gp_Pnt, theS: Standard_Real): void;
  Scaled(theP: gp_Pnt, theS: Standard_Real): gp_Ax2;
  Transform(theT: gp_Trsf): void;
  Transformed(theT: gp_Trsf): gp_Ax2;
  Translate_1(theV: gp_Vec): void;
  Translated_1(theV: gp_Vec): gp_Ax2;
  Translate_2(theP1: gp_Pnt, theP2: gp_Pnt): void;
  Translated_2(theP1: gp_Pnt, theP2: gp_Pnt): gp_Ax2;
  InitFromJson(theSStream: Standard_SStream, theStreamPos: Standard_Integer): Standard_Boolean;
  delete(): void;
}

  export declare class gp_Ax2_1 extends gp_Ax2 {
    constructor();
  }

  export declare class gp_Ax2_2 extends gp_Ax2 {
    constructor(P: gp_Pnt, N: gp_Dir, Vx: gp_Dir);
  }

  export declare class gp_Ax2_3 extends gp_Ax2 {
    constructor(theP: gp_Pnt, theN: gp_Dir_D, theVx: gp_Dir_D);
  }

  export declare class gp_Ax2_4 extends gp_Ax2 {
    constructor(P: gp_Pnt, V: gp_Dir);
  }

  export declare class gp_Ax2_5 extends gp_Ax2 {
    constructor(theP: gp_Pnt, theV: gp_Dir_D);
  }

  export declare class gp_Ax2_6 extends gp_Ax2 {
    constructor(theV: gp_Dir_D);
  }

export declare class gp_Pnt2d {
  SetCoord_1(theIndex: Standard_Integer, theXi: Standard_Real): void;
  SetCoord_2(theXp: Standard_Real, theYp: Standard_Real): void;
  SetX(theX: Standard_Real): void;
  SetY(theY: Standard_Real): void;
  SetXY(theCoord: gp_XY): void;
  Coord_1(theIndex: Standard_Integer): Standard_Real;
  Coord_2(theXp: Standard_Real, theYp: Standard_Real): void;
  X(): Standard_Real;
  Y(): Standard_Real;
  XY(): gp_XY;
  Coord_3(): gp_XY;
  ChangeCoord(): gp_XY;
  IsEqual(theOther: gp_Pnt2d, theLinearTolerance: Standard_Real): Standard_Boolean;
  Distance(theOther: gp_Pnt2d): Standard_Real;
  SquareDistance(theOther: gp_Pnt2d): Standard_Real;
  Mirror_1(theP: gp_Pnt2d): void;
  Mirrored_1(theP: gp_Pnt2d): gp_Pnt2d;
  Mirror_2(theA: gp_Ax2d): void;
  Mirrored_2(theA: gp_Ax2d): gp_Pnt2d;
  Rotate(theP: gp_Pnt2d, theAng: Standard_Real): void;
  Rotated(theP: gp_Pnt2d, theAng: Standard_Real): gp_Pnt2d;
  Scale(theP: gp_Pnt2d, theS: Standard_Real): void;
  Scaled(theP: gp_Pnt2d, theS: Standard_Real): gp_Pnt2d;
  Transform(theT: gp_Trsf2d): void;
  Transformed(theT: gp_Trsf2d): gp_Pnt2d;
  Translate_1(theV: gp_Vec2d): void;
  Translated_1(theV: gp_Vec2d): gp_Pnt2d;
  Translate_2(theP1: gp_Pnt2d, theP2: gp_Pnt2d): void;
  Translated_2(theP1: gp_Pnt2d, theP2: gp_Pnt2d): gp_Pnt2d;
  delete(): void;
}

  export declare class gp_Pnt2d_1 extends gp_Pnt2d {
    constructor();
  }

  export declare class gp_Pnt2d_2 extends gp_Pnt2d {
    constructor(theCoord: gp_XY);
  }

  export declare class gp_Pnt2d_3 extends gp_Pnt2d {
    constructor(theXp: Standard_Real, theYp: Standard_Real);
  }

export declare class gp_XY {
  SetCoord_1(theIndex: Standard_Integer, theXi: Standard_Real): void;
  SetCoord_2(theX: Standard_Real, theY: Standard_Real): void;
  SetX(theX: Standard_Real): void;
  SetY(theY: Standard_Real): void;
  Coord_1(theIndex: Standard_Integer): Standard_Real;
  ChangeCoord(theIndex: Standard_Integer): Standard_Real;
  Coord_2(theX: Standard_Real, theY: Standard_Real): void;
  X(): Standard_Real;
  Y(): Standard_Real;
  Modulus(): Standard_Real;
  SquareModulus(): Standard_Real;
  IsEqual(theOther: gp_XY, theTolerance: Standard_Real): Standard_Boolean;
  Add(theOther: gp_XY): void;
  Added(theOther: gp_XY): gp_XY;
  Crossed(theOther: gp_XY): Standard_Real;
  CrossMagnitude(theRight: gp_XY): Standard_Real;
  CrossSquareMagnitude(theRight: gp_XY): Standard_Real;
  Divide(theScalar: Standard_Real): void;
  Divided(theScalar: Standard_Real): gp_XY;
  Dot(theOther: gp_XY): Standard_Real;
  Multiply_1(theScalar: Standard_Real): void;
  Multiply_2(theOther: gp_XY): void;
  Multiply_3(theMatrix: gp_Mat2d): void;
  Multiplied_1(theScalar: Standard_Real): gp_XY;
  Multiplied_2(theOther: gp_XY): gp_XY;
  Multiplied_3(theMatrix: gp_Mat2d): gp_XY;
  Normalize(): void;
  Normalized(): gp_XY;
  Reverse(): void;
  Reversed(): gp_XY;
  SetLinearForm_1(theA1: Standard_Real, theXY1: gp_XY, theA2: Standard_Real, theXY2: gp_XY): void;
  SetLinearForm_2(theA1: Standard_Real, theXY1: gp_XY, theA2: Standard_Real, theXY2: gp_XY, theXY3: gp_XY): void;
  SetLinearForm_3(theA1: Standard_Real, theXY1: gp_XY, theXY2: gp_XY): void;
  SetLinearForm_4(theXY1: gp_XY, theXY2: gp_XY): void;
  Subtract(theOther: gp_XY): void;
  Subtracted(theOther: gp_XY): gp_XY;
  delete(): void;
}

  export declare class gp_XY_1 extends gp_XY {
    constructor();
  }

  export declare class gp_XY_2 extends gp_XY {
    constructor(theX: Standard_Real, theY: Standard_Real);
  }

export declare class gp_Dir {
  SetCoord_1(theIndex: Standard_Integer, theXi: Standard_Real): void;
  SetCoord_2(theXv: Standard_Real, theYv: Standard_Real, theZv: Standard_Real): void;
  SetX(theX: Standard_Real): void;
  SetY(theY: Standard_Real): void;
  SetZ(theZ: Standard_Real): void;
  SetXYZ(theCoord: gp_XYZ): void;
  Coord_1(theIndex: Standard_Integer): Standard_Real;
  Coord_2(theXv: Standard_Real, theYv: Standard_Real, theZv: Standard_Real): void;
  X(): Standard_Real;
  Y(): Standard_Real;
  Z(): Standard_Real;
  XYZ(): gp_XYZ;
  IsEqual(theOther: gp_Dir, theAngularTolerance: Standard_Real): Standard_Boolean;
  IsNormal(theOther: gp_Dir, theAngularTolerance: Standard_Real): Standard_Boolean;
  IsOpposite(theOther: gp_Dir, theAngularTolerance: Standard_Real): Standard_Boolean;
  IsParallel(theOther: gp_Dir, theAngularTolerance: Standard_Real): Standard_Boolean;
  Angle(theOther: gp_Dir): Standard_Real;
  AngleWithRef(theOther: gp_Dir, theVRef: gp_Dir): Standard_Real;
  Cross(theRight: gp_Dir): void;
  Crossed(theRight: gp_Dir): gp_Dir;
  CrossCross(theV1: gp_Dir, theV2: gp_Dir): void;
  CrossCrossed(theV1: gp_Dir, theV2: gp_Dir): gp_Dir;
  Dot(theOther: gp_Dir): Standard_Real;
  DotCross(theV1: gp_Dir, theV2: gp_Dir): Standard_Real;
  Reverse(): void;
  Reversed(): gp_Dir;
  Mirror_1(theV: gp_Dir): void;
  Mirrored_1(theV: gp_Dir): gp_Dir;
  Mirror_2(theA1: gp_Ax1): void;
  Mirrored_2(theA1: gp_Ax1): gp_Dir;
  Mirror_3(theA2: gp_Ax2): void;
  Mirrored_3(theA2: gp_Ax2): gp_Dir;
  Rotate(theA1: gp_Ax1, theAng: Standard_Real): void;
  Rotated(theA1: gp_Ax1, theAng: Standard_Real): gp_Dir;
  Transform(theT: gp_Trsf): void;
  Transformed(theT: gp_Trsf): gp_Dir;
  InitFromJson(theSStream: Standard_SStream, theStreamPos: Standard_Integer): Standard_Boolean;
  delete(): void;
}

  export declare class gp_Dir_1 extends gp_Dir {
    constructor();
  }

  export declare class gp_Dir_2 extends gp_Dir {
    constructor(theDir: gp_Dir_D);
  }

  export declare class gp_Dir_3 extends gp_Dir {
    constructor(theV: gp_Vec);
  }

  export declare class gp_Dir_4 extends gp_Dir {
    constructor(theCoord: gp_XYZ);
  }

  export declare class gp_Dir_5 extends gp_Dir {
    constructor(theXv: Standard_Real, theYv: Standard_Real, theZv: Standard_Real);
  }

  export declare class gp_Dir_6 extends gp_Dir {
    constructor(a: gp_Dir);
  }

  export declare class gp_Dir_7 extends gp_Dir {
    constructor(a: gp_Dir);
  }

export declare type gp_Dir_D = {
  X: {};
  Y: {};
  Z: {};
  NX: {};
  NY: {};
  NZ: {};
}

export declare class gp_Ax22d {
  SetAxis(theA1: gp_Ax22d): void;
  SetXAxis(theA1: gp_Ax2d): void;
  SetYAxis(theA1: gp_Ax2d): void;
  SetLocation(theP: gp_Pnt2d): void;
  SetXDirection(theVx: gp_Dir2d): void;
  SetYDirection(theVy: gp_Dir2d): void;
  XAxis(): gp_Ax2d;
  YAxis(): gp_Ax2d;
  Location(): gp_Pnt2d;
  XDirection(): gp_Dir2d;
  YDirection(): gp_Dir2d;
  Mirror_1(theP: gp_Pnt2d): void;
  Mirrored_1(theP: gp_Pnt2d): gp_Ax22d;
  Mirror_2(theA: gp_Ax2d): void;
  Mirrored_2(theA: gp_Ax2d): gp_Ax22d;
  Rotate(theP: gp_Pnt2d, theAng: Standard_Real): void;
  Rotated(theP: gp_Pnt2d, theAng: Standard_Real): gp_Ax22d;
  Scale(theP: gp_Pnt2d, theS: Standard_Real): void;
  Scaled(theP: gp_Pnt2d, theS: Standard_Real): gp_Ax22d;
  Transform(theT: gp_Trsf2d): void;
  Transformed(theT: gp_Trsf2d): gp_Ax22d;
  Translate_1(theV: gp_Vec2d): void;
  Translated_1(theV: gp_Vec2d): gp_Ax22d;
  Translate_2(theP1: gp_Pnt2d, theP2: gp_Pnt2d): void;
  Translated_2(theP1: gp_Pnt2d, theP2: gp_Pnt2d): gp_Ax22d;
  delete(): void;
}

  export declare class gp_Ax22d_1 extends gp_Ax22d {
    constructor();
  }

  export declare class gp_Ax22d_2 extends gp_Ax22d {
    constructor(theP: gp_Pnt2d, theVx: gp_Dir2d, theVy: gp_Dir2d);
  }

  export declare class gp_Ax22d_3 extends gp_Ax22d {
    constructor(theP: gp_Pnt2d, theV: gp_Dir2d, theIsSense: Standard_Boolean);
  }

  export declare class gp_Ax22d_4 extends gp_Ax22d {
    constructor(theA: gp_Ax2d, theIsSense: Standard_Boolean);
  }

export declare class gp_XYZ {
  SetCoord_1(theX: Standard_Real, theY: Standard_Real, theZ: Standard_Real): void;
  SetCoord_2(theIndex: Standard_Integer, theXi: Standard_Real): void;
  SetX(theX: Standard_Real): void;
  SetY(theY: Standard_Real): void;
  SetZ(theZ: Standard_Real): void;
  Coord_1(theIndex: Standard_Integer): Standard_Real;
  ChangeCoord(theIndex: Standard_Integer): Standard_Real;
  Coord_2(theX: Standard_Real, theY: Standard_Real, theZ: Standard_Real): void;
  GetData(): Standard_Real;
  ChangeData(): Standard_Real;
  X(): Standard_Real;
  Y(): Standard_Real;
  Z(): Standard_Real;
  Modulus(): Standard_Real;
  SquareModulus(): Standard_Real;
  IsEqual(theOther: gp_XYZ, theTolerance: Standard_Real): Standard_Boolean;
  Add(theOther: gp_XYZ): void;
  Added(theOther: gp_XYZ): gp_XYZ;
  Cross(theOther: gp_XYZ): void;
  Crossed(theOther: gp_XYZ): gp_XYZ;
  CrossMagnitude(theRight: gp_XYZ): Standard_Real;
  CrossSquareMagnitude(theRight: gp_XYZ): Standard_Real;
  CrossCross(theCoord1: gp_XYZ, theCoord2: gp_XYZ): void;
  CrossCrossed(theCoord1: gp_XYZ, theCoord2: gp_XYZ): gp_XYZ;
  Divide(theScalar: Standard_Real): void;
  Divided(theScalar: Standard_Real): gp_XYZ;
  Dot(theOther: gp_XYZ): Standard_Real;
  DotCross(theCoord1: gp_XYZ, theCoord2: gp_XYZ): Standard_Real;
  Multiply_1(theScalar: Standard_Real): void;
  Multiply_2(theOther: gp_XYZ): void;
  Multiply_3(theMatrix: gp_Mat): void;
  Multiplied_1(theScalar: Standard_Real): gp_XYZ;
  Multiplied_2(theOther: gp_XYZ): gp_XYZ;
  Multiplied_3(theMatrix: gp_Mat): gp_XYZ;
  Normalize(): void;
  Normalized(): gp_XYZ;
  Reverse(): void;
  Reversed(): gp_XYZ;
  Subtract(theOther: gp_XYZ): void;
  Subtracted(theOther: gp_XYZ): gp_XYZ;
  SetLinearForm_1(theA1: Standard_Real, theXYZ1: gp_XYZ, theA2: Standard_Real, theXYZ2: gp_XYZ, theA3: Standard_Real, theXYZ3: gp_XYZ, theXYZ4: gp_XYZ): void;
  SetLinearForm_2(theA1: Standard_Real, theXYZ1: gp_XYZ, theA2: Standard_Real, theXYZ2: gp_XYZ, theA3: Standard_Real, theXYZ3: gp_XYZ): void;
  SetLinearForm_3(theA1: Standard_Real, theXYZ1: gp_XYZ, theA2: Standard_Real, theXYZ2: gp_XYZ, theXYZ3: gp_XYZ): void;
  SetLinearForm_4(theA1: Standard_Real, theXYZ1: gp_XYZ, theA2: Standard_Real, theXYZ2: gp_XYZ): void;
  SetLinearForm_5(theA1: Standard_Real, theXYZ1: gp_XYZ, theXYZ2: gp_XYZ): void;
  SetLinearForm_6(theXYZ1: gp_XYZ, theXYZ2: gp_XYZ): void;
  InitFromJson(theSStream: Standard_SStream, theStreamPos: Standard_Integer): Standard_Boolean;
  delete(): void;
}

  export declare class gp_XYZ_1 extends gp_XYZ {
    constructor();
  }

  export declare class gp_XYZ_2 extends gp_XYZ {
    constructor(theX: Standard_Real, theY: Standard_Real, theZ: Standard_Real);
  }

export declare class gp_Cylinder {
  SetAxis(theA1: gp_Ax1): void;
  SetLocation(theLoc: gp_Pnt): void;
  SetPosition(theA3: gp_Ax3): void;
  SetRadius(theR: Standard_Real): void;
  UReverse(): void;
  VReverse(): void;
  Direct(): Standard_Boolean;
  Axis(): gp_Ax1;
  Coefficients(theA1: Standard_Real, theA2: Standard_Real, theA3: Standard_Real, theB1: Standard_Real, theB2: Standard_Real, theB3: Standard_Real, theC1: Standard_Real, theC2: Standard_Real, theC3: Standard_Real, theD: Standard_Real): void;
  Location(): gp_Pnt;
  Position(): gp_Ax3;
  Radius(): Standard_Real;
  XAxis(): gp_Ax1;
  YAxis(): gp_Ax1;
  Mirror_1(theP: gp_Pnt): void;
  Mirrored_1(theP: gp_Pnt): gp_Cylinder;
  Mirror_2(theA1: gp_Ax1): void;
  Mirrored_2(theA1: gp_Ax1): gp_Cylinder;
  Mirror_3(theA2: gp_Ax2): void;
  Mirrored_3(theA2: gp_Ax2): gp_Cylinder;
  Rotate(theA1: gp_Ax1, theAng: Standard_Real): void;
  Rotated(theA1: gp_Ax1, theAng: Standard_Real): gp_Cylinder;
  Scale(theP: gp_Pnt, theS: Standard_Real): void;
  Scaled(theP: gp_Pnt, theS: Standard_Real): gp_Cylinder;
  Transform(theT: gp_Trsf): void;
  Transformed(theT: gp_Trsf): gp_Cylinder;
  Translate_1(theV: gp_Vec): void;
  Translated_1(theV: gp_Vec): gp_Cylinder;
  Translate_2(theP1: gp_Pnt, theP2: gp_Pnt): void;
  Translated_2(theP1: gp_Pnt, theP2: gp_Pnt): gp_Cylinder;
  delete(): void;
}

  export declare class gp_Cylinder_1 extends gp_Cylinder {
    constructor();
  }

  export declare class gp_Cylinder_2 extends gp_Cylinder {
    constructor(theA3: gp_Ax3, theRadius: Standard_Real);
  }

export declare class gp_Dir2d {
  SetCoord_1(theIndex: Standard_Integer, theXi: Standard_Real): void;
  SetCoord_2(theXv: Standard_Real, theYv: Standard_Real): void;
  SetX(theX: Standard_Real): void;
  SetY(theY: Standard_Real): void;
  SetXY(theCoord: gp_XY): void;
  Coord_1(theIndex: Standard_Integer): Standard_Real;
  Coord_2(theXv: Standard_Real, theYv: Standard_Real): void;
  X(): Standard_Real;
  Y(): Standard_Real;
  XY(): gp_XY;
  IsEqual(theOther: gp_Dir2d, theAngularTolerance: Standard_Real): Standard_Boolean;
  IsNormal(theOther: gp_Dir2d, theAngularTolerance: Standard_Real): Standard_Boolean;
  IsOpposite(theOther: gp_Dir2d, theAngularTolerance: Standard_Real): Standard_Boolean;
  IsParallel(theOther: gp_Dir2d, theAngularTolerance: Standard_Real): Standard_Boolean;
  Angle(theOther: gp_Dir2d): Standard_Real;
  Crossed(theRight: gp_Dir2d): Standard_Real;
  Dot(theOther: gp_Dir2d): Standard_Real;
  Reverse(): void;
  Reversed(): gp_Dir2d;
  Mirror_1(theV: gp_Dir2d): void;
  Mirrored_1(theV: gp_Dir2d): gp_Dir2d;
  Mirror_2(theA: gp_Ax2d): void;
  Mirrored_2(theA: gp_Ax2d): gp_Dir2d;
  Rotate(Ang: Standard_Real): void;
  Rotated(theAng: Standard_Real): gp_Dir2d;
  Transform(theT: gp_Trsf2d): void;
  Transformed(theT: gp_Trsf2d): gp_Dir2d;
  delete(): void;
}

  export declare class gp_Dir2d_1 extends gp_Dir2d {
    constructor();
  }

  export declare class gp_Dir2d_2 extends gp_Dir2d {
    constructor(theDir: gp_Dir2d_D);
  }

  export declare class gp_Dir2d_3 extends gp_Dir2d {
    constructor(theV: gp_Vec2d);
  }

  export declare class gp_Dir2d_4 extends gp_Dir2d {
    constructor(theCoord: gp_XY);
  }

  export declare class gp_Dir2d_5 extends gp_Dir2d {
    constructor(theXv: Standard_Real, theYv: Standard_Real);
  }

export declare type gp_Dir2d_D = {
  X: {};
  Y: {};
  NX: {};
  NY: {};
}

export declare class gp_Circ {
  SetAxis(theA1: gp_Ax1): void;
  SetLocation(theP: gp_Pnt): void;
  SetPosition(theA2: gp_Ax2): void;
  SetRadius(theRadius: Standard_Real): void;
  Area(): Standard_Real;
  Axis(): gp_Ax1;
  Length(): Standard_Real;
  Location(): gp_Pnt;
  Position(): gp_Ax2;
  Radius(): Standard_Real;
  XAxis(): gp_Ax1;
  YAxis(): gp_Ax1;
  Distance(theP: gp_Pnt): Standard_Real;
  SquareDistance(theP: gp_Pnt): Standard_Real;
  Contains(theP: gp_Pnt, theLinearTolerance: Standard_Real): Standard_Boolean;
  Mirror_1(theP: gp_Pnt): void;
  Mirrored_1(theP: gp_Pnt): gp_Circ;
  Mirror_2(theA1: gp_Ax1): void;
  Mirrored_2(theA1: gp_Ax1): gp_Circ;
  Mirror_3(theA2: gp_Ax2): void;
  Mirrored_3(theA2: gp_Ax2): gp_Circ;
  Rotate(theA1: gp_Ax1, theAng: Standard_Real): void;
  Rotated(theA1: gp_Ax1, theAng: Standard_Real): gp_Circ;
  Scale(theP: gp_Pnt, theS: Standard_Real): void;
  Scaled(theP: gp_Pnt, theS: Standard_Real): gp_Circ;
  Transform(theT: gp_Trsf): void;
  Transformed(theT: gp_Trsf): gp_Circ;
  Translate_1(theV: gp_Vec): void;
  Translated_1(theV: gp_Vec): gp_Circ;
  Translate_2(theP1: gp_Pnt, theP2: gp_Pnt): void;
  Translated_2(theP1: gp_Pnt, theP2: gp_Pnt): gp_Circ;
  delete(): void;
}

  export declare class gp_Circ_1 extends gp_Circ {
    constructor();
  }

  export declare class gp_Circ_2 extends gp_Circ {
    constructor(theA2: gp_Ax2, theRadius: Standard_Real);
  }

export declare class gp_Ax2d {
  SetLocation(theP: gp_Pnt2d): void;
  SetDirection(theV: gp_Dir2d): void;
  Location(): gp_Pnt2d;
  Direction(): gp_Dir2d;
  IsCoaxial(Other: gp_Ax2d, AngularTolerance: Standard_Real, LinearTolerance: Standard_Real): Standard_Boolean;
  IsNormal(theOther: gp_Ax2d, theAngularTolerance: Standard_Real): Standard_Boolean;
  IsOpposite(theOther: gp_Ax2d, theAngularTolerance: Standard_Real): Standard_Boolean;
  IsParallel(theOther: gp_Ax2d, theAngularTolerance: Standard_Real): Standard_Boolean;
  Angle(theOther: gp_Ax2d): Standard_Real;
  Reverse(): void;
  Reversed(): gp_Ax2d;
  Mirror_1(P: gp_Pnt2d): void;
  Mirrored_1(P: gp_Pnt2d): gp_Ax2d;
  Mirror_2(A: gp_Ax2d): void;
  Mirrored_2(A: gp_Ax2d): gp_Ax2d;
  Rotate(theP: gp_Pnt2d, theAng: Standard_Real): void;
  Rotated(theP: gp_Pnt2d, theAng: Standard_Real): gp_Ax2d;
  Scale(P: gp_Pnt2d, S: Standard_Real): void;
  Scaled(theP: gp_Pnt2d, theS: Standard_Real): gp_Ax2d;
  Transform(theT: gp_Trsf2d): void;
  Transformed(theT: gp_Trsf2d): gp_Ax2d;
  Translate_1(theV: gp_Vec2d): void;
  Translated_1(theV: gp_Vec2d): gp_Ax2d;
  Translate_2(theP1: gp_Pnt2d, theP2: gp_Pnt2d): void;
  Translated_2(theP1: gp_Pnt2d, theP2: gp_Pnt2d): gp_Ax2d;
  delete(): void;
}

  export declare class gp_Ax2d_1 extends gp_Ax2d {
    constructor();
  }

  export declare class gp_Ax2d_2 extends gp_Ax2d {
    constructor(theP: gp_Pnt2d, theV: gp_Dir2d);
  }

  export declare class gp_Ax2d_3 extends gp_Ax2d {
    constructor(theP: gp_Pnt2d, theDir: gp_Dir2d_D);
  }

  export declare class gp_Ax2d_4 extends gp_Ax2d {
    constructor(theDir: gp_Dir2d_D);
  }

export declare class gp_Sphere {
  SetLocation(theLoc: gp_Pnt): void;
  SetPosition(theA3: gp_Ax3): void;
  SetRadius(theR: Standard_Real): void;
  Area(): Standard_Real;
  Coefficients(theA1: Standard_Real, theA2: Standard_Real, theA3: Standard_Real, theB1: Standard_Real, theB2: Standard_Real, theB3: Standard_Real, theC1: Standard_Real, theC2: Standard_Real, theC3: Standard_Real, theD: Standard_Real): void;
  UReverse(): void;
  VReverse(): void;
  Direct(): Standard_Boolean;
  Location(): gp_Pnt;
  Position(): gp_Ax3;
  Radius(): Standard_Real;
  Volume(): Standard_Real;
  XAxis(): gp_Ax1;
  YAxis(): gp_Ax1;
  Mirror_1(theP: gp_Pnt): void;
  Mirrored_1(theP: gp_Pnt): gp_Sphere;
  Mirror_2(theA1: gp_Ax1): void;
  Mirrored_2(theA1: gp_Ax1): gp_Sphere;
  Mirror_3(theA2: gp_Ax2): void;
  Mirrored_3(theA2: gp_Ax2): gp_Sphere;
  Rotate(theA1: gp_Ax1, theAng: Standard_Real): void;
  Rotated(theA1: gp_Ax1, theAng: Standard_Real): gp_Sphere;
  Scale(theP: gp_Pnt, theS: Standard_Real): void;
  Scaled(theP: gp_Pnt, theS: Standard_Real): gp_Sphere;
  Transform(theT: gp_Trsf): void;
  Transformed(theT: gp_Trsf): gp_Sphere;
  Translate_1(theV: gp_Vec): void;
  Translated_1(theV: gp_Vec): gp_Sphere;
  Translate_2(theP1: gp_Pnt, theP2: gp_Pnt): void;
  Translated_2(theP1: gp_Pnt, theP2: gp_Pnt): gp_Sphere;
  delete(): void;
}

  export declare class gp_Sphere_1 extends gp_Sphere {
    constructor();
  }

  export declare class gp_Sphere_2 extends gp_Sphere {
    constructor(theA3: gp_Ax3, theRadius: Standard_Real);
  }

export declare class gp_Vec2d {
  SetCoord_1(theIndex: Standard_Integer, theXi: Standard_Real): void;
  SetCoord_2(theXv: Standard_Real, theYv: Standard_Real): void;
  SetX(theX: Standard_Real): void;
  SetY(theY: Standard_Real): void;
  SetXY(theCoord: gp_XY): void;
  Coord_1(theIndex: Standard_Integer): Standard_Real;
  Coord_2(theXv: Standard_Real, theYv: Standard_Real): void;
  X(): Standard_Real;
  Y(): Standard_Real;
  XY(): gp_XY;
  IsEqual(theOther: gp_Vec2d, theLinearTolerance: Standard_Real, theAngularTolerance: Standard_Real): Standard_Boolean;
  IsNormal(theOther: gp_Vec2d, theAngularTolerance: Standard_Real): Standard_Boolean;
  IsOpposite(theOther: gp_Vec2d, theAngularTolerance: Standard_Real): Standard_Boolean;
  IsParallel(theOther: gp_Vec2d, theAngularTolerance: Standard_Real): Standard_Boolean;
  Angle(theOther: gp_Vec2d): Standard_Real;
  Magnitude(): Standard_Real;
  SquareMagnitude(): Standard_Real;
  Add(theOther: gp_Vec2d): void;
  Added(theOther: gp_Vec2d): gp_Vec2d;
  Crossed(theRight: gp_Vec2d): Standard_Real;
  CrossMagnitude(theRight: gp_Vec2d): Standard_Real;
  CrossSquareMagnitude(theRight: gp_Vec2d): Standard_Real;
  Divide(theScalar: Standard_Real): void;
  Divided(theScalar: Standard_Real): gp_Vec2d;
  Dot(theOther: gp_Vec2d): Standard_Real;
  GetNormal(): gp_Vec2d;
  Multiply(theScalar: Standard_Real): void;
  Multiplied(theScalar: Standard_Real): gp_Vec2d;
  Normalize(): void;
  Normalized(): gp_Vec2d;
  Reverse(): void;
  Reversed(): gp_Vec2d;
  Subtract(theRight: gp_Vec2d): void;
  Subtracted(theRight: gp_Vec2d): gp_Vec2d;
  SetLinearForm_1(theA1: Standard_Real, theV1: gp_Vec2d, theA2: Standard_Real, theV2: gp_Vec2d, theV3: gp_Vec2d): void;
  SetLinearForm_2(theA1: Standard_Real, theV1: gp_Vec2d, theA2: Standard_Real, theV2: gp_Vec2d): void;
  SetLinearForm_3(theA1: Standard_Real, theV1: gp_Vec2d, theV2: gp_Vec2d): void;
  SetLinearForm_4(theV1: gp_Vec2d, theV2: gp_Vec2d): void;
  Mirror_1(theV: gp_Vec2d): void;
  Mirrored_1(theV: gp_Vec2d): gp_Vec2d;
  Mirror_2(theA1: gp_Ax2d): void;
  Mirrored_2(theA1: gp_Ax2d): gp_Vec2d;
  Rotate(theAng: Standard_Real): void;
  Rotated(theAng: Standard_Real): gp_Vec2d;
  Scale(theS: Standard_Real): void;
  Scaled(theS: Standard_Real): gp_Vec2d;
  Transform(theT: gp_Trsf2d): void;
  Transformed(theT: gp_Trsf2d): gp_Vec2d;
  delete(): void;
}

  export declare class gp_Vec2d_1 extends gp_Vec2d {
    constructor();
  }

  export declare class gp_Vec2d_2 extends gp_Vec2d {
    constructor(theV: gp_Dir2d);
  }

  export declare class gp_Vec2d_3 extends gp_Vec2d {
    constructor(theCoord: gp_XY);
  }

  export declare class gp_Vec2d_4 extends gp_Vec2d {
    constructor(theXv: Standard_Real, theYv: Standard_Real);
  }

  export declare class gp_Vec2d_5 extends gp_Vec2d {
    constructor(theP1: gp_Pnt2d, theP2: gp_Pnt2d);
  }

export declare class gp_Trsf2d {
  SetMirror_1(theP: gp_Pnt2d): void;
  SetMirror_2(theA: gp_Ax2d): void;
  SetRotation(theP: gp_Pnt2d, theAng: Standard_Real): void;
  SetScale(theP: gp_Pnt2d, theS: Standard_Real): void;
  SetTransformation_1(theFromSystem1: gp_Ax2d, theToSystem2: gp_Ax2d): void;
  SetTransformation_2(theToSystem: gp_Ax2d): void;
  SetTranslation_1(theV: gp_Vec2d): void;
  SetTranslation_2(theP1: gp_Pnt2d, theP2: gp_Pnt2d): void;
  SetTranslationPart(theV: gp_Vec2d): void;
  SetScaleFactor(theS: Standard_Real): void;
  IsNegative(): Standard_Boolean;
  Form(): gp_TrsfForm;
  ScaleFactor(): Standard_Real;
  TranslationPart(): gp_XY;
  VectorialPart(): gp_Mat2d;
  HVectorialPart(): gp_Mat2d;
  RotationPart(): Standard_Real;
  Value(theRow: Standard_Integer, theCol: Standard_Integer): Standard_Real;
  Invert(): void;
  Inverted(): gp_Trsf2d;
  Multiplied(theT: gp_Trsf2d): gp_Trsf2d;
  Multiply(theT: gp_Trsf2d): void;
  PreMultiply(theT: gp_Trsf2d): void;
  Power(theN: Standard_Integer): void;
  Powered(theN: Standard_Integer): gp_Trsf2d;
  Transforms_1(theX: Standard_Real, theY: Standard_Real): void;
  Transforms_2(theCoord: gp_XY): void;
  SetValues(a11: Standard_Real, a12: Standard_Real, a13: Standard_Real, a21: Standard_Real, a22: Standard_Real, a23: Standard_Real): void;
  delete(): void;
}

  export declare class gp_Trsf2d_1 extends gp_Trsf2d {
    constructor();
  }

  export declare class gp_Trsf2d_2 extends gp_Trsf2d {
    constructor(theT: gp_Trsf);
  }

export declare class gp_GTrsf {
  SetAffinity_1(theA1: gp_Ax1, theRatio: Standard_Real): void;
  SetAffinity_2(theA2: gp_Ax2, theRatio: Standard_Real): void;
  SetValue(theRow: Standard_Integer, theCol: Standard_Integer, theValue: Standard_Real): void;
  SetVectorialPart(theMatrix: gp_Mat): void;
  SetTranslationPart(theCoord: gp_XYZ): void;
  SetTrsf(theT: gp_Trsf): void;
  IsNegative(): Standard_Boolean;
  IsSingular(): Standard_Boolean;
  Form(): gp_TrsfForm;
  SetForm(): void;
  TranslationPart(): gp_XYZ;
  VectorialPart(): gp_Mat;
  Value(theRow: Standard_Integer, theCol: Standard_Integer): Standard_Real;
  Invert(): void;
  Inverted(): gp_GTrsf;
  Multiplied(theT: gp_GTrsf): gp_GTrsf;
  Multiply(theT: gp_GTrsf): void;
  PreMultiply(theT: gp_GTrsf): void;
  Power(theN: Standard_Integer): void;
  Powered(theN: Standard_Integer): gp_GTrsf;
  Transforms_1(theCoord: gp_XYZ): void;
  Transforms_2(theX: Standard_Real, theY: Standard_Real, theZ: Standard_Real): void;
  Trsf(): gp_Trsf;
  delete(): void;
}

  export declare class gp_GTrsf_1 extends gp_GTrsf {
    constructor();
  }

  export declare class gp_GTrsf_2 extends gp_GTrsf {
    constructor(theT: gp_Trsf);
  }

  export declare class gp_GTrsf_3 extends gp_GTrsf {
    constructor(theM: gp_Mat, theV: gp_XYZ);
  }

export declare type GeomAbs_SurfaceType = {
  GeomAbs_Plane: {};
  GeomAbs_Cylinder: {};
  GeomAbs_Cone: {};
  GeomAbs_Sphere: {};
  GeomAbs_Torus: {};
  GeomAbs_BezierSurface: {};
  GeomAbs_BSplineSurface: {};
  GeomAbs_SurfaceOfRevolution: {};
  GeomAbs_SurfaceOfExtrusion: {};
  GeomAbs_OffsetSurface: {};
  GeomAbs_OtherSurface: {};
}

export declare type GeomAbs_JoinType = {
  GeomAbs_Arc: {};
  GeomAbs_Tangent: {};
  GeomAbs_Intersection: {};
}

export declare type GeomAbs_CurveType = {
  GeomAbs_Line: {};
  GeomAbs_Circle: {};
  GeomAbs_Ellipse: {};
  GeomAbs_Hyperbola: {};
  GeomAbs_Parabola: {};
  GeomAbs_BezierCurve: {};
  GeomAbs_BSplineCurve: {};
  GeomAbs_OffsetCurve: {};
  GeomAbs_OtherCurve: {};
}

export declare type GeomAbs_Shape = {
  GeomAbs_C0: {};
  GeomAbs_G1: {};
  GeomAbs_C1: {};
  GeomAbs_G2: {};
  GeomAbs_C2: {};
  GeomAbs_C3: {};
  GeomAbs_CN: {};
}

export declare class Bnd_Box2d {
  constructor()
  SetWhole(): void;
  SetVoid(): void;
  Set_1(thePnt: gp_Pnt2d): void;
  Set_2(thePnt: gp_Pnt2d, theDir: gp_Dir2d): void;
  Update_1(aXmin: Standard_Real, aYmin: Standard_Real, aXmax: Standard_Real, aYmax: Standard_Real): void;
  Update_2(X: Standard_Real, Y: Standard_Real): void;
  SetGap(Tol: Standard_Real): void;
  Enlarge(theTol: Standard_Real): void;
  GetXMin(): Standard_Real;
  GetXMax(): Standard_Real;
  GetYMin(): Standard_Real;
  GetYMax(): Standard_Real;
  Center(): any;
  OpenXmin(): void;
  OpenXmax(): void;
  OpenYmin(): void;
  OpenYmax(): void;
  IsOpenXmin(): Standard_Boolean;
  IsOpenXmax(): Standard_Boolean;
  IsOpenYmin(): Standard_Boolean;
  IsOpenYmax(): Standard_Boolean;
  IsWhole(): Standard_Boolean;
  IsVoid(): Standard_Boolean;
  Transformed(T: gp_Trsf2d): Bnd_Box2d;
  Add_1(Other: Bnd_Box2d): void;
  Add_2(thePnt: gp_Pnt2d): void;
  Add_3(thePnt: gp_Pnt2d, theDir: gp_Dir2d): void;
  Add_4(D: gp_Dir2d): void;
  IsOut_1(P: gp_Pnt2d): Standard_Boolean;
  IsOut_2(theL: gp_Lin2d): Standard_Boolean;
  IsOut_3(theP0: gp_Pnt2d, theP1: gp_Pnt2d): Standard_Boolean;
  IsOut_4(Other: Bnd_Box2d): Standard_Boolean;
  Contains(theP: gp_Pnt2d): Standard_Boolean;
  Intersects(theOther: Bnd_Box2d): Standard_Boolean;
  Distance(theOther: Bnd_Box2d): Standard_Real;
  IsOut_5(theOther: Bnd_Box2d, theTrsf: gp_Trsf2d): Standard_Boolean;
  IsOut_6(T1: gp_Trsf2d, Other: Bnd_Box2d, T2: gp_Trsf2d): Standard_Boolean;
  Dump(): void;
  SquareExtent(): Standard_Real;
  delete(): void;
}

export declare class Bnd_Box {
  SetWhole(): void;
  SetVoid(): void;
  Set_1(P: gp_Pnt): void;
  Set_2(P: gp_Pnt, D: gp_Dir): void;
  Update_1(aXmin: Standard_Real, aYmin: Standard_Real, aZmin: Standard_Real, aXmax: Standard_Real, aYmax: Standard_Real, aZmax: Standard_Real): void;
  Update_2(X: Standard_Real, Y: Standard_Real, Z: Standard_Real): void;
  SetGap(Tol: Standard_Real): void;
  Enlarge(Tol: Standard_Real): void;
  GetXMin(): Standard_Real;
  GetXMax(): Standard_Real;
  GetYMin(): Standard_Real;
  GetYMax(): Standard_Real;
  GetZMin(): Standard_Real;
  GetZMax(): Standard_Real;
  CornerMin(): gp_Pnt;
  CornerMax(): gp_Pnt;
  Center(): any;
  OpenXmin(): void;
  OpenXmax(): void;
  OpenYmin(): void;
  OpenYmax(): void;
  OpenZmin(): void;
  OpenZmax(): void;
  IsOpen(): Standard_Boolean;
  IsOpenXmin(): Standard_Boolean;
  IsOpenXmax(): Standard_Boolean;
  IsOpenYmin(): Standard_Boolean;
  IsOpenYmax(): Standard_Boolean;
  IsOpenZmin(): Standard_Boolean;
  IsOpenZmax(): Standard_Boolean;
  IsWhole(): Standard_Boolean;
  IsVoid(): Standard_Boolean;
  IsXThin(tol: Standard_Real): Standard_Boolean;
  IsYThin(tol: Standard_Real): Standard_Boolean;
  IsZThin(tol: Standard_Real): Standard_Boolean;
  IsThin(tol: Standard_Real): Standard_Boolean;
  Transformed(T: gp_Trsf): Bnd_Box;
  Add_1(Other: Bnd_Box): void;
  Add_2(P: gp_Pnt): void;
  Add_3(P: gp_Pnt, D: gp_Dir): void;
  Add_4(D: gp_Dir): void;
  IsOut_1(P: gp_Pnt): Standard_Boolean;
  IsOut_2(L: gp_Lin): Standard_Boolean;
  IsOut_3(P: gp_Pln): Standard_Boolean;
  IsOut_4(Other: Bnd_Box): Standard_Boolean;
  IsOut_5(Other: Bnd_Box, T: gp_Trsf): Standard_Boolean;
  IsOut_6(T1: gp_Trsf, Other: Bnd_Box, T2: gp_Trsf): Standard_Boolean;
  IsOut_7(P1: gp_Pnt, P2: gp_Pnt, D: gp_Dir): Standard_Boolean;
  Contains(theP: gp_Pnt): Standard_Boolean;
  Intersects(theOther: Bnd_Box): Standard_Boolean;
  Distance(Other: Bnd_Box): Standard_Real;
  Dump(): void;
  SquareExtent(): Standard_Real;
  FinitePart(): Bnd_Box;
  HasFinitePart(): Standard_Boolean;
  InitFromJson(theSStream: Standard_SStream, theStreamPos: Standard_Integer): Standard_Boolean;
  delete(): void;
}

  export declare class Bnd_Box_1 extends Bnd_Box {
    constructor();
  }

  export declare class Bnd_Box_2 extends Bnd_Box {
    constructor(theMin: gp_Pnt, theMax: gp_Pnt);
  }

export declare type Convert_ParameterisationType = {
  Convert_TgtThetaOver2: {};
  Convert_TgtThetaOver2_1: {};
  Convert_TgtThetaOver2_2: {};
  Convert_TgtThetaOver2_3: {};
  Convert_TgtThetaOver2_4: {};
  Convert_QuasiAngular: {};
  Convert_RationalC1: {};
  Convert_Polynomial: {};
}

export declare class Poly_PolygonOnTriangulation extends Standard_Transient {
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): any;
  DynamicType(): any;
  Copy(): any;
  Deflection_1(): Standard_Real;
  Deflection_2(theDefl: Standard_Real): void;
  NbNodes(): Standard_Integer;
  Node(theIndex: Standard_Integer): Standard_Integer;
  SetNode(theIndex: Standard_Integer, theNode: Standard_Integer): void;
  HasParameters(): Standard_Boolean;
  Parameter(theIndex: Standard_Integer): Standard_Real;
  SetParameter(theIndex: Standard_Integer, theValue: Standard_Real): void;
  SetParameters(theParameters: any): void;
  Nodes(): TColStd_Array1OfInteger;
  Parameters(): any;
  ChangeNodes(): TColStd_Array1OfInteger;
  ChangeParameters(): TColStd_Array1OfReal;
  delete(): void;
}

  export declare class Poly_PolygonOnTriangulation_1 extends Poly_PolygonOnTriangulation {
    constructor(theNbNodes: Standard_Integer, theHasParams: Standard_Boolean);
  }

  export declare class Poly_PolygonOnTriangulation_2 extends Poly_PolygonOnTriangulation {
    constructor(Nodes: TColStd_Array1OfInteger);
  }

  export declare class Poly_PolygonOnTriangulation_3 extends Poly_PolygonOnTriangulation {
    constructor(Nodes: TColStd_Array1OfInteger, Parameters: TColStd_Array1OfReal);
  }

export declare class Poly_Triangulation extends Standard_Transient {
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): any;
  DynamicType(): any;
  Copy(): any;
  Deflection_1(): Standard_Real;
  Deflection_2(theDeflection: Standard_Real): void;
  Parameters_1(): any;
  Parameters_2(theParams: any): void;
  Clear(): void;
  HasGeometry(): Standard_Boolean;
  NbNodes(): Standard_Integer;
  NbTriangles(): Standard_Integer;
  HasUVNodes(): Standard_Boolean;
  HasNormals(): Standard_Boolean;
  Node(theIndex: Standard_Integer): gp_Pnt;
  SetNode(theIndex: Standard_Integer, thePnt: gp_Pnt): void;
  UVNode(theIndex: Standard_Integer): gp_Pnt2d;
  SetUVNode(theIndex: Standard_Integer, thePnt: gp_Pnt2d): void;
  Triangle(theIndex: Standard_Integer): Poly_Triangle;
  SetTriangle(theIndex: Standard_Integer, theTriangle: Poly_Triangle): void;
  Normal_1(theIndex: Standard_Integer): gp_Dir;
  Normal_2(theIndex: Standard_Integer, theVec3: NCollection_Vec3<float>): void;
  SetNormal_1(theIndex: Standard_Integer, theNormal: NCollection_Vec3<float>): void;
  SetNormal_2(theIndex: Standard_Integer, theNormal: gp_Dir): void;
  MeshPurpose(): Poly_MeshPurpose;
  SetMeshPurpose(thePurpose: Poly_MeshPurpose): void;
  CachedMinMax(): Bnd_Box;
  SetCachedMinMax(theBox: Bnd_Box): void;
  HasCachedMinMax(): Standard_Boolean;
  UpdateCachedMinMax(): void;
  MinMax(theBox: Bnd_Box, theTrsf: gp_Trsf, theIsAccurate: Standard_Boolean): Standard_Boolean;
  IsDoublePrecision(): Standard_Boolean;
  SetDoublePrecision(theIsDouble: Standard_Boolean): void;
  ResizeNodes(theNbNodes: Standard_Integer, theToCopyOld: Standard_Boolean): void;
  ResizeTriangles(theNbTriangles: Standard_Integer, theToCopyOld: Standard_Boolean): void;
  AddUVNodes(): void;
  RemoveUVNodes(): void;
  AddNormals(): void;
  RemoveNormals(): void;
  ComputeNormals(): void;
  MapNodeArray(): any;
  MapTriangleArray(): any;
  MapUVNodeArray(): any;
  MapNormalArray(): any;
  InternalTriangles(): Poly_Array1OfTriangle;
  InternalNodes(): Poly_ArrayOfNodes;
  InternalUVNodes(): Poly_ArrayOfUVNodes;
  InternalNormals(): any;
  SetNormals(theNormals: any): void;
  Triangles(): Poly_Array1OfTriangle;
  ChangeTriangles(): Poly_Array1OfTriangle;
  ChangeTriangle(theIndex: Standard_Integer): Poly_Triangle;
  NbDeferredNodes(): Standard_Integer;
  NbDeferredTriangles(): Standard_Integer;
  HasDeferredData(): Standard_Boolean;
  LoadDeferredData(theFileSystem: any): Standard_Boolean;
  DetachedLoadDeferredData(theFileSystem: any): any;
  UnloadDeferredData(): Standard_Boolean;
  delete(): void;
}

  export declare class Poly_Triangulation_1 extends Poly_Triangulation {
    constructor();
  }

  export declare class Poly_Triangulation_2 extends Poly_Triangulation {
    constructor(theNbNodes: Standard_Integer, theNbTriangles: Standard_Integer, theHasUVNodes: Standard_Boolean, theHasNormals: Standard_Boolean);
  }

  export declare class Poly_Triangulation_3 extends Poly_Triangulation {
    constructor(Nodes: TColgp_Array1OfPnt, Triangles: Poly_Array1OfTriangle);
  }

  export declare class Poly_Triangulation_4 extends Poly_Triangulation {
    constructor(Nodes: TColgp_Array1OfPnt, UVNodes: TColgp_Array1OfPnt2d, Triangles: Poly_Array1OfTriangle);
  }

  export declare class Poly_Triangulation_5 extends Poly_Triangulation {
    constructor(theTriangulation: any);
  }

export declare class Poly_Triangle {
  Set_1(theN1: Standard_Integer, theN2: Standard_Integer, theN3: Standard_Integer): void;
  Set_2(theIndex: Standard_Integer, theNode: Standard_Integer): void;
  Get(theN1: Standard_Integer, theN2: Standard_Integer, theN3: Standard_Integer): void;
  Value(theIndex: Standard_Integer): Standard_Integer;
  ChangeValue(theIndex: Standard_Integer): Standard_Integer;
  delete(): void;
}

  export declare class Poly_Triangle_1 extends Poly_Triangle {
    constructor();
  }

  export declare class Poly_Triangle_2 extends Poly_Triangle {
    constructor(theN1: Standard_Integer, theN2: Standard_Integer, theN3: Standard_Integer);
  }

export declare class TDF_Attribute extends Standard_Transient {
  ID(): Standard_GUID;
  SetID_1(a0: Standard_GUID): void;
  SetID_2(): void;
  Label(): TDF_Label;
  Transaction(): Standard_Integer;
  UntilTransaction(): Standard_Integer;
  IsValid(): Standard_Boolean;
  IsNew(): Standard_Boolean;
  IsForgotten(): Standard_Boolean;
  IsAttribute(anID: Standard_GUID): Standard_Boolean;
  FindAttribute_1(anID: Standard_GUID, anAttribute: any): Standard_Boolean;
  AddAttribute(other: any): void;
  ForgetAttribute(aguid: Standard_GUID): Standard_Boolean;
  ForgetAllAttributes(clearChildren: Standard_Boolean): void;
  AfterAddition(): void;
  BeforeRemoval(): void;
  BeforeForget(): void;
  AfterResume(): void;
  AfterRetrieval(forceIt: Standard_Boolean): Standard_Boolean;
  BeforeUndo(anAttDelta: any, forceIt: Standard_Boolean): Standard_Boolean;
  AfterUndo(anAttDelta: any, forceIt: Standard_Boolean): Standard_Boolean;
  BeforeCommitTransaction(): void;
  Backup_1(): void;
  IsBackuped(): Standard_Boolean;
  BackupCopy(): any;
  Restore(anAttribute: any): void;
  DeltaOnAddition(): any;
  DeltaOnForget(): any;
  DeltaOnResume(): any;
  DeltaOnModification_1(anOldAttribute: any): any;
  DeltaOnModification_2(aDelta: any): void;
  DeltaOnRemoval(): any;
  NewEmpty(): any;
  Paste(intoAttribute: any, aRelocationTable: any): void;
  References(aDataSet: any): void;
  Forget(aTransaction: Standard_Integer): void;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): any;
  DynamicType(): any;
  delete(): void;
}

export declare class TDF_Label {
  constructor()
  Nullify(): void;
  Data(): any;
  Tag(): Standard_Integer;
  Father(): TDF_Label;
  IsNull(): Standard_Boolean;
  Imported(aStatus: Standard_Boolean): void;
  IsImported(): Standard_Boolean;
  IsEqual(aLabel: TDF_Label): Standard_Boolean;
  IsDifferent(aLabel: TDF_Label): Standard_Boolean;
  IsRoot(): Standard_Boolean;
  IsAttribute(anID: Standard_GUID): Standard_Boolean;
  AddAttribute(anAttribute: any, append: Standard_Boolean): void;
  ForgetAttribute_1(anAttribute: any): void;
  ForgetAttribute_2(aguid: Standard_GUID): Standard_Boolean;
  ForgetAllAttributes(clearChildren: Standard_Boolean): void;
  ResumeAttribute(anAttribute: any): void;
  FindAttribute_1(anID: Standard_GUID, anAttribute: any): Standard_Boolean;
  FindAttribute_3(anID: Standard_GUID, aTransaction: Standard_Integer, anAttribute: any): Standard_Boolean;
  MayBeModified(): Standard_Boolean;
  AttributesModified(): Standard_Boolean;
  HasAttribute(): Standard_Boolean;
  NbAttributes(): Standard_Integer;
  Depth(): Standard_Integer;
  IsDescendant(aLabel: TDF_Label): Standard_Boolean;
  Root(): TDF_Label;
  HasChild(): Standard_Boolean;
  NbChildren(): Standard_Integer;
  FindChild(aTag: Standard_Integer, create: Standard_Boolean): TDF_Label;
  NewChild(): TDF_Label;
  Transaction(): Standard_Integer;
  HasLowerNode(otherLabel: TDF_Label): Standard_Boolean;
  HasGreaterNode(otherLabel: TDF_Label): Standard_Boolean;
  delete(): void;
}

export declare class TDataStd_Name extends TDataStd_GenericExtString {
  constructor()
  static GetID(): Standard_GUID;
  static Set_1(label: TDF_Label, string: TCollection_ExtendedString): any;
  static Set_2(label: TDF_Label, guid: Standard_GUID, string: TCollection_ExtendedString): any;
  Set_3(S: TCollection_ExtendedString): void;
  SetID_1(guid: Standard_GUID): void;
  SetID_2(): void;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): any;
  DynamicType(): any;
  NewEmpty(): any;
  delete(): void;
}

export declare class TDataStd_GenericEmpty extends TDF_Attribute {
  Restore(a0: any): void;
  Paste(a0: any, a1: any): void;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): any;
  DynamicType(): any;
  delete(): void;
}

export declare class TDataStd_GenericExtString extends TDF_Attribute {
  Set(S: TCollection_ExtendedString): void;
  SetID(guid: Standard_GUID): void;
  Get(): TCollection_ExtendedString;
  ID(): Standard_GUID;
  Restore(with_: any): void;
  Paste(into: any, RT: any): void;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): any;
  DynamicType(): any;
  delete(): void;
}

export declare class TDocStd_Document extends CDM_Document {
  constructor(astorageformat: TCollection_ExtendedString)
  static Get(L: TDF_Label): any;
  IsSaved(): Standard_Boolean;
  IsChanged(): Standard_Boolean;
  SetSaved(): void;
  SetSavedTime(theTime: Standard_Integer): void;
  GetSavedTime(): Standard_Integer;
  GetName(): TCollection_ExtendedString;
  GetPath(): TCollection_ExtendedString;
  SetData(data: any): void;
  GetData(): any;
  Main(): TDF_Label;
  IsEmpty(): Standard_Boolean;
  IsValid(): Standard_Boolean;
  SetModified(L: TDF_Label): void;
  PurgeModified(): void;
  GetModified(): any;
  NewCommand(): void;
  HasOpenCommand(): Standard_Boolean;
  OpenCommand(): void;
  CommitCommand(): Standard_Boolean;
  AbortCommand(): void;
  GetUndoLimit(): Standard_Integer;
  SetUndoLimit(L: Standard_Integer): void;
  ClearUndos(): void;
  ClearRedos(): void;
  GetAvailableUndos(): Standard_Integer;
  Undo(): Standard_Boolean;
  GetAvailableRedos(): Standard_Integer;
  Redo(): Standard_Boolean;
  GetUndos(): any;
  GetRedos(): any;
  RemoveFirstUndo(): void;
  InitDeltaCompaction(): Standard_Boolean;
  PerformDeltaCompaction(): Standard_Boolean;
  UpdateReferences(aDocEntry: XCAFDoc_PartId): void;
  Recompute(): void;
  StorageFormat(): TCollection_ExtendedString;
  SetEmptyLabelsSavingMode(isAllowed: Standard_Boolean): void;
  EmptyLabelsSavingMode(): Standard_Boolean;
  ChangeStorageFormat(newStorageFormat: TCollection_ExtendedString): void;
  SetNestedTransactionMode(isAllowed: Standard_Boolean): void;
  IsNestedTransactionMode(): Standard_Boolean;
  SetModificationMode(theTransactionOnly: Standard_Boolean): void;
  ModificationMode(): Standard_Boolean;
  BeforeClose(): void;
  StorageFormatVersion(): TDocStd_FormatVersion;
  ChangeStorageFormatVersion(theVersion: TDocStd_FormatVersion): void;
  static CurrentStorageFormatVersion(): TDocStd_FormatVersion;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): any;
  DynamicType(): any;
  delete(): void;
}

export declare class CDM_Document extends Standard_Transient {
  Update_2(ErrorString: TCollection_ExtendedString): Standard_Boolean;
  StorageFormat(): TCollection_ExtendedString;
  Extensions(Extensions: TColStd_SequenceOfExtendedString): void;
  GetAlternativeDocument(aFormat: TCollection_ExtendedString, anAlternativeDocument: any): Standard_Boolean;
  CreateReference_1(anOtherDocument: any): Standard_Integer;
  RemoveReference(aReferenceIdentifier: Standard_Integer): void;
  RemoveAllReferences(): void;
  Document(aReferenceIdentifier: Standard_Integer): any;
  IsInSession(aReferenceIdentifier: Standard_Integer): Standard_Boolean;
  IsStored_1(aReferenceIdentifier: Standard_Integer): Standard_Boolean;
  Name(aReferenceIdentifier: Standard_Integer): TCollection_ExtendedString;
  ToReferencesNumber(): Standard_Integer;
  FromReferencesNumber(): Standard_Integer;
  ShallowReferences(aDocument: any): Standard_Boolean;
  DeepReferences(aDocument: any): Standard_Boolean;
  CopyReference(aFromDocument: any, aReferenceIdentifier: Standard_Integer): Standard_Integer;
  IsReadOnly_1(): Standard_Boolean;
  IsReadOnly_2(aReferenceIdentifier: Standard_Integer): Standard_Boolean;
  SetIsReadOnly(): void;
  UnsetIsReadOnly(): void;
  Modify(): void;
  Modifications(): Standard_Integer;
  UnModify(): void;
  IsUpToDate(aReferenceIdentifier: Standard_Integer): Standard_Boolean;
  SetIsUpToDate(aReferenceIdentifier: Standard_Integer): void;
  SetComment(aComment: TCollection_ExtendedString): void;
  AddComment(aComment: TCollection_ExtendedString): void;
  SetComments(aComments: TColStd_SequenceOfExtendedString): void;
  Comments(aComments: TColStd_SequenceOfExtendedString): void;
  Comment(): Standard_ExtCharacter;
  IsStored_2(): Standard_Boolean;
  StorageVersion(): Standard_Integer;
  SetMetaData(aMetaData: any): void;
  UnsetIsStored(): void;
  MetaData(): any;
  Folder(): TCollection_ExtendedString;
  SetRequestedFolder(aFolder: TCollection_ExtendedString): void;
  RequestedFolder(): TCollection_ExtendedString;
  HasRequestedFolder(): Standard_Boolean;
  SetRequestedName(aName: TCollection_ExtendedString): void;
  RequestedName(): TCollection_ExtendedString;
  SetRequestedPreviousVersion(aPreviousVersion: TCollection_ExtendedString): void;
  UnsetRequestedPreviousVersion(): void;
  HasRequestedPreviousVersion(): Standard_Boolean;
  RequestedPreviousVersion(): TCollection_ExtendedString;
  SetRequestedComment(aComment: TCollection_ExtendedString): void;
  RequestedComment(): TCollection_ExtendedString;
  LoadResources(): void;
  FindFileExtension(): Standard_Boolean;
  FileExtension(): TCollection_ExtendedString;
  FindDescription(): Standard_Boolean;
  Description(): TCollection_ExtendedString;
  IsModified(): Standard_Boolean;
  IsOpened_1(): Standard_Boolean;
  Open(anApplication: any): void;
  CanClose(): CDM_CanCloseStatus;
  Close(): void;
  Application(): any;
  CanCloseReference(aDocument: any, aReferenceIdentifier: Standard_Integer): Standard_Boolean;
  CloseReference(aDocument: any, aReferenceIdentifier: Standard_Integer): void;
  IsOpened_2(aReferenceIdentifier: Standard_Integer): Standard_Boolean;
  CreateReference_2(aMetaData: any, aReferenceIdentifier: Standard_Integer, anApplication: any, aToDocumentVersion: Standard_Integer, UseStorageConfiguration: Standard_Boolean): void;
  CreateReference_3(aMetaData: any, anApplication: any, aDocumentVersion: Standard_Integer, UseStorageConfiguration: Standard_Boolean): Standard_Integer;
  ReferenceCounter(): Standard_Integer;
  Update_3(): void;
  Reference(aReferenceIdentifier: Standard_Integer): any;
  SetModifications(Modifications: Standard_Integer): void;
  SetReferenceCounter(aReferenceCounter: Standard_Integer): void;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): any;
  DynamicType(): any;
  delete(): void;
}

export declare class GeomToolsWrapper {
  constructor();
  static Write(geometry: any): string;
  static Read(data: string): any;
  delete(): void;
}

export declare class Handle_XSControl_WorkSession {
  Nullify(): void;
  IsNull(): boolean;
  reset(thePtr: XSControl_WorkSession): void;
  get(): XSControl_WorkSession;
  delete(): void;
}

  export declare class Handle_XSControl_WorkSession_1 extends Handle_XSControl_WorkSession {
    constructor();
  }

  export declare class Handle_XSControl_WorkSession_2 extends Handle_XSControl_WorkSession {
    constructor(thePtr: XSControl_WorkSession);
  }

  export declare class Handle_XSControl_WorkSession_3 extends Handle_XSControl_WorkSession {
    constructor(theHandle: Handle_XSControl_WorkSession);
  }

  export declare class Handle_XSControl_WorkSession_4 extends Handle_XSControl_WorkSession {
    constructor(theHandle: Handle_XSControl_WorkSession);
  }

export declare class Handle_XCAFDoc_ColorTool {
  Nullify(): void;
  IsNull(): boolean;
  reset(thePtr: XCAFDoc_ColorTool): void;
  get(): XCAFDoc_ColorTool;
  delete(): void;
}

  export declare class Handle_XCAFDoc_ColorTool_1 extends Handle_XCAFDoc_ColorTool {
    constructor();
  }

  export declare class Handle_XCAFDoc_ColorTool_2 extends Handle_XCAFDoc_ColorTool {
    constructor(thePtr: XCAFDoc_ColorTool);
  }

  export declare class Handle_XCAFDoc_ColorTool_3 extends Handle_XCAFDoc_ColorTool {
    constructor(theHandle: Handle_XCAFDoc_ColorTool);
  }

  export declare class Handle_XCAFDoc_ColorTool_4 extends Handle_XCAFDoc_ColorTool {
    constructor(theHandle: Handle_XCAFDoc_ColorTool);
  }

export declare class Handle_TDataStd_Name {
  Nullify(): void;
  IsNull(): boolean;
  reset(thePtr: TDataStd_Name): void;
  get(): TDataStd_Name;
  delete(): void;
}

  export declare class Handle_TDataStd_Name_1 extends Handle_TDataStd_Name {
    constructor();
  }

  export declare class Handle_TDataStd_Name_2 extends Handle_TDataStd_Name {
    constructor(thePtr: TDataStd_Name);
  }

  export declare class Handle_TDataStd_Name_3 extends Handle_TDataStd_Name {
    constructor(theHandle: Handle_TDataStd_Name);
  }

  export declare class Handle_TDataStd_Name_4 extends Handle_TDataStd_Name {
    constructor(theHandle: Handle_TDataStd_Name);
  }

export declare class Handle_Poly_PolygonOnTriangulation {
  Nullify(): void;
  IsNull(): boolean;
  reset(thePtr: Poly_PolygonOnTriangulation): void;
  get(): Poly_PolygonOnTriangulation;
  delete(): void;
}

  export declare class Handle_Poly_PolygonOnTriangulation_1 extends Handle_Poly_PolygonOnTriangulation {
    constructor();
  }

  export declare class Handle_Poly_PolygonOnTriangulation_2 extends Handle_Poly_PolygonOnTriangulation {
    constructor(thePtr: Poly_PolygonOnTriangulation);
  }

  export declare class Handle_Poly_PolygonOnTriangulation_3 extends Handle_Poly_PolygonOnTriangulation {
    constructor(theHandle: Handle_Poly_PolygonOnTriangulation);
  }

  export declare class Handle_Poly_PolygonOnTriangulation_4 extends Handle_Poly_PolygonOnTriangulation {
    constructor(theHandle: Handle_Poly_PolygonOnTriangulation);
  }

export declare class Handle_Geom2d_Curve {
  Nullify(): void;
  IsNull(): boolean;
  reset(thePtr: Geom2d_Curve): void;
  get(): Geom2d_Curve;
  delete(): void;
}

  export declare class Handle_Geom2d_Curve_1 extends Handle_Geom2d_Curve {
    constructor();
  }

  export declare class Handle_Geom2d_Curve_2 extends Handle_Geom2d_Curve {
    constructor(thePtr: Geom2d_Curve);
  }

  export declare class Handle_Geom2d_Curve_3 extends Handle_Geom2d_Curve {
    constructor(theHandle: Handle_Geom2d_Curve);
  }

  export declare class Handle_Geom2d_Curve_4 extends Handle_Geom2d_Curve {
    constructor(theHandle: Handle_Geom2d_Curve);
  }

export declare class Handle_Geom2d_Geometry {
  Nullify(): void;
  IsNull(): boolean;
  reset(thePtr: Geom2d_Geometry): void;
  get(): Geom2d_Geometry;
  delete(): void;
}

  export declare class Handle_Geom2d_Geometry_1 extends Handle_Geom2d_Geometry {
    constructor();
  }

  export declare class Handle_Geom2d_Geometry_2 extends Handle_Geom2d_Geometry {
    constructor(thePtr: Geom2d_Geometry);
  }

  export declare class Handle_Geom2d_Geometry_3 extends Handle_Geom2d_Geometry {
    constructor(theHandle: Handle_Geom2d_Geometry);
  }

  export declare class Handle_Geom2d_Geometry_4 extends Handle_Geom2d_Geometry {
    constructor(theHandle: Handle_Geom2d_Geometry);
  }

export declare class BRepMesh_IncrementalMeshWrapper {
  constructor(theShape: TopoDS_Shape, theLinDeflection: Standard_Real, isRelative: Standard_Boolean, theAngDeflection: Standard_Real, isInParallel: Standard_Boolean)
  delete(): void;
}

export declare class Handle_Geom_Curve {
  Nullify(): void;
  IsNull(): boolean;
  reset(thePtr: Geom_Curve): void;
  get(): Geom_Curve;
  delete(): void;
}

  export declare class Handle_Geom_Curve_1 extends Handle_Geom_Curve {
    constructor();
  }

  export declare class Handle_Geom_Curve_2 extends Handle_Geom_Curve {
    constructor(thePtr: Geom_Curve);
  }

  export declare class Handle_Geom_Curve_3 extends Handle_Geom_Curve {
    constructor(theHandle: Handle_Geom_Curve);
  }

  export declare class Handle_Geom_Curve_4 extends Handle_Geom_Curve {
    constructor(theHandle: Handle_Geom_Curve);
  }

export declare class TopoDS_Cast {
  constructor();
  static Vertex(S: TopoDS_Shape): TopoDS_Vertex;
  static Edge(S: TopoDS_Shape): TopoDS_Edge;
  static Wire(S: TopoDS_Shape): TopoDS_Wire;
  static Face(S: TopoDS_Shape): TopoDS_Face;
  static Shell(S: TopoDS_Shape): TopoDS_Shell;
  static Solid(S: TopoDS_Shape): TopoDS_Solid;
  static Compound(S: TopoDS_Shape): TopoDS_Compound;
  static CompSolid(S: TopoDS_Shape): TopoDS_CompSolid;
  delete(): void;
}

export declare class Handle_Geom2d_BezierCurve {
  Nullify(): void;
  IsNull(): boolean;
  reset(thePtr: Geom2d_BezierCurve): void;
  get(): Geom2d_BezierCurve;
  delete(): void;
}

  export declare class Handle_Geom2d_BezierCurve_1 extends Handle_Geom2d_BezierCurve {
    constructor();
  }

  export declare class Handle_Geom2d_BezierCurve_2 extends Handle_Geom2d_BezierCurve {
    constructor(thePtr: Geom2d_BezierCurve);
  }

  export declare class Handle_Geom2d_BezierCurve_3 extends Handle_Geom2d_BezierCurve {
    constructor(theHandle: Handle_Geom2d_BezierCurve);
  }

  export declare class Handle_Geom2d_BezierCurve_4 extends Handle_Geom2d_BezierCurve {
    constructor(theHandle: Handle_Geom2d_BezierCurve);
  }

export declare class Handle_Poly_Triangulation {
  Nullify(): void;
  IsNull(): boolean;
  reset(thePtr: Poly_Triangulation): void;
  get(): Poly_Triangulation;
  delete(): void;
}

  export declare class Handle_Poly_Triangulation_1 extends Handle_Poly_Triangulation {
    constructor();
  }

  export declare class Handle_Poly_Triangulation_2 extends Handle_Poly_Triangulation {
    constructor(thePtr: Poly_Triangulation);
  }

  export declare class Handle_Poly_Triangulation_3 extends Handle_Poly_Triangulation {
    constructor(theHandle: Handle_Poly_Triangulation);
  }

  export declare class Handle_Poly_Triangulation_4 extends Handle_Poly_Triangulation {
    constructor(theHandle: Handle_Poly_Triangulation);
  }

export declare class OCJS_ShapeHasher {
  constructor();
  static HashCode(shape: TopoDS_Shape, a1: Standard_Integer): Standard_Size;
  delete(): void;
}

export declare class Handle_TDocStd_Document {
  Nullify(): void;
  IsNull(): boolean;
  reset(thePtr: TDocStd_Document): void;
  get(): TDocStd_Document;
  delete(): void;
}

  export declare class Handle_TDocStd_Document_1 extends Handle_TDocStd_Document {
    constructor();
  }

  export declare class Handle_TDocStd_Document_2 extends Handle_TDocStd_Document {
    constructor(thePtr: TDocStd_Document);
  }

  export declare class Handle_TDocStd_Document_3 extends Handle_TDocStd_Document {
    constructor(theHandle: Handle_TDocStd_Document);
  }

  export declare class Handle_TDocStd_Document_4 extends Handle_TDocStd_Document {
    constructor(theHandle: Handle_TDocStd_Document);
  }

export declare class BRepToolsWrapper {
  constructor();
  static Write(shape: TopoDS_Shape): string;
  static Read(data: string): TopoDS_Shape;
  delete(): void;
}

export declare class Handle_Geom2d_TrimmedCurve {
  Nullify(): void;
  IsNull(): boolean;
  reset(thePtr: Geom2d_TrimmedCurve): void;
  get(): Geom2d_TrimmedCurve;
  delete(): void;
}

  export declare class Handle_Geom2d_TrimmedCurve_1 extends Handle_Geom2d_TrimmedCurve {
    constructor();
  }

  export declare class Handle_Geom2d_TrimmedCurve_2 extends Handle_Geom2d_TrimmedCurve {
    constructor(thePtr: Geom2d_TrimmedCurve);
  }

  export declare class Handle_Geom2d_TrimmedCurve_3 extends Handle_Geom2d_TrimmedCurve {
    constructor(theHandle: Handle_Geom2d_TrimmedCurve);
  }

  export declare class Handle_Geom2d_TrimmedCurve_4 extends Handle_Geom2d_TrimmedCurve {
    constructor(theHandle: Handle_Geom2d_TrimmedCurve);
  }

export declare class Handle_Geom2d_BSplineCurve {
  Nullify(): void;
  IsNull(): boolean;
  reset(thePtr: Geom2d_BSplineCurve): void;
  get(): Geom2d_BSplineCurve;
  delete(): void;
}

  export declare class Handle_Geom2d_BSplineCurve_1 extends Handle_Geom2d_BSplineCurve {
    constructor();
  }

  export declare class Handle_Geom2d_BSplineCurve_2 extends Handle_Geom2d_BSplineCurve {
    constructor(thePtr: Geom2d_BSplineCurve);
  }

  export declare class Handle_Geom2d_BSplineCurve_3 extends Handle_Geom2d_BSplineCurve {
    constructor(theHandle: Handle_Geom2d_BSplineCurve);
  }

  export declare class Handle_Geom2d_BSplineCurve_4 extends Handle_Geom2d_BSplineCurve {
    constructor(theHandle: Handle_Geom2d_BSplineCurve);
  }

export declare class Handle_XCAFDoc_ShapeTool {
  Nullify(): void;
  IsNull(): boolean;
  reset(thePtr: XCAFDoc_ShapeTool): void;
  get(): XCAFDoc_ShapeTool;
  delete(): void;
}

  export declare class Handle_XCAFDoc_ShapeTool_1 extends Handle_XCAFDoc_ShapeTool {
    constructor();
  }

  export declare class Handle_XCAFDoc_ShapeTool_2 extends Handle_XCAFDoc_ShapeTool {
    constructor(thePtr: XCAFDoc_ShapeTool);
  }

  export declare class Handle_XCAFDoc_ShapeTool_3 extends Handle_XCAFDoc_ShapeTool {
    constructor(theHandle: Handle_XCAFDoc_ShapeTool);
  }

  export declare class Handle_XCAFDoc_ShapeTool_4 extends Handle_XCAFDoc_ShapeTool {
    constructor(theHandle: Handle_XCAFDoc_ShapeTool);
  }

export declare class Handle_HLRBRep_Algo {
  Nullify(): void;
  IsNull(): boolean;
  reset(thePtr: HLRBRep_Algo): void;
  get(): HLRBRep_Algo;
  delete(): void;
}

  export declare class Handle_HLRBRep_Algo_1 extends Handle_HLRBRep_Algo {
    constructor();
  }

  export declare class Handle_HLRBRep_Algo_2 extends Handle_HLRBRep_Algo {
    constructor(thePtr: HLRBRep_Algo);
  }

  export declare class Handle_HLRBRep_Algo_3 extends Handle_HLRBRep_Algo {
    constructor(theHandle: Handle_HLRBRep_Algo);
  }

  export declare class Handle_HLRBRep_Algo_4 extends Handle_HLRBRep_Algo {
    constructor(theHandle: Handle_HLRBRep_Algo);
  }

export declare class Handle_Geom_Geometry {
  Nullify(): void;
  IsNull(): boolean;
  reset(thePtr: Geom_Geometry): void;
  get(): Geom_Geometry;
  delete(): void;
}

  export declare class Handle_Geom_Geometry_1 extends Handle_Geom_Geometry {
    constructor();
  }

  export declare class Handle_Geom_Geometry_2 extends Handle_Geom_Geometry {
    constructor(thePtr: Geom_Geometry);
  }

  export declare class Handle_Geom_Geometry_3 extends Handle_Geom_Geometry {
    constructor(theHandle: Handle_Geom_Geometry);
  }

  export declare class Handle_Geom_Geometry_4 extends Handle_Geom_Geometry {
    constructor(theHandle: Handle_Geom_Geometry);
  }

export declare class Handle_Law_Function {
  Nullify(): void;
  IsNull(): boolean;
  reset(thePtr: Law_Function): void;
  get(): Law_Function;
  delete(): void;
}

  export declare class Handle_Law_Function_1 extends Handle_Law_Function {
    constructor();
  }

  export declare class Handle_Law_Function_2 extends Handle_Law_Function {
    constructor(thePtr: Law_Function);
  }

  export declare class Handle_Law_Function_3 extends Handle_Law_Function {
    constructor(theHandle: Handle_Law_Function);
  }

  export declare class Handle_Law_Function_4 extends Handle_Law_Function {
    constructor(theHandle: Handle_Law_Function);
  }

export declare class Handle_Geom_Surface {
  Nullify(): void;
  IsNull(): boolean;
  reset(thePtr: Geom_Surface): void;
  get(): Geom_Surface;
  delete(): void;
}

  export declare class Handle_Geom_Surface_1 extends Handle_Geom_Surface {
    constructor();
  }

  export declare class Handle_Geom_Surface_2 extends Handle_Geom_Surface {
    constructor(thePtr: Geom_Surface);
  }

  export declare class Handle_Geom_Surface_3 extends Handle_Geom_Surface {
    constructor(theHandle: Handle_Geom_Surface);
  }

  export declare class Handle_Geom_Surface_4 extends Handle_Geom_Surface {
    constructor(theHandle: Handle_Geom_Surface);
  }

export declare type BRepFill_TypeOfContact = {
  BRepFill_NoContact: {};
  BRepFill_Contact: {};
  BRepFill_ContactOnBorder: {};
}

export declare type BOPAlgo_GlueEnum = {
  BOPAlgo_GlueOff: {};
  BOPAlgo_GlueShift: {};
  BOPAlgo_GlueFull: {};
}

export declare class BOPAlgo_Options {
  Allocator(): TDF_HAllocator;
  Clear(): void;
  AddError(theAlert: any): void;
  AddWarning(theAlert: any): void;
  HasErrors(): Standard_Boolean;
  HasError(theType: any): Standard_Boolean;
  HasWarnings(): Standard_Boolean;
  HasWarning(theType: any): Standard_Boolean;
  GetReport(): any;
  ClearWarnings(): void;
  static GetParallelMode(): Standard_Boolean;
  static SetParallelMode(theNewMode: Standard_Boolean): void;
  SetRunParallel(theFlag: Standard_Boolean): void;
  RunParallel(): Standard_Boolean;
  SetFuzzyValue(theFuzz: Standard_Real): void;
  FuzzyValue(): Standard_Real;
  SetUseOBB(theUseOBB: Standard_Boolean): void;
  UseOBB(): Standard_Boolean;
  delete(): void;
}

  export declare class BOPAlgo_Options_1 extends BOPAlgo_Options {
    constructor();
  }

  export declare class BOPAlgo_Options_2 extends BOPAlgo_Options {
    constructor(theAllocator: TDF_HAllocator);
  }

export declare class BRepAlgoAPI_Cut extends BRepAlgoAPI_BooleanOperation {
  delete(): void;
}

  export declare class BRepAlgoAPI_Cut_1 extends BRepAlgoAPI_Cut {
    constructor();
  }

  export declare class BRepAlgoAPI_Cut_2 extends BRepAlgoAPI_Cut {
    constructor(PF: BOPAlgo_PaveFiller);
  }

  export declare class BRepAlgoAPI_Cut_3 extends BRepAlgoAPI_Cut {
    constructor(S1: TopoDS_Shape, S2: TopoDS_Shape, theRange: Message_ProgressRange);
  }

  export declare class BRepAlgoAPI_Cut_4 extends BRepAlgoAPI_Cut {
    constructor(S1: TopoDS_Shape, S2: TopoDS_Shape, aDSF: BOPAlgo_PaveFiller, bFWD: Standard_Boolean, theRange: Message_ProgressRange);
  }

export declare class BRepAlgoAPI_BuilderAlgo extends BRepAlgoAPI_Algo {
  SetArguments(theLS: TopTools_ListOfShape): void;
  Arguments(): TopTools_ListOfShape;
  SetNonDestructive(theFlag: Standard_Boolean): void;
  NonDestructive(): Standard_Boolean;
  SetGlue(theGlue: BOPAlgo_GlueEnum): void;
  Glue(): BOPAlgo_GlueEnum;
  SetCheckInverted(theCheck: Standard_Boolean): void;
  CheckInverted(): Standard_Boolean;
  Build(theRange: Message_ProgressRange): void;
  SimplifyResult(theUnifyEdges: Standard_Boolean, theUnifyFaces: Standard_Boolean, theAngularTol: Standard_Real): void;
  Modified(theS: TopoDS_Shape): TopTools_ListOfShape;
  Generated(theS: TopoDS_Shape): TopTools_ListOfShape;
  IsDeleted(aS: TopoDS_Shape): Standard_Boolean;
  HasModified(): Standard_Boolean;
  HasGenerated(): Standard_Boolean;
  HasDeleted(): Standard_Boolean;
  SetToFillHistory(theHistFlag: Standard_Boolean): void;
  HasHistory(): Standard_Boolean;
  SectionEdges(): TopTools_ListOfShape;
  DSFiller(): BOPAlgo_PPaveFiller;
  Builder(): BOPAlgo_PBuilder;
  History(): any;
  delete(): void;
}

  export declare class BRepAlgoAPI_BuilderAlgo_1 extends BRepAlgoAPI_BuilderAlgo {
    constructor();
  }

  export declare class BRepAlgoAPI_BuilderAlgo_2 extends BRepAlgoAPI_BuilderAlgo {
    constructor(thePF: BOPAlgo_PaveFiller);
  }

export declare class BRepAlgoAPI_Common extends BRepAlgoAPI_BooleanOperation {
  delete(): void;
}

  export declare class BRepAlgoAPI_Common_1 extends BRepAlgoAPI_Common {
    constructor();
  }

  export declare class BRepAlgoAPI_Common_2 extends BRepAlgoAPI_Common {
    constructor(PF: BOPAlgo_PaveFiller);
  }

  export declare class BRepAlgoAPI_Common_3 extends BRepAlgoAPI_Common {
    constructor(S1: TopoDS_Shape, S2: TopoDS_Shape, theRange: Message_ProgressRange);
  }

  export declare class BRepAlgoAPI_Common_4 extends BRepAlgoAPI_Common {
    constructor(S1: TopoDS_Shape, S2: TopoDS_Shape, PF: BOPAlgo_PaveFiller, theRange: Message_ProgressRange);
  }

export declare class BRepAlgoAPI_Section extends BRepAlgoAPI_BooleanOperation {
  Init1_1(S1: TopoDS_Shape): void;
  Init1_2(Pl: gp_Pln): void;
  Init1_3(Sf: any): void;
  Init2_1(S2: TopoDS_Shape): void;
  Init2_2(Pl: gp_Pln): void;
  Init2_3(Sf: any): void;
  Approximation(B: Standard_Boolean): void;
  ComputePCurveOn1(B: Standard_Boolean): void;
  ComputePCurveOn2(B: Standard_Boolean): void;
  Build(theRange: Message_ProgressRange): void;
  HasAncestorFaceOn1(E: TopoDS_Shape, F: TopoDS_Shape): Standard_Boolean;
  HasAncestorFaceOn2(E: TopoDS_Shape, F: TopoDS_Shape): Standard_Boolean;
  delete(): void;
}

  export declare class BRepAlgoAPI_Section_1 extends BRepAlgoAPI_Section {
    constructor();
  }

  export declare class BRepAlgoAPI_Section_2 extends BRepAlgoAPI_Section {
    constructor(PF: BOPAlgo_PaveFiller);
  }

  export declare class BRepAlgoAPI_Section_3 extends BRepAlgoAPI_Section {
    constructor(S1: TopoDS_Shape, S2: TopoDS_Shape, PerformNow: Standard_Boolean);
  }

  export declare class BRepAlgoAPI_Section_4 extends BRepAlgoAPI_Section {
    constructor(S1: TopoDS_Shape, S2: TopoDS_Shape, aDSF: BOPAlgo_PaveFiller, PerformNow: Standard_Boolean);
  }

  export declare class BRepAlgoAPI_Section_5 extends BRepAlgoAPI_Section {
    constructor(S1: TopoDS_Shape, Pl: gp_Pln, PerformNow: Standard_Boolean);
  }

  export declare class BRepAlgoAPI_Section_6 extends BRepAlgoAPI_Section {
    constructor(S1: TopoDS_Shape, Sf: any, PerformNow: Standard_Boolean);
  }

  export declare class BRepAlgoAPI_Section_7 extends BRepAlgoAPI_Section {
    constructor(Sf: any, S2: TopoDS_Shape, PerformNow: Standard_Boolean);
  }

  export declare class BRepAlgoAPI_Section_8 extends BRepAlgoAPI_Section {
    constructor(Sf1: any, Sf2: any, PerformNow: Standard_Boolean);
  }

export declare class BRepAlgoAPI_Algo extends BRepBuilderAPI_MakeShape {
  Shape(): TopoDS_Shape;
  Clear(): void;
  ClearWarnings(): void;
  FuzzyValue(): Standard_Real;
  GetReport(): any;
  HasError(theType: any): Standard_Boolean;
  HasErrors(): Standard_Boolean;
  HasWarning(theType: any): Standard_Boolean;
  HasWarnings(): Standard_Boolean;
  RunParallel(): Standard_Boolean;
  SetFuzzyValue(theFuzz: Standard_Real): void;
  SetRunParallel(theFlag: Standard_Boolean): void;
  SetUseOBB(theUseOBB: Standard_Boolean): void;
  delete(): void;
}

export declare class BRepAlgoAPI_BooleanOperation extends BRepAlgoAPI_BuilderAlgo {
  Shape1(): TopoDS_Shape;
  Shape2(): TopoDS_Shape;
  SetTools(theLS: TopTools_ListOfShape): void;
  Tools(): TopTools_ListOfShape;
  SetOperation(theBOP: BOPAlgo_Operation): void;
  Operation(): BOPAlgo_Operation;
  Build(theRange: Message_ProgressRange): void;
  delete(): void;
}

  export declare class BRepAlgoAPI_BooleanOperation_1 extends BRepAlgoAPI_BooleanOperation {
    constructor();
  }

  export declare class BRepAlgoAPI_BooleanOperation_2 extends BRepAlgoAPI_BooleanOperation {
    constructor(thePF: BOPAlgo_PaveFiller);
  }

export declare class BRepAlgoAPI_Fuse extends BRepAlgoAPI_BooleanOperation {
  delete(): void;
}

  export declare class BRepAlgoAPI_Fuse_1 extends BRepAlgoAPI_Fuse {
    constructor();
  }

  export declare class BRepAlgoAPI_Fuse_2 extends BRepAlgoAPI_Fuse {
    constructor(PF: BOPAlgo_PaveFiller);
  }

  export declare class BRepAlgoAPI_Fuse_3 extends BRepAlgoAPI_Fuse {
    constructor(S1: TopoDS_Shape, S2: TopoDS_Shape, theRange: Message_ProgressRange);
  }

  export declare class BRepAlgoAPI_Fuse_4 extends BRepAlgoAPI_Fuse {
    constructor(S1: TopoDS_Shape, S2: TopoDS_Shape, aDSF: BOPAlgo_PaveFiller, theRange: Message_ProgressRange);
  }

export declare class Law_Composite extends Law_Function {
  Continuity(): GeomAbs_Shape;
  NbIntervals(S: GeomAbs_Shape): Standard_Integer;
  Intervals(T: TColStd_Array1OfReal, S: GeomAbs_Shape): void;
  Value(X: Standard_Real): Standard_Real;
  D1(X: Standard_Real, F: Standard_Real, D: Standard_Real): void;
  D2(X: Standard_Real, F: Standard_Real, D: Standard_Real, D2: Standard_Real): void;
  Trim(PFirst: Standard_Real, PLast: Standard_Real, Tol: Standard_Real): any;
  Bounds(PFirst: Standard_Real, PLast: Standard_Real): void;
  ChangeElementaryLaw(W: Standard_Real): any;
  ChangeLaws(): any;
  IsPeriodic(): Standard_Boolean;
  SetPeriodic(): void;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): any;
  DynamicType(): any;
  delete(): void;
}

  export declare class Law_Composite_1 extends Law_Composite {
    constructor();
  }

  export declare class Law_Composite_2 extends Law_Composite {
    constructor(First: Standard_Real, Last: Standard_Real, Tol: Standard_Real);
  }

export declare class Law_Interpol extends Law_BSpFunc {
  constructor()
  Set_1(ParAndRad: TColgp_Array1OfPnt2d, Periodic: Standard_Boolean): void;
  SetInRelative_1(ParAndRad: TColgp_Array1OfPnt2d, Ud: Standard_Real, Uf: Standard_Real, Periodic: Standard_Boolean): void;
  Set_2(ParAndRad: TColgp_Array1OfPnt2d, Dd: Standard_Real, Df: Standard_Real, Periodic: Standard_Boolean): void;
  SetInRelative_2(ParAndRad: TColgp_Array1OfPnt2d, Ud: Standard_Real, Uf: Standard_Real, Dd: Standard_Real, Df: Standard_Real, Periodic: Standard_Boolean): void;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): any;
  DynamicType(): any;
  delete(): void;
}

export declare class Law_BSpFunc extends Law_Function {
  Continuity(): GeomAbs_Shape;
  NbIntervals(S: GeomAbs_Shape): Standard_Integer;
  Intervals(T: TColStd_Array1OfReal, S: GeomAbs_Shape): void;
  Value(X: Standard_Real): Standard_Real;
  D1(X: Standard_Real, F: Standard_Real, D: Standard_Real): void;
  D2(X: Standard_Real, F: Standard_Real, D: Standard_Real, D2: Standard_Real): void;
  Trim(PFirst: Standard_Real, PLast: Standard_Real, Tol: Standard_Real): any;
  Bounds(PFirst: Standard_Real, PLast: Standard_Real): void;
  Curve(): any;
  SetCurve(C: any): void;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): any;
  DynamicType(): any;
  delete(): void;
}

  export declare class Law_BSpFunc_1 extends Law_BSpFunc {
    constructor();
  }

  export declare class Law_BSpFunc_2 extends Law_BSpFunc {
    constructor(C: any, First: Standard_Real, Last: Standard_Real);
  }

export declare class Law_S extends Law_BSpFunc {
  constructor()
  Set_1(Pdeb: Standard_Real, Valdeb: Standard_Real, Pfin: Standard_Real, Valfin: Standard_Real): void;
  Set_2(Pdeb: Standard_Real, Valdeb: Standard_Real, Ddeb: Standard_Real, Pfin: Standard_Real, Valfin: Standard_Real, Dfin: Standard_Real): void;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): any;
  DynamicType(): any;
  delete(): void;
}

export declare class Law_Linear extends Law_Function {
  constructor()
  Set(Pdeb: Standard_Real, Valdeb: Standard_Real, Pfin: Standard_Real, Valfin: Standard_Real): void;
  Continuity(): GeomAbs_Shape;
  NbIntervals(S: GeomAbs_Shape): Standard_Integer;
  Intervals(T: TColStd_Array1OfReal, S: GeomAbs_Shape): void;
  Value(X: Standard_Real): Standard_Real;
  D1(X: Standard_Real, F: Standard_Real, D: Standard_Real): void;
  D2(X: Standard_Real, F: Standard_Real, D: Standard_Real, D2: Standard_Real): void;
  Trim(PFirst: Standard_Real, PLast: Standard_Real, Tol: Standard_Real): any;
  Bounds(PFirst: Standard_Real, PLast: Standard_Real): void;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): any;
  DynamicType(): any;
  delete(): void;
}

export declare class Law_Function extends Standard_Transient {
  Continuity(): GeomAbs_Shape;
  NbIntervals(S: GeomAbs_Shape): Standard_Integer;
  Intervals(T: TColStd_Array1OfReal, S: GeomAbs_Shape): void;
  Value(X: Standard_Real): Standard_Real;
  D1(X: Standard_Real, F: Standard_Real, D: Standard_Real): void;
  D2(X: Standard_Real, F: Standard_Real, D: Standard_Real, D2: Standard_Real): void;
  Trim(PFirst: Standard_Real, PLast: Standard_Real, Tol: Standard_Real): any;
  Bounds(PFirst: Standard_Real, PLast: Standard_Real): void;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): any;
  DynamicType(): any;
  delete(): void;
}

export declare class Geom2dAPI_InterCurveCurve {
  Init_1(C1: any, C2: any, Tol: Standard_Real): void;
  Init_2(C1: any, Tol: Standard_Real): void;
  NbPoints(): Standard_Integer;
  Point(Index: Standard_Integer): gp_Pnt2d;
  NbSegments(): Standard_Integer;
  Segment(Index: Standard_Integer, Curve1: any, Curve2: any): void;
  Intersector(): Geom2dInt_GInter;
  delete(): void;
}

  export declare class Geom2dAPI_InterCurveCurve_1 extends Geom2dAPI_InterCurveCurve {
    constructor();
  }

  export declare class Geom2dAPI_InterCurveCurve_2 extends Geom2dAPI_InterCurveCurve {
    constructor(C1: any, C2: any, Tol: Standard_Real);
  }

  export declare class Geom2dAPI_InterCurveCurve_3 extends Geom2dAPI_InterCurveCurve {
    constructor(C1: any, Tol: Standard_Real);
  }

export declare class Geom2dAPI_ProjectPointOnCurve {
  Init_1(P: gp_Pnt2d, Curve: any): void;
  Init_2(P: gp_Pnt2d, Curve: any, Umin: Standard_Real, Usup: Standard_Real): void;
  NbPoints(): Standard_Integer;
  Point(Index: Standard_Integer): gp_Pnt2d;
  Parameter_1(Index: Standard_Integer): Standard_Real;
  Parameter_2(Index: Standard_Integer, U: Standard_Real): void;
  Distance(Index: Standard_Integer): Standard_Real;
  NearestPoint(): gp_Pnt2d;
  LowerDistanceParameter(): Standard_Real;
  LowerDistance(): Standard_Real;
  Extrema(): Extrema_ExtPC2d;
  delete(): void;
}

  export declare class Geom2dAPI_ProjectPointOnCurve_1 extends Geom2dAPI_ProjectPointOnCurve {
    constructor();
  }

  export declare class Geom2dAPI_ProjectPointOnCurve_2 extends Geom2dAPI_ProjectPointOnCurve {
    constructor(P: gp_Pnt2d, Curve: any);
  }

  export declare class Geom2dAPI_ProjectPointOnCurve_3 extends Geom2dAPI_ProjectPointOnCurve {
    constructor(P: gp_Pnt2d, Curve: any, Umin: Standard_Real, Usup: Standard_Real);
  }

export declare class Geom2dAPI_ExtremaCurveCurve {
  constructor(C1: any, C2: any, U1min: Standard_Real, U1max: Standard_Real, U2min: Standard_Real, U2max: Standard_Real)
  NbExtrema(): Standard_Integer;
  Points(Index: Standard_Integer, P1: gp_Pnt2d, P2: gp_Pnt2d): void;
  Parameters(Index: Standard_Integer, U1: Standard_Real, U2: Standard_Real): void;
  Distance(Index: Standard_Integer): Standard_Real;
  NearestPoints(P1: gp_Pnt2d, P2: gp_Pnt2d): void;
  LowerDistanceParameters(U1: Standard_Real, U2: Standard_Real): void;
  LowerDistance(): Standard_Real;
  Extrema(): Extrema_ExtCC2d;
  delete(): void;
}

export declare class Geom2dAPI_PointsToBSpline {
  Init_1(Points: TColgp_Array1OfPnt2d, DegMin: Standard_Integer, DegMax: Standard_Integer, Continuity: GeomAbs_Shape, Tol2D: Standard_Real): void;
  Init_2(YValues: TColStd_Array1OfReal, X0: Standard_Real, DX: Standard_Real, DegMin: Standard_Integer, DegMax: Standard_Integer, Continuity: GeomAbs_Shape, Tol2D: Standard_Real): void;
  Init_3(Points: TColgp_Array1OfPnt2d, ParType: Approx_ParametrizationType, DegMin: Standard_Integer, DegMax: Standard_Integer, Continuity: GeomAbs_Shape, Tol2D: Standard_Real): void;
  Init_4(Points: TColgp_Array1OfPnt2d, Parameters: TColStd_Array1OfReal, DegMin: Standard_Integer, DegMax: Standard_Integer, Continuity: GeomAbs_Shape, Tol2D: Standard_Real): void;
  Init_5(Points: TColgp_Array1OfPnt2d, Weight1: Standard_Real, Weight2: Standard_Real, Weight3: Standard_Real, DegMax: Standard_Integer, Continuity: GeomAbs_Shape, Tol2D: Standard_Real): void;
  Curve(): any;
  IsDone(): Standard_Boolean;
  delete(): void;
}

  export declare class Geom2dAPI_PointsToBSpline_1 extends Geom2dAPI_PointsToBSpline {
    constructor();
  }

  export declare class Geom2dAPI_PointsToBSpline_2 extends Geom2dAPI_PointsToBSpline {
    constructor(Points: TColgp_Array1OfPnt2d, DegMin: Standard_Integer, DegMax: Standard_Integer, Continuity: GeomAbs_Shape, Tol2D: Standard_Real);
  }

  export declare class Geom2dAPI_PointsToBSpline_3 extends Geom2dAPI_PointsToBSpline {
    constructor(YValues: TColStd_Array1OfReal, X0: Standard_Real, DX: Standard_Real, DegMin: Standard_Integer, DegMax: Standard_Integer, Continuity: GeomAbs_Shape, Tol2D: Standard_Real);
  }

  export declare class Geom2dAPI_PointsToBSpline_4 extends Geom2dAPI_PointsToBSpline {
    constructor(Points: TColgp_Array1OfPnt2d, ParType: Approx_ParametrizationType, DegMin: Standard_Integer, DegMax: Standard_Integer, Continuity: GeomAbs_Shape, Tol2D: Standard_Real);
  }

  export declare class Geom2dAPI_PointsToBSpline_5 extends Geom2dAPI_PointsToBSpline {
    constructor(Points: TColgp_Array1OfPnt2d, Parameters: TColStd_Array1OfReal, DegMin: Standard_Integer, DegMax: Standard_Integer, Continuity: GeomAbs_Shape, Tol2D: Standard_Real);
  }

  export declare class Geom2dAPI_PointsToBSpline_6 extends Geom2dAPI_PointsToBSpline {
    constructor(Points: TColgp_Array1OfPnt2d, Weight1: Standard_Real, Weight2: Standard_Real, Weight3: Standard_Real, DegMax: Standard_Integer, Continuity: GeomAbs_Shape, Tol3D: Standard_Real);
  }

export declare class GeomAPI_PointsToBSpline {
  Init_1(Points: TColgp_Array1OfPnt, DegMin: Standard_Integer, DegMax: Standard_Integer, Continuity: GeomAbs_Shape, Tol3D: Standard_Real): void;
  Init_2(Points: TColgp_Array1OfPnt, ParType: Approx_ParametrizationType, DegMin: Standard_Integer, DegMax: Standard_Integer, Continuity: GeomAbs_Shape, Tol3D: Standard_Real): void;
  Init_3(Points: TColgp_Array1OfPnt, Parameters: TColStd_Array1OfReal, DegMin: Standard_Integer, DegMax: Standard_Integer, Continuity: GeomAbs_Shape, Tol3D: Standard_Real): void;
  Init_4(Points: TColgp_Array1OfPnt, Weight1: Standard_Real, Weight2: Standard_Real, Weight3: Standard_Real, DegMax: Standard_Integer, Continuity: GeomAbs_Shape, Tol3D: Standard_Real): void;
  Curve(): any;
  IsDone(): Standard_Boolean;
  delete(): void;
}

  export declare class GeomAPI_PointsToBSpline_1 extends GeomAPI_PointsToBSpline {
    constructor();
  }

  export declare class GeomAPI_PointsToBSpline_2 extends GeomAPI_PointsToBSpline {
    constructor(Points: TColgp_Array1OfPnt, DegMin: Standard_Integer, DegMax: Standard_Integer, Continuity: GeomAbs_Shape, Tol3D: Standard_Real);
  }

  export declare class GeomAPI_PointsToBSpline_3 extends GeomAPI_PointsToBSpline {
    constructor(Points: TColgp_Array1OfPnt, ParType: Approx_ParametrizationType, DegMin: Standard_Integer, DegMax: Standard_Integer, Continuity: GeomAbs_Shape, Tol3D: Standard_Real);
  }

  export declare class GeomAPI_PointsToBSpline_4 extends GeomAPI_PointsToBSpline {
    constructor(Points: TColgp_Array1OfPnt, Parameters: TColStd_Array1OfReal, DegMin: Standard_Integer, DegMax: Standard_Integer, Continuity: GeomAbs_Shape, Tol3D: Standard_Real);
  }

  export declare class GeomAPI_PointsToBSpline_5 extends GeomAPI_PointsToBSpline {
    constructor(Points: TColgp_Array1OfPnt, Weight1: Standard_Real, Weight2: Standard_Real, Weight3: Standard_Real, DegMax: Standard_Integer, Continuity: GeomAbs_Shape, Tol3D: Standard_Real);
  }

export declare class GeomAPI_ProjectPointOnSurf {
  Init_1(P: gp_Pnt, Surface: any, Tolerance: Standard_Real, Algo: Extrema_ExtAlgo): void;
  Init_2(P: gp_Pnt, Surface: any, Algo: Extrema_ExtAlgo): void;
  Init_3(P: gp_Pnt, Surface: any, Umin: Standard_Real, Usup: Standard_Real, Vmin: Standard_Real, Vsup: Standard_Real, Tolerance: Standard_Real, Algo: Extrema_ExtAlgo): void;
  Init_4(P: gp_Pnt, Surface: any, Umin: Standard_Real, Usup: Standard_Real, Vmin: Standard_Real, Vsup: Standard_Real, Algo: Extrema_ExtAlgo): void;
  Init_5(Surface: any, Umin: Standard_Real, Usup: Standard_Real, Vmin: Standard_Real, Vsup: Standard_Real, Tolerance: Standard_Real, Algo: Extrema_ExtAlgo): void;
  Init_6(Surface: any, Umin: Standard_Real, Usup: Standard_Real, Vmin: Standard_Real, Vsup: Standard_Real, Algo: Extrema_ExtAlgo): void;
  SetExtremaAlgo(theAlgo: Extrema_ExtAlgo): void;
  SetExtremaFlag(theExtFlag: Extrema_ExtFlag): void;
  Perform(P: gp_Pnt): void;
  IsDone(): Standard_Boolean;
  NbPoints(): Standard_Integer;
  Point(Index: Standard_Integer): gp_Pnt;
  Parameters(Index: Standard_Integer, U: Standard_Real, V: Standard_Real): void;
  Distance(Index: Standard_Integer): Standard_Real;
  NearestPoint(): gp_Pnt;
  LowerDistanceParameters(U: Standard_Real, V: Standard_Real): void;
  LowerDistance(): Standard_Real;
  delete(): void;
}

  export declare class GeomAPI_ProjectPointOnSurf_1 extends GeomAPI_ProjectPointOnSurf {
    constructor();
  }

  export declare class GeomAPI_ProjectPointOnSurf_2 extends GeomAPI_ProjectPointOnSurf {
    constructor(P: gp_Pnt, Surface: any, Algo: Extrema_ExtAlgo);
  }

  export declare class GeomAPI_ProjectPointOnSurf_3 extends GeomAPI_ProjectPointOnSurf {
    constructor(P: gp_Pnt, Surface: any, Tolerance: Standard_Real, Algo: Extrema_ExtAlgo);
  }

  export declare class GeomAPI_ProjectPointOnSurf_4 extends GeomAPI_ProjectPointOnSurf {
    constructor(P: gp_Pnt, Surface: any, Umin: Standard_Real, Usup: Standard_Real, Vmin: Standard_Real, Vsup: Standard_Real, Tolerance: Standard_Real, Algo: Extrema_ExtAlgo);
  }

  export declare class GeomAPI_ProjectPointOnSurf_5 extends GeomAPI_ProjectPointOnSurf {
    constructor(P: gp_Pnt, Surface: any, Umin: Standard_Real, Usup: Standard_Real, Vmin: Standard_Real, Vsup: Standard_Real, Algo: Extrema_ExtAlgo);
  }

export declare class BRepPrimAPI_MakePrism extends BRepPrimAPI_MakeSweep {
  Prism(): BRepSweep_Prism;
  Build(theRange: Message_ProgressRange): void;
  FirstShape_1(): TopoDS_Shape;
  LastShape_1(): TopoDS_Shape;
  Generated(S: TopoDS_Shape): TopTools_ListOfShape;
  IsDeleted(S: TopoDS_Shape): Standard_Boolean;
  FirstShape_2(theShape: TopoDS_Shape): TopoDS_Shape;
  LastShape_2(theShape: TopoDS_Shape): TopoDS_Shape;
  delete(): void;
}

  export declare class BRepPrimAPI_MakePrism_1 extends BRepPrimAPI_MakePrism {
    constructor(S: TopoDS_Shape, V: gp_Vec, Copy: Standard_Boolean, Canonize: Standard_Boolean);
  }

  export declare class BRepPrimAPI_MakePrism_2 extends BRepPrimAPI_MakePrism {
    constructor(S: TopoDS_Shape, D: gp_Dir, Inf: Standard_Boolean, Copy: Standard_Boolean, Canonize: Standard_Boolean);
  }

export declare class BRepPrimAPI_MakeSphere extends BRepPrimAPI_MakeOneAxis {
  Sphere(): BRepPrim_Sphere;
  delete(): void;
}

  export declare class BRepPrimAPI_MakeSphere_1 extends BRepPrimAPI_MakeSphere {
    constructor(R: Standard_Real);
  }

  export declare class BRepPrimAPI_MakeSphere_2 extends BRepPrimAPI_MakeSphere {
    constructor(R: Standard_Real, angle: Standard_Real);
  }

  export declare class BRepPrimAPI_MakeSphere_3 extends BRepPrimAPI_MakeSphere {
    constructor(R: Standard_Real, angle1: Standard_Real, angle2: Standard_Real);
  }

  export declare class BRepPrimAPI_MakeSphere_4 extends BRepPrimAPI_MakeSphere {
    constructor(R: Standard_Real, angle1: Standard_Real, angle2: Standard_Real, angle3: Standard_Real);
  }

  export declare class BRepPrimAPI_MakeSphere_5 extends BRepPrimAPI_MakeSphere {
    constructor(Center: gp_Pnt, R: Standard_Real);
  }

  export declare class BRepPrimAPI_MakeSphere_6 extends BRepPrimAPI_MakeSphere {
    constructor(Center: gp_Pnt, R: Standard_Real, angle: Standard_Real);
  }

  export declare class BRepPrimAPI_MakeSphere_7 extends BRepPrimAPI_MakeSphere {
    constructor(Center: gp_Pnt, R: Standard_Real, angle1: Standard_Real, angle2: Standard_Real);
  }

  export declare class BRepPrimAPI_MakeSphere_8 extends BRepPrimAPI_MakeSphere {
    constructor(Center: gp_Pnt, R: Standard_Real, angle1: Standard_Real, angle2: Standard_Real, angle3: Standard_Real);
  }

  export declare class BRepPrimAPI_MakeSphere_9 extends BRepPrimAPI_MakeSphere {
    constructor(Axis: gp_Ax2, R: Standard_Real);
  }

  export declare class BRepPrimAPI_MakeSphere_10 extends BRepPrimAPI_MakeSphere {
    constructor(Axis: gp_Ax2, R: Standard_Real, angle: Standard_Real);
  }

  export declare class BRepPrimAPI_MakeSphere_11 extends BRepPrimAPI_MakeSphere {
    constructor(Axis: gp_Ax2, R: Standard_Real, angle1: Standard_Real, angle2: Standard_Real);
  }

  export declare class BRepPrimAPI_MakeSphere_12 extends BRepPrimAPI_MakeSphere {
    constructor(Axis: gp_Ax2, R: Standard_Real, angle1: Standard_Real, angle2: Standard_Real, angle3: Standard_Real);
  }

export declare class BRepPrimAPI_MakeRevol extends BRepPrimAPI_MakeSweep {
  Revol(): BRepSweep_Revol;
  Build(theRange: Message_ProgressRange): void;
  FirstShape_1(): TopoDS_Shape;
  LastShape_1(): TopoDS_Shape;
  Generated(S: TopoDS_Shape): TopTools_ListOfShape;
  IsDeleted(S: TopoDS_Shape): Standard_Boolean;
  FirstShape_2(theShape: TopoDS_Shape): TopoDS_Shape;
  LastShape_2(theShape: TopoDS_Shape): TopoDS_Shape;
  HasDegenerated(): Standard_Boolean;
  Degenerated(): TopTools_ListOfShape;
  delete(): void;
}

  export declare class BRepPrimAPI_MakeRevol_1 extends BRepPrimAPI_MakeRevol {
    constructor(S: TopoDS_Shape, A: gp_Ax1, D: Standard_Real, Copy: Standard_Boolean);
  }

  export declare class BRepPrimAPI_MakeRevol_2 extends BRepPrimAPI_MakeRevol {
    constructor(S: TopoDS_Shape, A: gp_Ax1, Copy: Standard_Boolean);
  }

export declare class BRepPrimAPI_MakeSweep extends BRepBuilderAPI_MakeShape {
  FirstShape(): TopoDS_Shape;
  LastShape(): TopoDS_Shape;
  delete(): void;
}

export declare class BRepPrimAPI_MakeCylinder extends BRepPrimAPI_MakeOneAxis {
  Cylinder(): BRepPrim_Cylinder;
  delete(): void;
}

  export declare class BRepPrimAPI_MakeCylinder_1 extends BRepPrimAPI_MakeCylinder {
    constructor(R: Standard_Real, H: Standard_Real);
  }

  export declare class BRepPrimAPI_MakeCylinder_2 extends BRepPrimAPI_MakeCylinder {
    constructor(R: Standard_Real, H: Standard_Real, Angle: Standard_Real);
  }

  export declare class BRepPrimAPI_MakeCylinder_3 extends BRepPrimAPI_MakeCylinder {
    constructor(Axes: gp_Ax2, R: Standard_Real, H: Standard_Real);
  }

  export declare class BRepPrimAPI_MakeCylinder_4 extends BRepPrimAPI_MakeCylinder {
    constructor(Axes: gp_Ax2, R: Standard_Real, H: Standard_Real, Angle: Standard_Real);
  }

export declare class BRepPrimAPI_MakeOneAxis extends BRepBuilderAPI_MakeShape {
  Build(theRange: Message_ProgressRange): void;
  Face(): TopoDS_Face;
  Shell(): TopoDS_Shell;
  Solid(): TopoDS_Solid;
  delete(): void;
}

export declare class BRepPrimAPI_MakeBox extends BRepBuilderAPI_MakeShape {
  Init_1(theDX: Standard_Real, theDY: Standard_Real, theDZ: Standard_Real): void;
  Init_2(thePnt: gp_Pnt, theDX: Standard_Real, theDY: Standard_Real, theDZ: Standard_Real): void;
  Init_3(thePnt1: gp_Pnt, thePnt2: gp_Pnt): void;
  Init_4(theAxes: gp_Ax2, theDX: Standard_Real, theDY: Standard_Real, theDZ: Standard_Real): void;
  Wedge(): BRepPrim_Wedge;
  Build(theRange: Message_ProgressRange): void;
  Shell(): TopoDS_Shell;
  Solid(): TopoDS_Solid;
  BottomFace(): TopoDS_Face;
  BackFace(): TopoDS_Face;
  FrontFace(): TopoDS_Face;
  LeftFace(): TopoDS_Face;
  RightFace(): TopoDS_Face;
  TopFace(): TopoDS_Face;
  delete(): void;
}

  export declare class BRepPrimAPI_MakeBox_1 extends BRepPrimAPI_MakeBox {
    constructor();
  }

  export declare class BRepPrimAPI_MakeBox_2 extends BRepPrimAPI_MakeBox {
    constructor(dx: Standard_Real, dy: Standard_Real, dz: Standard_Real);
  }

  export declare class BRepPrimAPI_MakeBox_3 extends BRepPrimAPI_MakeBox {
    constructor(P: gp_Pnt, dx: Standard_Real, dy: Standard_Real, dz: Standard_Real);
  }

  export declare class BRepPrimAPI_MakeBox_4 extends BRepPrimAPI_MakeBox {
    constructor(P1: gp_Pnt, P2: gp_Pnt);
  }

  export declare class BRepPrimAPI_MakeBox_5 extends BRepPrimAPI_MakeBox {
    constructor(Axes: gp_Ax2, dx: Standard_Real, dy: Standard_Real, dz: Standard_Real);
  }

export declare class HLRBRep_InternalAlgo extends Standard_Transient {
  Projector_1(P: HLRAlgo_Projector): void;
  Projector_2(): HLRAlgo_Projector;
  Update(): void;
  Load_1(S: any, SData: any, nbIso: Standard_Integer): void;
  Load_2(S: any, nbIso: Standard_Integer): void;
  Index(S: any): Standard_Integer;
  Remove(I: Standard_Integer): void;
  ShapeData(I: Standard_Integer, SData: any): void;
  SeqOfShapeBounds(): any;
  NbShapes(): Standard_Integer;
  ShapeBounds(I: Standard_Integer): HLRBRep_ShapeBounds;
  InitEdgeStatus(): void;
  Select_1(): void;
  Select_2(I: Standard_Integer): void;
  SelectEdge(I: Standard_Integer): void;
  SelectFace(I: Standard_Integer): void;
  ShowAll_1(): void;
  ShowAll_2(I: Standard_Integer): void;
  HideAll_1(): void;
  HideAll_2(I: Standard_Integer): void;
  PartialHide(): void;
  Hide_1(): void;
  Hide_2(I: Standard_Integer): void;
  Hide_3(I: Standard_Integer, J: Standard_Integer): void;
  Debug_1(deb: Standard_Boolean): void;
  Debug_2(): Standard_Boolean;
  DataStructure(): any;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): any;
  DynamicType(): any;
  delete(): void;
}

  export declare class HLRBRep_InternalAlgo_1 extends HLRBRep_InternalAlgo {
    constructor();
  }

  export declare class HLRBRep_InternalAlgo_2 extends HLRBRep_InternalAlgo {
    constructor(A: any);
  }

export declare class HLRBRep_Algo extends HLRBRep_InternalAlgo {
  Add_1(S: TopoDS_Shape, SData: any, nbIso: Standard_Integer): void;
  Add_2(S: TopoDS_Shape, nbIso: Standard_Integer): void;
  Index(S: TopoDS_Shape): Standard_Integer;
  OutLinedShapeNullify(): void;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): any;
  DynamicType(): any;
  delete(): void;
}

  export declare class HLRBRep_Algo_1 extends HLRBRep_Algo {
    constructor();
  }

  export declare class HLRBRep_Algo_2 extends HLRBRep_Algo {
    constructor(A: any);
  }

export declare class HLRBRep_HLRToShape {
  constructor(A: any)
  VCompound_1(): TopoDS_Shape;
  VCompound_2(S: TopoDS_Shape): TopoDS_Shape;
  Rg1LineVCompound_1(): TopoDS_Shape;
  Rg1LineVCompound_2(S: TopoDS_Shape): TopoDS_Shape;
  RgNLineVCompound_1(): TopoDS_Shape;
  RgNLineVCompound_2(S: TopoDS_Shape): TopoDS_Shape;
  OutLineVCompound_1(): TopoDS_Shape;
  OutLineVCompound3d(): TopoDS_Shape;
  OutLineVCompound_2(S: TopoDS_Shape): TopoDS_Shape;
  IsoLineVCompound_1(): TopoDS_Shape;
  IsoLineVCompound_2(S: TopoDS_Shape): TopoDS_Shape;
  HCompound_1(): TopoDS_Shape;
  HCompound_2(S: TopoDS_Shape): TopoDS_Shape;
  Rg1LineHCompound_1(): TopoDS_Shape;
  Rg1LineHCompound_2(S: TopoDS_Shape): TopoDS_Shape;
  RgNLineHCompound_1(): TopoDS_Shape;
  RgNLineHCompound_2(S: TopoDS_Shape): TopoDS_Shape;
  OutLineHCompound_1(): TopoDS_Shape;
  OutLineHCompound_2(S: TopoDS_Shape): TopoDS_Shape;
  IsoLineHCompound_1(): TopoDS_Shape;
  IsoLineHCompound_2(S: TopoDS_Shape): TopoDS_Shape;
  CompoundOfEdges_1(type: HLRBRep_TypeOfResultingEdge, visible: Standard_Boolean, In3d: Standard_Boolean): TopoDS_Shape;
  CompoundOfEdges_2(S: TopoDS_Shape, type: HLRBRep_TypeOfResultingEdge, visible: Standard_Boolean, In3d: Standard_Boolean): TopoDS_Shape;
  delete(): void;
}

export declare class HLRAlgo_Projector {
  Set(T: gp_Trsf, Persp: Standard_Boolean, Focus: Standard_Real): void;
  Directions(D1: gp_Vec2d, D2: gp_Vec2d, D3: gp_Vec2d): void;
  Scaled(On: Standard_Boolean): void;
  Perspective(): Standard_Boolean;
  Transformation(): gp_Trsf;
  InvertedTransformation(): gp_Trsf;
  FullTransformation(): gp_Trsf;
  Focus(): Standard_Real;
  Transform_1(D: gp_Vec): void;
  Transform_2(Pnt: gp_Pnt): void;
  Project_1(P: gp_Pnt, Pout: gp_Pnt2d): void;
  Project_2(P: gp_Pnt, X: Standard_Real, Y: Standard_Real, Z: Standard_Real): void;
  Project_3(P: gp_Pnt, D1: gp_Vec, Pout: gp_Pnt2d, D1out: gp_Vec2d): void;
  Shoot(X: Standard_Real, Y: Standard_Real): gp_Lin;
  delete(): void;
}

  export declare class HLRAlgo_Projector_1 extends HLRAlgo_Projector {
    constructor();
  }

  export declare class HLRAlgo_Projector_2 extends HLRAlgo_Projector {
    constructor(CS: gp_Ax2);
  }

  export declare class HLRAlgo_Projector_3 extends HLRAlgo_Projector {
    constructor(CS: gp_Ax2, Focus: Standard_Real);
  }

  export declare class HLRAlgo_Projector_4 extends HLRAlgo_Projector {
    constructor(T: gp_Trsf, Persp: Standard_Boolean, Focus: Standard_Real);
  }

  export declare class HLRAlgo_Projector_5 extends HLRAlgo_Projector {
    constructor(T: gp_Trsf, Persp: Standard_Boolean, Focus: Standard_Real, v1: gp_Vec2d, v2: gp_Vec2d, v3: gp_Vec2d);
  }

export declare type BRepOffset_Mode = {
  BRepOffset_Skin: {};
  BRepOffset_Pipe: {};
  BRepOffset_RectoVerso: {};
}

export declare class BRepOffsetAPI_MakeThickSolid extends BRepOffsetAPI_MakeOffsetShape {
  constructor()
  MakeThickSolidBySimple(theS: TopoDS_Shape, theOffsetValue: Standard_Real): void;
  MakeThickSolidByJoin(S: TopoDS_Shape, ClosingFaces: TopTools_ListOfShape, Offset: Standard_Real, Tol: Standard_Real, Mode: BRepOffset_Mode, Intersection: Standard_Boolean, SelfInter: Standard_Boolean, Join: GeomAbs_JoinType, RemoveIntEdges: Standard_Boolean, theRange: Message_ProgressRange): void;
  Build(theRange: Message_ProgressRange): void;
  Modified(S: TopoDS_Shape): TopTools_ListOfShape;
  delete(): void;
}

export declare class BRepOffsetAPI_MakeFilling extends BRepBuilderAPI_MakeShape {
  constructor(Degree: Standard_Integer, NbPtsOnCur: Standard_Integer, NbIter: Standard_Integer, Anisotropie: Standard_Boolean, Tol2d: Standard_Real, Tol3d: Standard_Real, TolAng: Standard_Real, TolCurv: Standard_Real, MaxDeg: Standard_Integer, MaxSegments: Standard_Integer)
  SetConstrParam(Tol2d: Standard_Real, Tol3d: Standard_Real, TolAng: Standard_Real, TolCurv: Standard_Real): void;
  SetResolParam(Degree: Standard_Integer, NbPtsOnCur: Standard_Integer, NbIter: Standard_Integer, Anisotropie: Standard_Boolean): void;
  SetApproxParam(MaxDeg: Standard_Integer, MaxSegments: Standard_Integer): void;
  LoadInitSurface(Surf: TopoDS_Face): void;
  Add_1(Constr: TopoDS_Edge, Order: GeomAbs_Shape, IsBound: Standard_Boolean): Standard_Integer;
  Add_2(Constr: TopoDS_Edge, Support: TopoDS_Face, Order: GeomAbs_Shape, IsBound: Standard_Boolean): Standard_Integer;
  Add_3(Support: TopoDS_Face, Order: GeomAbs_Shape): Standard_Integer;
  Add_4(Point: gp_Pnt): Standard_Integer;
  Add_5(U: Standard_Real, V: Standard_Real, Support: TopoDS_Face, Order: GeomAbs_Shape): Standard_Integer;
  Build(theRange: Message_ProgressRange): void;
  IsDone(): Standard_Boolean;
  Generated(S: TopoDS_Shape): TopTools_ListOfShape;
  G0Error_1(): Standard_Real;
  G1Error_1(): Standard_Real;
  G2Error_1(): Standard_Real;
  G0Error_2(Index: Standard_Integer): Standard_Real;
  G1Error_2(Index: Standard_Integer): Standard_Real;
  G2Error_2(Index: Standard_Integer): Standard_Real;
  delete(): void;
}

export declare class BRepOffsetAPI_MakeOffsetShape extends BRepBuilderAPI_MakeShape {
  constructor()
  PerformBySimple(theS: TopoDS_Shape, theOffsetValue: Standard_Real): void;
  PerformByJoin(S: TopoDS_Shape, Offset: Standard_Real, Tol: Standard_Real, Mode: BRepOffset_Mode, Intersection: Standard_Boolean, SelfInter: Standard_Boolean, Join: GeomAbs_JoinType, RemoveIntEdges: Standard_Boolean, theRange: Message_ProgressRange): void;
  MakeOffset(): BRepOffset_MakeOffset;
  Build(theRange: Message_ProgressRange): void;
  Generated(S: TopoDS_Shape): TopTools_ListOfShape;
  Modified(S: TopoDS_Shape): TopTools_ListOfShape;
  IsDeleted(S: TopoDS_Shape): Standard_Boolean;
  GetJoinType(): GeomAbs_JoinType;
  delete(): void;
}

export declare class BRepOffsetAPI_ThruSections extends BRepBuilderAPI_MakeShape {
  constructor(isSolid: Standard_Boolean, ruled: Standard_Boolean, pres3d: Standard_Real)
  Init(isSolid: Standard_Boolean, ruled: Standard_Boolean, pres3d: Standard_Real): void;
  AddWire(wire: TopoDS_Wire): void;
  AddVertex(aVertex: TopoDS_Vertex): void;
  CheckCompatibility(check: Standard_Boolean): void;
  SetSmoothing(UseSmoothing: Standard_Boolean): void;
  SetParType(ParType: Approx_ParametrizationType): void;
  SetContinuity(C: GeomAbs_Shape): void;
  SetCriteriumWeight(W1: Standard_Real, W2: Standard_Real, W3: Standard_Real): void;
  SetMaxDegree(MaxDeg: Standard_Integer): void;
  ParType(): Approx_ParametrizationType;
  Continuity(): GeomAbs_Shape;
  MaxDegree(): Standard_Integer;
  UseSmoothing(): Standard_Boolean;
  CriteriumWeight(W1: Standard_Real, W2: Standard_Real, W3: Standard_Real): void;
  Build(theRange: Message_ProgressRange): void;
  FirstShape(): TopoDS_Shape;
  LastShape(): TopoDS_Shape;
  GeneratedFace(Edge: TopoDS_Shape): TopoDS_Shape;
  SetMutableInput(theIsMutableInput: Standard_Boolean): void;
  Generated(S: TopoDS_Shape): TopTools_ListOfShape;
  Wires(): TopTools_ListOfShape;
  IsMutableInput(): Standard_Boolean;
  GetStatus(): BRepFill_ThruSectionErrorStatus;
  delete(): void;
}

export declare class BRepOffsetAPI_MakeOffset extends BRepBuilderAPI_MakeShape {
  Init_1(Spine: TopoDS_Face, Join: GeomAbs_JoinType, IsOpenResult: Standard_Boolean): void;
  Init_2(Join: GeomAbs_JoinType, IsOpenResult: Standard_Boolean): void;
  SetApprox(ToApprox: Standard_Boolean): void;
  AddWire(Spine: TopoDS_Wire): void;
  Perform(Offset: Standard_Real, Alt: Standard_Real): void;
  Build(theRange: Message_ProgressRange): void;
  Generated(S: TopoDS_Shape): TopTools_ListOfShape;
  static ConvertFace(theFace: TopoDS_Face, theAngleTolerance: Standard_Real): TopoDS_Face;
  delete(): void;
}

  export declare class BRepOffsetAPI_MakeOffset_1 extends BRepOffsetAPI_MakeOffset {
    constructor();
  }

  export declare class BRepOffsetAPI_MakeOffset_2 extends BRepOffsetAPI_MakeOffset {
    constructor(Spine: TopoDS_Face, Join: GeomAbs_JoinType, IsOpenResult: Standard_Boolean);
  }

  export declare class BRepOffsetAPI_MakeOffset_3 extends BRepOffsetAPI_MakeOffset {
    constructor(Spine: TopoDS_Wire, Join: GeomAbs_JoinType, IsOpenResult: Standard_Boolean);
  }

export declare class BRepOffsetAPI_MakePipeShell extends BRepPrimAPI_MakeSweep {
  constructor(Spine: TopoDS_Wire)
  SetMode_1(IsFrenet: Standard_Boolean): void;
  SetDiscreteMode(): void;
  SetMode_2(Axe: gp_Ax2): void;
  SetMode_3(BiNormal: gp_Dir): void;
  SetMode_4(SpineSupport: TopoDS_Shape): Standard_Boolean;
  SetMode_5(AuxiliarySpine: TopoDS_Wire, CurvilinearEquivalence: Standard_Boolean, KeepContact: BRepFill_TypeOfContact): void;
  Add_1(Profile: TopoDS_Shape, WithContact: Standard_Boolean, WithCorrection: Standard_Boolean): void;
  Add_2(Profile: TopoDS_Shape, Location: TopoDS_Vertex, WithContact: Standard_Boolean, WithCorrection: Standard_Boolean): void;
  SetLaw_1(Profile: TopoDS_Shape, L: any, WithContact: Standard_Boolean, WithCorrection: Standard_Boolean): void;
  SetLaw_2(Profile: TopoDS_Shape, L: any, Location: TopoDS_Vertex, WithContact: Standard_Boolean, WithCorrection: Standard_Boolean): void;
  Delete(Profile: TopoDS_Shape): void;
  IsReady(): Standard_Boolean;
  GetStatus(): BRepBuilderAPI_PipeError;
  SetTolerance(Tol3d: Standard_Real, BoundTol: Standard_Real, TolAngular: Standard_Real): void;
  SetMaxDegree(NewMaxDegree: Standard_Integer): void;
  SetMaxSegments(NewMaxSegments: Standard_Integer): void;
  SetForceApproxC1(ForceApproxC1: Standard_Boolean): void;
  SetTransitionMode(Mode: BRepBuilderAPI_TransitionMode): void;
  Simulate(NumberOfSection: Standard_Integer, Result: TopTools_ListOfShape): void;
  Build(theRange: Message_ProgressRange): void;
  MakeSolid(): Standard_Boolean;
  FirstShape(): TopoDS_Shape;
  LastShape(): TopoDS_Shape;
  Generated(S: TopoDS_Shape): TopTools_ListOfShape;
  ErrorOnSurface(): Standard_Real;
  SetIsBuildHistory(theIsBuildHistory: Standard_Boolean): void;
  IsBuildHistory(): Standard_Boolean;
  Profiles(theProfiles: TopTools_ListOfShape): void;
  Spine(): TopoDS_Wire;
  delete(): void;
}

export declare class BRepExtrema_DistShapeShape {
  SetDeflection(theDeflection: Standard_Real): void;
  LoadS1(Shape1: TopoDS_Shape): void;
  LoadS2(Shape1: TopoDS_Shape): void;
  Perform(theRange: Message_ProgressRange): Standard_Boolean;
  IsDone(): Standard_Boolean;
  NbSolution(): Standard_Integer;
  Value(): Standard_Real;
  InnerSolution(): Standard_Boolean;
  PointOnShape1(N: Standard_Integer): gp_Pnt;
  PointOnShape2(N: Standard_Integer): gp_Pnt;
  SupportTypeShape1(N: Standard_Integer): BRepExtrema_SupportType;
  SupportTypeShape2(N: Standard_Integer): BRepExtrema_SupportType;
  SupportOnShape1(N: Standard_Integer): TopoDS_Shape;
  SupportOnShape2(N: Standard_Integer): TopoDS_Shape;
  ParOnEdgeS1(N: Standard_Integer, t: Standard_Real): void;
  ParOnEdgeS2(N: Standard_Integer, t: Standard_Real): void;
  ParOnFaceS1(N: Standard_Integer, u: Standard_Real, v: Standard_Real): void;
  ParOnFaceS2(N: Standard_Integer, u: Standard_Real, v: Standard_Real): void;
  SetFlag(F: Extrema_ExtFlag): void;
  SetAlgo(A: Extrema_ExtAlgo): void;
  SetMultiThread(theIsMultiThread: Standard_Boolean): void;
  IsMultiThread(): Standard_Boolean;
  delete(): void;
}

  export declare class BRepExtrema_DistShapeShape_1 extends BRepExtrema_DistShapeShape {
    constructor();
  }

  export declare class BRepExtrema_DistShapeShape_2 extends BRepExtrema_DistShapeShape {
    constructor(Shape1: TopoDS_Shape, Shape2: TopoDS_Shape, F: Extrema_ExtFlag, A: Extrema_ExtAlgo, theRange: Message_ProgressRange);
  }

  export declare class BRepExtrema_DistShapeShape_3 extends BRepExtrema_DistShapeShape {
    constructor(Shape1: TopoDS_Shape, Shape2: TopoDS_Shape, theDeflection: Standard_Real, F: Extrema_ExtFlag, A: Extrema_ExtAlgo, theRange: Message_ProgressRange);
  }

export declare class BRepBndLib {
  constructor();
  static Add(S: TopoDS_Shape, B: Bnd_Box, useTriangulation: Standard_Boolean): void;
  static AddClose(S: TopoDS_Shape, B: Bnd_Box): void;
  static AddOptimal(S: TopoDS_Shape, B: Bnd_Box, useTriangulation: Standard_Boolean, useShapeTolerance: Standard_Boolean): void;
  static AddOBB(theS: TopoDS_Shape, theOBB: Bnd_OBB, theIsTriangulationUsed: Standard_Boolean, theIsOptimal: Standard_Boolean, theIsShapeToleranceUsed: Standard_Boolean): void;
  delete(): void;
}

export declare type BRepBuilderAPI_WireError = {
  BRepBuilderAPI_WireDone: {};
  BRepBuilderAPI_EmptyWire: {};
  BRepBuilderAPI_DisconnectedWire: {};
  BRepBuilderAPI_NonManifoldWire: {};
}

export declare class BRepBuilderAPI_MakeEdge extends BRepBuilderAPI_MakeShape {
  Init_1(C: any): void;
  Init_2(C: any, p1: Standard_Real, p2: Standard_Real): void;
  Init_3(C: any, P1: gp_Pnt, P2: gp_Pnt): void;
  Init_4(C: any, V1: TopoDS_Vertex, V2: TopoDS_Vertex): void;
  Init_5(C: any, P1: gp_Pnt, P2: gp_Pnt, p1: Standard_Real, p2: Standard_Real): void;
  Init_6(C: any, V1: TopoDS_Vertex, V2: TopoDS_Vertex, p1: Standard_Real, p2: Standard_Real): void;
  Init_7(C: any, S: any): void;
  Init_8(C: any, S: any, p1: Standard_Real, p2: Standard_Real): void;
  Init_9(C: any, S: any, P1: gp_Pnt, P2: gp_Pnt): void;
  Init_10(C: any, S: any, V1: TopoDS_Vertex, V2: TopoDS_Vertex): void;
  Init_11(C: any, S: any, P1: gp_Pnt, P2: gp_Pnt, p1: Standard_Real, p2: Standard_Real): void;
  Init_12(C: any, S: any, V1: TopoDS_Vertex, V2: TopoDS_Vertex, p1: Standard_Real, p2: Standard_Real): void;
  IsDone(): Standard_Boolean;
  Error(): BRepBuilderAPI_EdgeError;
  Edge(): TopoDS_Edge;
  Vertex1(): TopoDS_Vertex;
  Vertex2(): TopoDS_Vertex;
  delete(): void;
}

  export declare class BRepBuilderAPI_MakeEdge_1 extends BRepBuilderAPI_MakeEdge {
    constructor();
  }

  export declare class BRepBuilderAPI_MakeEdge_2 extends BRepBuilderAPI_MakeEdge {
    constructor(V1: TopoDS_Vertex, V2: TopoDS_Vertex);
  }

  export declare class BRepBuilderAPI_MakeEdge_3 extends BRepBuilderAPI_MakeEdge {
    constructor(P1: gp_Pnt, P2: gp_Pnt);
  }

  export declare class BRepBuilderAPI_MakeEdge_4 extends BRepBuilderAPI_MakeEdge {
    constructor(L: gp_Lin);
  }

  export declare class BRepBuilderAPI_MakeEdge_5 extends BRepBuilderAPI_MakeEdge {
    constructor(L: gp_Lin, p1: Standard_Real, p2: Standard_Real);
  }

  export declare class BRepBuilderAPI_MakeEdge_6 extends BRepBuilderAPI_MakeEdge {
    constructor(L: gp_Lin, P1: gp_Pnt, P2: gp_Pnt);
  }

  export declare class BRepBuilderAPI_MakeEdge_7 extends BRepBuilderAPI_MakeEdge {
    constructor(L: gp_Lin, V1: TopoDS_Vertex, V2: TopoDS_Vertex);
  }

  export declare class BRepBuilderAPI_MakeEdge_8 extends BRepBuilderAPI_MakeEdge {
    constructor(L: gp_Circ);
  }

  export declare class BRepBuilderAPI_MakeEdge_9 extends BRepBuilderAPI_MakeEdge {
    constructor(L: gp_Circ, p1: Standard_Real, p2: Standard_Real);
  }

  export declare class BRepBuilderAPI_MakeEdge_10 extends BRepBuilderAPI_MakeEdge {
    constructor(L: gp_Circ, P1: gp_Pnt, P2: gp_Pnt);
  }

  export declare class BRepBuilderAPI_MakeEdge_11 extends BRepBuilderAPI_MakeEdge {
    constructor(L: gp_Circ, V1: TopoDS_Vertex, V2: TopoDS_Vertex);
  }

  export declare class BRepBuilderAPI_MakeEdge_12 extends BRepBuilderAPI_MakeEdge {
    constructor(L: gp_Elips);
  }

  export declare class BRepBuilderAPI_MakeEdge_13 extends BRepBuilderAPI_MakeEdge {
    constructor(L: gp_Elips, p1: Standard_Real, p2: Standard_Real);
  }

  export declare class BRepBuilderAPI_MakeEdge_14 extends BRepBuilderAPI_MakeEdge {
    constructor(L: gp_Elips, P1: gp_Pnt, P2: gp_Pnt);
  }

  export declare class BRepBuilderAPI_MakeEdge_15 extends BRepBuilderAPI_MakeEdge {
    constructor(L: gp_Elips, V1: TopoDS_Vertex, V2: TopoDS_Vertex);
  }

  export declare class BRepBuilderAPI_MakeEdge_16 extends BRepBuilderAPI_MakeEdge {
    constructor(L: gp_Hypr);
  }

  export declare class BRepBuilderAPI_MakeEdge_17 extends BRepBuilderAPI_MakeEdge {
    constructor(L: gp_Hypr, p1: Standard_Real, p2: Standard_Real);
  }

  export declare class BRepBuilderAPI_MakeEdge_18 extends BRepBuilderAPI_MakeEdge {
    constructor(L: gp_Hypr, P1: gp_Pnt, P2: gp_Pnt);
  }

  export declare class BRepBuilderAPI_MakeEdge_19 extends BRepBuilderAPI_MakeEdge {
    constructor(L: gp_Hypr, V1: TopoDS_Vertex, V2: TopoDS_Vertex);
  }

  export declare class BRepBuilderAPI_MakeEdge_20 extends BRepBuilderAPI_MakeEdge {
    constructor(L: gp_Parab);
  }

  export declare class BRepBuilderAPI_MakeEdge_21 extends BRepBuilderAPI_MakeEdge {
    constructor(L: gp_Parab, p1: Standard_Real, p2: Standard_Real);
  }

  export declare class BRepBuilderAPI_MakeEdge_22 extends BRepBuilderAPI_MakeEdge {
    constructor(L: gp_Parab, P1: gp_Pnt, P2: gp_Pnt);
  }

  export declare class BRepBuilderAPI_MakeEdge_23 extends BRepBuilderAPI_MakeEdge {
    constructor(L: gp_Parab, V1: TopoDS_Vertex, V2: TopoDS_Vertex);
  }

  export declare class BRepBuilderAPI_MakeEdge_24 extends BRepBuilderAPI_MakeEdge {
    constructor(L: any);
  }

  export declare class BRepBuilderAPI_MakeEdge_25 extends BRepBuilderAPI_MakeEdge {
    constructor(L: any, p1: Standard_Real, p2: Standard_Real);
  }

  export declare class BRepBuilderAPI_MakeEdge_26 extends BRepBuilderAPI_MakeEdge {
    constructor(L: any, P1: gp_Pnt, P2: gp_Pnt);
  }

  export declare class BRepBuilderAPI_MakeEdge_27 extends BRepBuilderAPI_MakeEdge {
    constructor(L: any, V1: TopoDS_Vertex, V2: TopoDS_Vertex);
  }

  export declare class BRepBuilderAPI_MakeEdge_28 extends BRepBuilderAPI_MakeEdge {
    constructor(L: any, P1: gp_Pnt, P2: gp_Pnt, p1: Standard_Real, p2: Standard_Real);
  }

  export declare class BRepBuilderAPI_MakeEdge_29 extends BRepBuilderAPI_MakeEdge {
    constructor(L: any, V1: TopoDS_Vertex, V2: TopoDS_Vertex, p1: Standard_Real, p2: Standard_Real);
  }

  export declare class BRepBuilderAPI_MakeEdge_30 extends BRepBuilderAPI_MakeEdge {
    constructor(L: any, S: any);
  }

  export declare class BRepBuilderAPI_MakeEdge_31 extends BRepBuilderAPI_MakeEdge {
    constructor(L: any, S: any, p1: Standard_Real, p2: Standard_Real);
  }

  export declare class BRepBuilderAPI_MakeEdge_32 extends BRepBuilderAPI_MakeEdge {
    constructor(L: any, S: any, P1: gp_Pnt, P2: gp_Pnt);
  }

  export declare class BRepBuilderAPI_MakeEdge_33 extends BRepBuilderAPI_MakeEdge {
    constructor(L: any, S: any, V1: TopoDS_Vertex, V2: TopoDS_Vertex);
  }

  export declare class BRepBuilderAPI_MakeEdge_34 extends BRepBuilderAPI_MakeEdge {
    constructor(L: any, S: any, P1: gp_Pnt, P2: gp_Pnt, p1: Standard_Real, p2: Standard_Real);
  }

  export declare class BRepBuilderAPI_MakeEdge_35 extends BRepBuilderAPI_MakeEdge {
    constructor(L: any, S: any, V1: TopoDS_Vertex, V2: TopoDS_Vertex, p1: Standard_Real, p2: Standard_Real);
  }

export declare type BRepBuilderAPI_TransitionMode = {
  BRepBuilderAPI_Transformed: {};
  BRepBuilderAPI_RightCorner: {};
  BRepBuilderAPI_RoundCorner: {};
}

export declare class BRepBuilderAPI_ModifyShape extends BRepBuilderAPI_MakeShape {
  Modified(S: TopoDS_Shape): TopTools_ListOfShape;
  ModifiedShape(S: TopoDS_Shape): TopoDS_Shape;
  delete(): void;
}

export declare class BRepBuilderAPI_Sewing extends Standard_Transient {
  constructor(tolerance: Standard_Real, option1: Standard_Boolean, option2: Standard_Boolean, option3: Standard_Boolean, option4: Standard_Boolean)
  Init(tolerance: Standard_Real, option1: Standard_Boolean, option2: Standard_Boolean, option3: Standard_Boolean, option4: Standard_Boolean): void;
  Load(shape: TopoDS_Shape): void;
  Add(shape: TopoDS_Shape): void;
  Perform(theProgress: Message_ProgressRange): void;
  SewedShape(): TopoDS_Shape;
  SetContext(theContext: any): void;
  GetContext(): any;
  NbFreeEdges(): Standard_Integer;
  FreeEdge(index: Standard_Integer): TopoDS_Edge;
  NbMultipleEdges(): Standard_Integer;
  MultipleEdge(index: Standard_Integer): TopoDS_Edge;
  NbContigousEdges(): Standard_Integer;
  ContigousEdge(index: Standard_Integer): TopoDS_Edge;
  ContigousEdgeCouple(index: Standard_Integer): TopTools_ListOfShape;
  IsSectionBound(section: TopoDS_Edge): Standard_Boolean;
  SectionToBoundary(section: TopoDS_Edge): TopoDS_Edge;
  NbDegeneratedShapes(): Standard_Integer;
  DegeneratedShape(index: Standard_Integer): TopoDS_Shape;
  IsDegenerated(shape: TopoDS_Shape): Standard_Boolean;
  IsModified(shape: TopoDS_Shape): Standard_Boolean;
  Modified(shape: TopoDS_Shape): TopoDS_Shape;
  IsModifiedSubShape(shape: TopoDS_Shape): Standard_Boolean;
  ModifiedSubShape(shape: TopoDS_Shape): TopoDS_Shape;
  Dump(): void;
  NbDeletedFaces(): Standard_Integer;
  DeletedFace(index: Standard_Integer): TopoDS_Face;
  WhichFace(theEdg: TopoDS_Edge, index: Standard_Integer): TopoDS_Face;
  SameParameterMode(): Standard_Boolean;
  SetSameParameterMode(SameParameterMode: Standard_Boolean): void;
  Tolerance(): Standard_Real;
  SetTolerance(theToler: Standard_Real): void;
  MinTolerance(): Standard_Real;
  SetMinTolerance(theMinToler: Standard_Real): void;
  MaxTolerance(): Standard_Real;
  SetMaxTolerance(theMaxToler: Standard_Real): void;
  FaceMode(): Standard_Boolean;
  SetFaceMode(theFaceMode: Standard_Boolean): void;
  FloatingEdgesMode(): Standard_Boolean;
  SetFloatingEdgesMode(theFloatingEdgesMode: Standard_Boolean): void;
  LocalTolerancesMode(): Standard_Boolean;
  SetLocalTolerancesMode(theLocalTolerancesMode: Standard_Boolean): void;
  SetNonManifoldMode(theNonManifoldMode: Standard_Boolean): void;
  NonManifoldMode(): Standard_Boolean;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): any;
  DynamicType(): any;
  delete(): void;
}

export declare class BRepBuilderAPI_MakeFace extends BRepBuilderAPI_MakeShape {
  Init_1(F: TopoDS_Face): void;
  Init_2(S: any, Bound: Standard_Boolean, TolDegen: Standard_Real): void;
  Init_3(S: any, UMin: Standard_Real, UMax: Standard_Real, VMin: Standard_Real, VMax: Standard_Real, TolDegen: Standard_Real): void;
  Add(W: TopoDS_Wire): void;
  IsDone(): Standard_Boolean;
  Error(): BRepBuilderAPI_FaceError;
  Face(): TopoDS_Face;
  delete(): void;
}

  export declare class BRepBuilderAPI_MakeFace_1 extends BRepBuilderAPI_MakeFace {
    constructor();
  }

  export declare class BRepBuilderAPI_MakeFace_2 extends BRepBuilderAPI_MakeFace {
    constructor(F: TopoDS_Face);
  }

  export declare class BRepBuilderAPI_MakeFace_3 extends BRepBuilderAPI_MakeFace {
    constructor(P: gp_Pln);
  }

  export declare class BRepBuilderAPI_MakeFace_4 extends BRepBuilderAPI_MakeFace {
    constructor(C: gp_Cylinder);
  }

  export declare class BRepBuilderAPI_MakeFace_5 extends BRepBuilderAPI_MakeFace {
    constructor(C: gp_Cone);
  }

  export declare class BRepBuilderAPI_MakeFace_6 extends BRepBuilderAPI_MakeFace {
    constructor(S: gp_Sphere);
  }

  export declare class BRepBuilderAPI_MakeFace_7 extends BRepBuilderAPI_MakeFace {
    constructor(C: gp_Torus);
  }

  export declare class BRepBuilderAPI_MakeFace_8 extends BRepBuilderAPI_MakeFace {
    constructor(S: any, TolDegen: Standard_Real);
  }

  export declare class BRepBuilderAPI_MakeFace_9 extends BRepBuilderAPI_MakeFace {
    constructor(P: gp_Pln, UMin: Standard_Real, UMax: Standard_Real, VMin: Standard_Real, VMax: Standard_Real);
  }

  export declare class BRepBuilderAPI_MakeFace_10 extends BRepBuilderAPI_MakeFace {
    constructor(C: gp_Cylinder, UMin: Standard_Real, UMax: Standard_Real, VMin: Standard_Real, VMax: Standard_Real);
  }

  export declare class BRepBuilderAPI_MakeFace_11 extends BRepBuilderAPI_MakeFace {
    constructor(C: gp_Cone, UMin: Standard_Real, UMax: Standard_Real, VMin: Standard_Real, VMax: Standard_Real);
  }

  export declare class BRepBuilderAPI_MakeFace_12 extends BRepBuilderAPI_MakeFace {
    constructor(S: gp_Sphere, UMin: Standard_Real, UMax: Standard_Real, VMin: Standard_Real, VMax: Standard_Real);
  }

  export declare class BRepBuilderAPI_MakeFace_13 extends BRepBuilderAPI_MakeFace {
    constructor(C: gp_Torus, UMin: Standard_Real, UMax: Standard_Real, VMin: Standard_Real, VMax: Standard_Real);
  }

  export declare class BRepBuilderAPI_MakeFace_14 extends BRepBuilderAPI_MakeFace {
    constructor(S: any, UMin: Standard_Real, UMax: Standard_Real, VMin: Standard_Real, VMax: Standard_Real, TolDegen: Standard_Real);
  }

  export declare class BRepBuilderAPI_MakeFace_15 extends BRepBuilderAPI_MakeFace {
    constructor(W: TopoDS_Wire, OnlyPlane: Standard_Boolean);
  }

  export declare class BRepBuilderAPI_MakeFace_16 extends BRepBuilderAPI_MakeFace {
    constructor(P: gp_Pln, W: TopoDS_Wire, Inside: Standard_Boolean);
  }

  export declare class BRepBuilderAPI_MakeFace_17 extends BRepBuilderAPI_MakeFace {
    constructor(C: gp_Cylinder, W: TopoDS_Wire, Inside: Standard_Boolean);
  }

  export declare class BRepBuilderAPI_MakeFace_18 extends BRepBuilderAPI_MakeFace {
    constructor(C: gp_Cone, W: TopoDS_Wire, Inside: Standard_Boolean);
  }

  export declare class BRepBuilderAPI_MakeFace_19 extends BRepBuilderAPI_MakeFace {
    constructor(S: gp_Sphere, W: TopoDS_Wire, Inside: Standard_Boolean);
  }

  export declare class BRepBuilderAPI_MakeFace_20 extends BRepBuilderAPI_MakeFace {
    constructor(C: gp_Torus, W: TopoDS_Wire, Inside: Standard_Boolean);
  }

  export declare class BRepBuilderAPI_MakeFace_21 extends BRepBuilderAPI_MakeFace {
    constructor(S: any, W: TopoDS_Wire, Inside: Standard_Boolean);
  }

  export declare class BRepBuilderAPI_MakeFace_22 extends BRepBuilderAPI_MakeFace {
    constructor(F: TopoDS_Face, W: TopoDS_Wire);
  }

export declare class BRepBuilderAPI_Transform extends BRepBuilderAPI_ModifyShape {
  Perform(theShape: TopoDS_Shape, theCopyGeom: Standard_Boolean, theCopyMesh: Standard_Boolean): void;
  ModifiedShape(S: TopoDS_Shape): TopoDS_Shape;
  Modified(S: TopoDS_Shape): TopTools_ListOfShape;
  delete(): void;
}

  export declare class BRepBuilderAPI_Transform_1 extends BRepBuilderAPI_Transform {
    constructor(T: gp_Trsf);
  }

  export declare class BRepBuilderAPI_Transform_2 extends BRepBuilderAPI_Transform {
    constructor(theShape: TopoDS_Shape, theTrsf: gp_Trsf, theCopyGeom: Standard_Boolean, theCopyMesh: Standard_Boolean);
  }

export declare class BRepBuilderAPI_MakeVertex extends BRepBuilderAPI_MakeShape {
  constructor(P: gp_Pnt)
  Vertex(): TopoDS_Vertex;
  delete(): void;
}

export declare class BRepBuilderAPI_MakeShape extends BRepBuilderAPI_Command {
  Build(theRange: Message_ProgressRange): void;
  Shape(): TopoDS_Shape;
  Generated(S: TopoDS_Shape): TopTools_ListOfShape;
  Modified(S: TopoDS_Shape): TopTools_ListOfShape;
  IsDeleted(S: TopoDS_Shape): Standard_Boolean;
  delete(): void;
}

export declare class BRepBuilderAPI_MakeWire extends BRepBuilderAPI_MakeShape {
  Add_1(E: TopoDS_Edge): void;
  Add_2(W: TopoDS_Wire): void;
  Add_3(L: TopTools_ListOfShape): void;
  IsDone(): Standard_Boolean;
  Error(): BRepBuilderAPI_WireError;
  Wire(): TopoDS_Wire;
  Edge(): TopoDS_Edge;
  Vertex(): TopoDS_Vertex;
  delete(): void;
}

  export declare class BRepBuilderAPI_MakeWire_1 extends BRepBuilderAPI_MakeWire {
    constructor();
  }

  export declare class BRepBuilderAPI_MakeWire_2 extends BRepBuilderAPI_MakeWire {
    constructor(E: TopoDS_Edge);
  }

  export declare class BRepBuilderAPI_MakeWire_3 extends BRepBuilderAPI_MakeWire {
    constructor(E1: TopoDS_Edge, E2: TopoDS_Edge);
  }

  export declare class BRepBuilderAPI_MakeWire_4 extends BRepBuilderAPI_MakeWire {
    constructor(E1: TopoDS_Edge, E2: TopoDS_Edge, E3: TopoDS_Edge);
  }

  export declare class BRepBuilderAPI_MakeWire_5 extends BRepBuilderAPI_MakeWire {
    constructor(E1: TopoDS_Edge, E2: TopoDS_Edge, E3: TopoDS_Edge, E4: TopoDS_Edge);
  }

  export declare class BRepBuilderAPI_MakeWire_6 extends BRepBuilderAPI_MakeWire {
    constructor(W: TopoDS_Wire);
  }

  export declare class BRepBuilderAPI_MakeWire_7 extends BRepBuilderAPI_MakeWire {
    constructor(W: TopoDS_Wire, E: TopoDS_Edge);
  }

export declare class BRepBuilderAPI_MakeShell extends BRepBuilderAPI_MakeShape {
  Init(S: any, UMin: Standard_Real, UMax: Standard_Real, VMin: Standard_Real, VMax: Standard_Real, Segment: Standard_Boolean): void;
  IsDone(): Standard_Boolean;
  Error(): BRepBuilderAPI_ShellError;
  Shell(): TopoDS_Shell;
  delete(): void;
}

  export declare class BRepBuilderAPI_MakeShell_1 extends BRepBuilderAPI_MakeShell {
    constructor();
  }

  export declare class BRepBuilderAPI_MakeShell_2 extends BRepBuilderAPI_MakeShell {
    constructor(S: any, Segment: Standard_Boolean);
  }

  export declare class BRepBuilderAPI_MakeShell_3 extends BRepBuilderAPI_MakeShell {
    constructor(S: any, UMin: Standard_Real, UMax: Standard_Real, VMin: Standard_Real, VMax: Standard_Real, Segment: Standard_Boolean);
  }

export declare class BRepBuilderAPI_MakeSolid extends BRepBuilderAPI_MakeShape {
  Add(S: TopoDS_Shell): void;
  IsDone(): Standard_Boolean;
  Solid(): TopoDS_Solid;
  IsDeleted(S: TopoDS_Shape): Standard_Boolean;
  delete(): void;
}

  export declare class BRepBuilderAPI_MakeSolid_1 extends BRepBuilderAPI_MakeSolid {
    constructor();
  }

  export declare class BRepBuilderAPI_MakeSolid_2 extends BRepBuilderAPI_MakeSolid {
    constructor(S: TopoDS_CompSolid);
  }

  export declare class BRepBuilderAPI_MakeSolid_3 extends BRepBuilderAPI_MakeSolid {
    constructor(S: TopoDS_Shell);
  }

  export declare class BRepBuilderAPI_MakeSolid_4 extends BRepBuilderAPI_MakeSolid {
    constructor(S1: TopoDS_Shell, S2: TopoDS_Shell);
  }

  export declare class BRepBuilderAPI_MakeSolid_5 extends BRepBuilderAPI_MakeSolid {
    constructor(S1: TopoDS_Shell, S2: TopoDS_Shell, S3: TopoDS_Shell);
  }

  export declare class BRepBuilderAPI_MakeSolid_6 extends BRepBuilderAPI_MakeSolid {
    constructor(So: TopoDS_Solid);
  }

  export declare class BRepBuilderAPI_MakeSolid_7 extends BRepBuilderAPI_MakeSolid {
    constructor(So: TopoDS_Solid, S: TopoDS_Shell);
  }

export declare class BRepBuilderAPI_Command {
  IsDone(): Standard_Boolean;
  Check(): void;
  delete(): void;
}

export declare class BRepLib {
  constructor();
  static Precision_1(P: Standard_Real): void;
  static Precision_2(): Standard_Real;
  static Plane_1(P: any): void;
  static Plane_2(): any;
  static CheckSameRange(E: TopoDS_Edge, Confusion: Standard_Real): Standard_Boolean;
  static SameRange(E: TopoDS_Edge, Tolerance: Standard_Real): void;
  static BuildCurve3d(E: TopoDS_Edge, Tolerance: Standard_Real, Continuity: GeomAbs_Shape, MaxDegree: Standard_Integer, MaxSegment: Standard_Integer): Standard_Boolean;
  static BuildCurves3d_1(S: TopoDS_Shape, Tolerance: Standard_Real, Continuity: GeomAbs_Shape, MaxDegree: Standard_Integer, MaxSegment: Standard_Integer): Standard_Boolean;
  static BuildCurves3d_2(S: TopoDS_Shape): Standard_Boolean;
  static BuildPCurveForEdgeOnPlane_1(theE: TopoDS_Edge, theF: TopoDS_Face): void;
  static BuildPCurveForEdgeOnPlane_2(theE: TopoDS_Edge, theF: TopoDS_Face, aC2D: any, bToUpdate: Standard_Boolean): void;
  static UpdateEdgeTol(E: TopoDS_Edge, MinToleranceRequest: Standard_Real, MaxToleranceToCheck: Standard_Real): Standard_Boolean;
  static UpdateEdgeTolerance(S: TopoDS_Shape, MinToleranceRequest: Standard_Real, MaxToleranceToCheck: Standard_Real): Standard_Boolean;
  static SameParameter_1(theEdge: TopoDS_Edge, Tolerance: Standard_Real): void;
  static SameParameter_2(theEdge: TopoDS_Edge, theTolerance: Standard_Real, theNewTol: Standard_Real, IsUseOldEdge: Standard_Boolean): TopoDS_Edge;
  static SameParameter_3(S: TopoDS_Shape, Tolerance: Standard_Real, forced: Standard_Boolean): void;
  static SameParameter_4(S: TopoDS_Shape, theReshaper: BRepTools_ReShape, Tolerance: Standard_Real, forced: Standard_Boolean): void;
  static UpdateTolerances_1(S: TopoDS_Shape, verifyFaceTolerance: Standard_Boolean): void;
  static UpdateTolerances_2(S: TopoDS_Shape, theReshaper: BRepTools_ReShape, verifyFaceTolerance: Standard_Boolean): void;
  static UpdateInnerTolerances(S: TopoDS_Shape): void;
  static OrientClosedSolid(solid: TopoDS_Solid): Standard_Boolean;
  static ContinuityOfFaces(theEdge: TopoDS_Edge, theFace1: TopoDS_Face, theFace2: TopoDS_Face, theAngleTol: Standard_Real): GeomAbs_Shape;
  static EncodeRegularity_1(S: TopoDS_Shape, TolAng: Standard_Real): void;
  static EncodeRegularity_2(S: TopoDS_Shape, LE: TopTools_ListOfShape, TolAng: Standard_Real): void;
  static EncodeRegularity_3(E: TopoDS_Edge, F1: TopoDS_Face, F2: TopoDS_Face, TolAng: Standard_Real): void;
  static SortFaces(S: TopoDS_Shape, LF: TopTools_ListOfShape): void;
  static ReverseSortFaces(S: TopoDS_Shape, LF: TopTools_ListOfShape): void;
  static EnsureNormalConsistency(S: TopoDS_Shape, theAngTol: Standard_Real, ForceComputeNormals: Standard_Boolean): Standard_Boolean;
  static UpdateDeflection(S: TopoDS_Shape): void;
  static BoundingVertex(theLV: TopTools_ListOfShape, theNewCenter: gp_Pnt, theNewTol: Standard_Real): void;
  static FindValidRange_1(theCurve: Adaptor3d_Curve, theTolE: Standard_Real, theParV1: Standard_Real, thePntV1: gp_Pnt, theTolV1: Standard_Real, theParV2: Standard_Real, thePntV2: gp_Pnt, theTolV2: Standard_Real, theFirst: Standard_Real, theLast: Standard_Real): Standard_Boolean;
  static FindValidRange_2(theEdge: TopoDS_Edge, theFirst: Standard_Real, theLast: Standard_Real): Standard_Boolean;
  static ExtendFace(theF: TopoDS_Face, theExtVal: Standard_Real, theExtUMin: Standard_Boolean, theExtUMax: Standard_Boolean, theExtVMin: Standard_Boolean, theExtVMax: Standard_Boolean, theFExtended: TopoDS_Face): void;
  delete(): void;
}

export declare class BRepGProp {
  constructor();
  static LinearProperties(S: TopoDS_Shape, LProps: GProp_GProps, SkipShared: Standard_Boolean, UseTriangulation: Standard_Boolean): void;
  static SurfaceProperties_1(S: TopoDS_Shape, SProps: GProp_GProps, SkipShared: Standard_Boolean, UseTriangulation: Standard_Boolean): void;
  static SurfaceProperties_2(S: TopoDS_Shape, SProps: GProp_GProps, Eps: Standard_Real, SkipShared: Standard_Boolean): Standard_Real;
  static VolumeProperties_1(S: TopoDS_Shape, VProps: GProp_GProps, OnlyClosed: Standard_Boolean, SkipShared: Standard_Boolean, UseTriangulation: Standard_Boolean): void;
  static VolumeProperties_2(S: TopoDS_Shape, VProps: GProp_GProps, Eps: Standard_Real, OnlyClosed: Standard_Boolean, SkipShared: Standard_Boolean): Standard_Real;
  static VolumePropertiesGK_1(S: TopoDS_Shape, VProps: GProp_GProps, Eps: Standard_Real, OnlyClosed: Standard_Boolean, IsUseSpan: Standard_Boolean, CGFlag: Standard_Boolean, IFlag: Standard_Boolean, SkipShared: Standard_Boolean): Standard_Real;
  static VolumePropertiesGK_2(S: TopoDS_Shape, VProps: GProp_GProps, thePln: gp_Pln, Eps: Standard_Real, OnlyClosed: Standard_Boolean, IsUseSpan: Standard_Boolean, CGFlag: Standard_Boolean, IFlag: Standard_Boolean, SkipShared: Standard_Boolean): Standard_Real;
  delete(): void;
}

export declare class BRepGProp_Face {
  Load_1(F: TopoDS_Face): void;
  VIntegrationOrder(): Standard_Integer;
  NaturalRestriction(): Standard_Boolean;
  GetFace(): TopoDS_Face;
  Value2d(U: Standard_Real): gp_Pnt2d;
  SIntOrder(Eps: Standard_Real): Standard_Integer;
  SVIntSubs(): Standard_Integer;
  SUIntSubs(): Standard_Integer;
  UKnots(Knots: TColStd_Array1OfReal): void;
  VKnots(Knots: TColStd_Array1OfReal): void;
  LIntOrder(Eps: Standard_Real): Standard_Integer;
  LIntSubs(): Standard_Integer;
  LKnots(Knots: TColStd_Array1OfReal): void;
  UIntegrationOrder(): Standard_Integer;
  Bounds(U1: Standard_Real, U2: Standard_Real, V1: Standard_Real, V2: Standard_Real): void;
  Normal(U: Standard_Real, V: Standard_Real, P: gp_Pnt, VNor: gp_Vec): void;
  Load_2(E: TopoDS_Edge): Standard_Boolean;
  FirstParameter(): Standard_Real;
  LastParameter(): Standard_Real;
  IntegrationOrder(): Standard_Integer;
  D12d(U: Standard_Real, P: gp_Pnt2d, V1: gp_Vec2d): void;
  Load_3(IsFirstParam: Standard_Boolean, theIsoType: GeomAbs_IsoType): void;
  GetUKnots(theUMin: Standard_Real, theUMax: Standard_Real, theUKnots: any): void;
  GetTKnots(theTMin: Standard_Real, theTMax: Standard_Real, theTKnots: any): void;
  delete(): void;
}

  export declare class BRepGProp_Face_1 extends BRepGProp_Face {
    constructor(IsUseSpan: Standard_Boolean);
  }

  export declare class BRepGProp_Face_2 extends BRepGProp_Face {
    constructor(F: TopoDS_Face, IsUseSpan: Standard_Boolean);
  }

export declare type ChFi3d_FilletShape = {
  ChFi3d_Rational: {};
  ChFi3d_QuasiAngular: {};
  ChFi3d_Polynomial: {};
}

export declare type ChFiDS_ChamfMode = {
  ChFiDS_ClassicChamfer: {};
  ChFiDS_ConstThroatChamfer: {};
  ChFiDS_ConstThroatWithPenetrationChamfer: {};
}

export declare class BRepFilletAPI_MakeChamfer extends BRepFilletAPI_LocalOperation {
  constructor(S: TopoDS_Shape)
  Add_1(E: TopoDS_Edge): void;
  Add_2(Dis: Standard_Real, E: TopoDS_Edge): void;
  SetDist(Dis: Standard_Real, IC: Standard_Integer, F: TopoDS_Face): void;
  GetDist(IC: Standard_Integer, Dis: Standard_Real): void;
  Add_3(Dis1: Standard_Real, Dis2: Standard_Real, E: TopoDS_Edge, F: TopoDS_Face): void;
  SetDists(Dis1: Standard_Real, Dis2: Standard_Real, IC: Standard_Integer, F: TopoDS_Face): void;
  Dists(IC: Standard_Integer, Dis1: Standard_Real, Dis2: Standard_Real): void;
  AddDA(Dis: Standard_Real, Angle: Standard_Real, E: TopoDS_Edge, F: TopoDS_Face): void;
  SetDistAngle(Dis: Standard_Real, Angle: Standard_Real, IC: Standard_Integer, F: TopoDS_Face): void;
  GetDistAngle(IC: Standard_Integer, Dis: Standard_Real, Angle: Standard_Real): void;
  SetMode(theMode: ChFiDS_ChamfMode): void;
  IsSymetric(IC: Standard_Integer): Standard_Boolean;
  IsTwoDistances(IC: Standard_Integer): Standard_Boolean;
  IsDistanceAngle(IC: Standard_Integer): Standard_Boolean;
  ResetContour(IC: Standard_Integer): void;
  NbContours(): Standard_Integer;
  Contour(E: TopoDS_Edge): Standard_Integer;
  NbEdges(I: Standard_Integer): Standard_Integer;
  Edge(I: Standard_Integer, J: Standard_Integer): TopoDS_Edge;
  Remove(E: TopoDS_Edge): void;
  Length(IC: Standard_Integer): Standard_Real;
  FirstVertex(IC: Standard_Integer): TopoDS_Vertex;
  LastVertex(IC: Standard_Integer): TopoDS_Vertex;
  Abscissa(IC: Standard_Integer, V: TopoDS_Vertex): Standard_Real;
  RelativeAbscissa(IC: Standard_Integer, V: TopoDS_Vertex): Standard_Real;
  ClosedAndTangent(IC: Standard_Integer): Standard_Boolean;
  Closed(IC: Standard_Integer): Standard_Boolean;
  Build(theRange: Message_ProgressRange): void;
  Reset(): void;
  Builder(): any;
  Generated(EorV: TopoDS_Shape): TopTools_ListOfShape;
  Modified(F: TopoDS_Shape): TopTools_ListOfShape;
  IsDeleted(F: TopoDS_Shape): Standard_Boolean;
  Simulate(IC: Standard_Integer): void;
  NbSurf(IC: Standard_Integer): Standard_Integer;
  Sect(IC: Standard_Integer, IS: Standard_Integer): any;
  delete(): void;
}

export declare class BRepFilletAPI_MakeFillet extends BRepFilletAPI_LocalOperation {
  constructor(S: TopoDS_Shape, FShape: ChFi3d_FilletShape)
  SetParams(Tang: Standard_Real, Tesp: Standard_Real, T2d: Standard_Real, TApp3d: Standard_Real, TolApp2d: Standard_Real, Fleche: Standard_Real): void;
  SetContinuity(InternalContinuity: GeomAbs_Shape, AngularTolerance: Standard_Real): void;
  Add_1(E: TopoDS_Edge): void;
  Add_2(Radius: Standard_Real, E: TopoDS_Edge): void;
  Add_3(R1: Standard_Real, R2: Standard_Real, E: TopoDS_Edge): void;
  Add_4(L: any, E: TopoDS_Edge): void;
  Add_5(UandR: TColgp_Array1OfPnt2d, E: TopoDS_Edge): void;
  SetRadius_1(Radius: Standard_Real, IC: Standard_Integer, IinC: Standard_Integer): void;
  SetRadius_2(R1: Standard_Real, R2: Standard_Real, IC: Standard_Integer, IinC: Standard_Integer): void;
  SetRadius_3(L: any, IC: Standard_Integer, IinC: Standard_Integer): void;
  SetRadius_4(UandR: TColgp_Array1OfPnt2d, IC: Standard_Integer, IinC: Standard_Integer): void;
  ResetContour(IC: Standard_Integer): void;
  IsConstant_1(IC: Standard_Integer): Standard_Boolean;
  Radius_1(IC: Standard_Integer): Standard_Real;
  IsConstant_2(IC: Standard_Integer, E: TopoDS_Edge): Standard_Boolean;
  Radius_2(IC: Standard_Integer, E: TopoDS_Edge): Standard_Real;
  SetRadius_5(Radius: Standard_Real, IC: Standard_Integer, E: TopoDS_Edge): void;
  SetRadius_6(Radius: Standard_Real, IC: Standard_Integer, V: TopoDS_Vertex): void;
  GetBounds(IC: Standard_Integer, E: TopoDS_Edge, F: Standard_Real, L: Standard_Real): Standard_Boolean;
  GetLaw(IC: Standard_Integer, E: TopoDS_Edge): any;
  SetLaw(IC: Standard_Integer, E: TopoDS_Edge, L: any): void;
  SetFilletShape(FShape: ChFi3d_FilletShape): void;
  GetFilletShape(): ChFi3d_FilletShape;
  NbContours(): Standard_Integer;
  Contour(E: TopoDS_Edge): Standard_Integer;
  NbEdges(I: Standard_Integer): Standard_Integer;
  Edge(I: Standard_Integer, J: Standard_Integer): TopoDS_Edge;
  Remove(E: TopoDS_Edge): void;
  Length(IC: Standard_Integer): Standard_Real;
  FirstVertex(IC: Standard_Integer): TopoDS_Vertex;
  LastVertex(IC: Standard_Integer): TopoDS_Vertex;
  Abscissa(IC: Standard_Integer, V: TopoDS_Vertex): Standard_Real;
  RelativeAbscissa(IC: Standard_Integer, V: TopoDS_Vertex): Standard_Real;
  ClosedAndTangent(IC: Standard_Integer): Standard_Boolean;
  Closed(IC: Standard_Integer): Standard_Boolean;
  Build(theRange: Message_ProgressRange): void;
  Reset(): void;
  Builder(): any;
  Generated(EorV: TopoDS_Shape): TopTools_ListOfShape;
  Modified(F: TopoDS_Shape): TopTools_ListOfShape;
  IsDeleted(F: TopoDS_Shape): Standard_Boolean;
  NbSurfaces(): Standard_Integer;
  NewFaces(I: Standard_Integer): TopTools_ListOfShape;
  Simulate(IC: Standard_Integer): void;
  NbSurf(IC: Standard_Integer): Standard_Integer;
  Sect(IC: Standard_Integer, IS: Standard_Integer): any;
  NbFaultyContours(): Standard_Integer;
  FaultyContour(I: Standard_Integer): Standard_Integer;
  NbComputedSurfaces(IC: Standard_Integer): Standard_Integer;
  ComputedSurface(IC: Standard_Integer, IS: Standard_Integer): any;
  NbFaultyVertices(): Standard_Integer;
  FaultyVertex(IV: Standard_Integer): TopoDS_Vertex;
  HasResult(): Standard_Boolean;
  BadShape(): TopoDS_Shape;
  StripeStatus(IC: Standard_Integer): ChFiDS_ErrorStatus;
  delete(): void;
}

export declare class BRepFilletAPI_LocalOperation extends BRepBuilderAPI_MakeShape {
  Add(E: TopoDS_Edge): void;
  ResetContour(IC: Standard_Integer): void;
  NbContours(): Standard_Integer;
  Contour(E: TopoDS_Edge): Standard_Integer;
  NbEdges(I: Standard_Integer): Standard_Integer;
  Edge(I: Standard_Integer, J: Standard_Integer): TopoDS_Edge;
  Remove(E: TopoDS_Edge): void;
  Length(IC: Standard_Integer): Standard_Real;
  FirstVertex(IC: Standard_Integer): TopoDS_Vertex;
  LastVertex(IC: Standard_Integer): TopoDS_Vertex;
  Abscissa(IC: Standard_Integer, V: TopoDS_Vertex): Standard_Real;
  RelativeAbscissa(IC: Standard_Integer, V: TopoDS_Vertex): Standard_Real;
  ClosedAndTangent(IC: Standard_Integer): Standard_Boolean;
  Closed(IC: Standard_Integer): Standard_Boolean;
  Reset(): void;
  Simulate(IC: Standard_Integer): void;
  NbSurf(IC: Standard_Integer): Standard_Integer;
  Sect(IC: Standard_Integer, IS: Standard_Integer): any;
  delete(): void;
}

export declare class ShapeFix_Wire extends ShapeFix_Root {
  ClearModes(): void;
  ClearStatuses(): void;
  Init_1(wire: TopoDS_Wire, face: TopoDS_Face, prec: Standard_Real): void;
  Init_2(saw: any): void;
  Load_1(wire: TopoDS_Wire): void;
  Load_2(sbwd: any): void;
  SetFace_1(face: TopoDS_Face): void;
  SetFace_2(theFace: TopoDS_Face, theSurfaceAnalysis: any): void;
  SetSurface_1(theSurfaceAnalysis: any): void;
  SetSurface_2(surf: any): void;
  SetSurface_3(surf: any, loc: TopLoc_Location): void;
  SetPrecision(prec: Standard_Real): void;
  SetMaxTailAngle(theMaxTailAngle: Standard_Real): void;
  SetMaxTailWidth(theMaxTailWidth: Standard_Real): void;
  IsLoaded(): Standard_Boolean;
  IsReady(): Standard_Boolean;
  NbEdges(): Standard_Integer;
  Wire(): TopoDS_Wire;
  WireAPIMake(): TopoDS_Wire;
  Analyzer(): any;
  WireData(): any;
  Face(): TopoDS_Face;
  ModifyTopologyMode(): Standard_Boolean;
  ModifyGeometryMode(): Standard_Boolean;
  ModifyRemoveLoopMode(): Standard_Integer;
  ClosedWireMode(): Standard_Boolean;
  PreferencePCurveMode(): Standard_Boolean;
  FixGapsByRangesMode(): Standard_Boolean;
  FixReorderMode(): Standard_Integer;
  FixSmallMode(): Standard_Integer;
  FixConnectedMode(): Standard_Integer;
  FixEdgeCurvesMode(): Standard_Integer;
  FixDegeneratedMode(): Standard_Integer;
  FixSelfIntersectionMode(): Standard_Integer;
  FixLackingMode(): Standard_Integer;
  FixGaps3dMode(): Standard_Integer;
  FixGaps2dMode(): Standard_Integer;
  FixReversed2dMode(): Standard_Integer;
  FixRemovePCurveMode(): Standard_Integer;
  FixAddPCurveMode(): Standard_Integer;
  FixRemoveCurve3dMode(): Standard_Integer;
  FixAddCurve3dMode(): Standard_Integer;
  FixSeamMode(): Standard_Integer;
  FixShiftedMode(): Standard_Integer;
  FixSameParameterMode(): Standard_Integer;
  FixVertexToleranceMode(): Standard_Integer;
  FixNotchedEdgesMode(): Standard_Integer;
  FixSelfIntersectingEdgeMode(): Standard_Integer;
  FixIntersectingEdgesMode(): Standard_Integer;
  FixNonAdjacentIntersectingEdgesMode(): Standard_Integer;
  FixTailMode(): Standard_Integer;
  Perform(): Standard_Boolean;
  FixReorder_1(theModeBoth: Standard_Boolean): Standard_Boolean;
  FixSmall_1(lockvtx: Standard_Boolean, precsmall: Standard_Real): Standard_Integer;
  FixConnected_1(prec: Standard_Real): Standard_Boolean;
  FixEdgeCurves(): Standard_Boolean;
  FixDegenerated_1(): Standard_Boolean;
  FixSelfIntersection(): Standard_Boolean;
  FixLacking_1(force: Standard_Boolean): Standard_Boolean;
  FixClosed(prec: Standard_Real): Standard_Boolean;
  FixGaps3d(): Standard_Boolean;
  FixGaps2d(): Standard_Boolean;
  FixReorder_2(wi: ShapeAnalysis_WireOrder): Standard_Boolean;
  FixSmall_2(num: Standard_Integer, lockvtx: Standard_Boolean, precsmall: Standard_Real): Standard_Boolean;
  FixConnected_2(num: Standard_Integer, prec: Standard_Real): Standard_Boolean;
  FixSeam(num: Standard_Integer): Standard_Boolean;
  FixShifted(): Standard_Boolean;
  FixDegenerated_2(num: Standard_Integer): Standard_Boolean;
  FixLacking_2(num: Standard_Integer, force: Standard_Boolean): Standard_Boolean;
  FixNotchedEdges(): Standard_Boolean;
  FixGap3d(num: Standard_Integer, convert: Standard_Boolean): Standard_Boolean;
  FixGap2d(num: Standard_Integer, convert: Standard_Boolean): Standard_Boolean;
  FixTails(): Standard_Boolean;
  StatusReorder(status: ShapeExtend_Status): Standard_Boolean;
  StatusSmall(status: ShapeExtend_Status): Standard_Boolean;
  StatusConnected(status: ShapeExtend_Status): Standard_Boolean;
  StatusEdgeCurves(status: ShapeExtend_Status): Standard_Boolean;
  StatusDegenerated(status: ShapeExtend_Status): Standard_Boolean;
  StatusSelfIntersection(status: ShapeExtend_Status): Standard_Boolean;
  StatusLacking(status: ShapeExtend_Status): Standard_Boolean;
  StatusClosed(status: ShapeExtend_Status): Standard_Boolean;
  StatusGaps3d(status: ShapeExtend_Status): Standard_Boolean;
  StatusGaps2d(status: ShapeExtend_Status): Standard_Boolean;
  StatusNotches(status: ShapeExtend_Status): Standard_Boolean;
  StatusRemovedSegment(): Standard_Boolean;
  StatusFixTails(status: ShapeExtend_Status): Standard_Boolean;
  LastFixStatus(status: ShapeExtend_Status): Standard_Boolean;
  FixEdgeTool(): any;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): any;
  DynamicType(): any;
  delete(): void;
}

  export declare class ShapeFix_Wire_1 extends ShapeFix_Wire {
    constructor();
  }

  export declare class ShapeFix_Wire_2 extends ShapeFix_Wire {
    constructor(wire: TopoDS_Wire, face: TopoDS_Face, prec: Standard_Real);
  }

export declare class ShapeFix_Solid extends ShapeFix_Root {
  Init(solid: TopoDS_Solid): void;
  Perform(theProgress: Message_ProgressRange): Standard_Boolean;
  SolidFromShell(shell: TopoDS_Shell): TopoDS_Solid;
  Status(status: ShapeExtend_Status): Standard_Boolean;
  Solid(): TopoDS_Shape;
  FixShellTool(): any;
  SetMsgRegistrator(msgreg: any): void;
  SetPrecision(preci: Standard_Real): void;
  SetMinTolerance(mintol: Standard_Real): void;
  SetMaxTolerance(maxtol: Standard_Real): void;
  FixShellMode(): Standard_Integer;
  FixShellOrientationMode(): Standard_Integer;
  CreateOpenSolidMode(): Standard_Boolean;
  Shape(): TopoDS_Shape;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): any;
  DynamicType(): any;
  delete(): void;
}

  export declare class ShapeFix_Solid_1 extends ShapeFix_Solid {
    constructor();
  }

  export declare class ShapeFix_Solid_2 extends ShapeFix_Solid {
    constructor(solid: TopoDS_Solid);
  }

export declare class ShapeFix_Root extends Standard_Transient {
  constructor()
  Set(Root: any): void;
  SetContext(context: any): void;
  Context(): any;
  SetMsgRegistrator(msgreg: any): void;
  MsgRegistrator(): any;
  SetPrecision(preci: Standard_Real): void;
  Precision(): Standard_Real;
  SetMinTolerance(mintol: Standard_Real): void;
  MinTolerance(): Standard_Real;
  SetMaxTolerance(maxtol: Standard_Real): void;
  MaxTolerance(): Standard_Real;
  LimitTolerance(toler: Standard_Real): Standard_Real;
  SendMsg_1(shape: TopoDS_Shape, message: Message_Msg, gravity: Message_Gravity): void;
  SendMsg_2(message: Message_Msg, gravity: Message_Gravity): void;
  SendWarning_1(shape: TopoDS_Shape, message: Message_Msg): void;
  SendWarning_2(message: Message_Msg): void;
  SendFail_1(shape: TopoDS_Shape, message: Message_Msg): void;
  SendFail_2(message: Message_Msg): void;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): any;
  DynamicType(): any;
  delete(): void;
}

export declare class ShapeFix_Face extends ShapeFix_Root {
  ClearModes(): void;
  Init_1(face: TopoDS_Face): void;
  Init_2(surf: any, preci: Standard_Real, fwd: Standard_Boolean): void;
  Init_3(surf: any, preci: Standard_Real, fwd: Standard_Boolean): void;
  SetMsgRegistrator(msgreg: any): void;
  SetPrecision(preci: Standard_Real): void;
  SetMinTolerance(mintol: Standard_Real): void;
  SetMaxTolerance(maxtol: Standard_Real): void;
  FixWireMode(): Standard_Integer;
  FixOrientationMode(): Standard_Integer;
  FixAddNaturalBoundMode(): Standard_Integer;
  FixMissingSeamMode(): Standard_Integer;
  FixSmallAreaWireMode(): Standard_Integer;
  RemoveSmallAreaFaceMode(): Standard_Integer;
  FixIntersectingWiresMode(): Standard_Integer;
  FixLoopWiresMode(): Standard_Integer;
  FixSplitFaceMode(): Standard_Integer;
  AutoCorrectPrecisionMode(): Standard_Integer;
  FixPeriodicDegeneratedMode(): Standard_Integer;
  Face(): TopoDS_Face;
  Result(): TopoDS_Shape;
  Add(wire: TopoDS_Wire): void;
  Perform(): Standard_Boolean;
  FixOrientation_1(): Standard_Boolean;
  FixOrientation_2(MapWires: NCollection_DataMap<TopoDS_Shape, NCollection_List<TopoDS_Shape>, TopTools_ShapeMapHasher>): Standard_Boolean;
  FixAddNaturalBound(): Standard_Boolean;
  FixMissingSeam(): Standard_Boolean;
  FixSmallAreaWire(theIsRemoveSmallFace: Standard_Boolean): Standard_Boolean;
  FixLoopWire(aResWires: TopTools_SequenceOfShape): Standard_Boolean;
  FixIntersectingWires(): Standard_Boolean;
  FixWiresTwoCoincEdges(): Standard_Boolean;
  FixSplitFace(MapWires: NCollection_DataMap<TopoDS_Shape, NCollection_List<TopoDS_Shape>, TopTools_ShapeMapHasher>): Standard_Boolean;
  FixPeriodicDegenerated(): Standard_Boolean;
  Status(status: ShapeExtend_Status): Standard_Boolean;
  FixWireTool(): any;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): any;
  DynamicType(): any;
  delete(): void;
}

  export declare class ShapeFix_Face_1 extends ShapeFix_Face {
    constructor();
  }

  export declare class ShapeFix_Face_2 extends ShapeFix_Face {
    constructor(face: TopoDS_Face);
  }

export declare class ShapeUpgrade_UnifySameDomain extends Standard_Transient {
  Initialize(aShape: TopoDS_Shape, UnifyEdges: Standard_Boolean, UnifyFaces: Standard_Boolean, ConcatBSplines: Standard_Boolean): void;
  AllowInternalEdges(theValue: Standard_Boolean): void;
  KeepShape(theShape: TopoDS_Shape): void;
  KeepShapes(theShapes: TopTools_MapOfShape): void;
  SetSafeInputMode(theValue: Standard_Boolean): void;
  SetLinearTolerance(theValue: Standard_Real): void;
  SetAngularTolerance(theValue: Standard_Real): void;
  Build(): void;
  Shape(): TopoDS_Shape;
  History_1(): any;
  History_2(): any;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): any;
  DynamicType(): any;
  delete(): void;
}

  export declare class ShapeUpgrade_UnifySameDomain_1 extends ShapeUpgrade_UnifySameDomain {
    constructor();
  }

  export declare class ShapeUpgrade_UnifySameDomain_2 extends ShapeUpgrade_UnifySameDomain {
    constructor(aShape: TopoDS_Shape, UnifyEdges: Standard_Boolean, UnifyFaces: Standard_Boolean, ConcatBSplines: Standard_Boolean);
  }

export declare class BRepFeat_Form extends BRepBuilderAPI_MakeShape {
  Modified(F: TopoDS_Shape): TopTools_ListOfShape;
  Generated(S: TopoDS_Shape): TopTools_ListOfShape;
  IsDeleted(S: TopoDS_Shape): Standard_Boolean;
  FirstShape(): TopTools_ListOfShape;
  LastShape(): TopTools_ListOfShape;
  NewEdges(): TopTools_ListOfShape;
  TgtEdges(): TopTools_ListOfShape;
  BasisShapeValid(): void;
  GeneratedShapeValid(): void;
  ShapeFromValid(): void;
  ShapeUntilValid(): void;
  GluedFacesValid(): void;
  SketchFaceValid(): void;
  PerfSelectionValid(): void;
  Curves(S: any): void;
  BarycCurve(): any;
  CurrentStatusError(): BRepFeat_StatusError;
  delete(): void;
}

export declare class BRepFeat_MakeDPrism extends BRepFeat_Form {
  Init(Sbase: TopoDS_Shape, Pbase: TopoDS_Face, Skface: TopoDS_Face, Angle: Standard_Real, Fuse: Standard_Integer, Modify: Standard_Boolean): void;
  Add(E: TopoDS_Edge, OnFace: TopoDS_Face): void;
  Perform_1(Height: Standard_Real): void;
  Perform_2(Until: TopoDS_Shape): void;
  Perform_3(From: TopoDS_Shape, Until: TopoDS_Shape): void;
  PerformUntilEnd(): void;
  PerformFromEnd(FUntil: TopoDS_Shape): void;
  PerformThruAll(): void;
  PerformUntilHeight(Until: TopoDS_Shape, Height: Standard_Real): void;
  Curves(S: any): void;
  BarycCurve(): any;
  BossEdges(sig: Standard_Integer): void;
  TopEdges(): TopTools_ListOfShape;
  LatEdges(): TopTools_ListOfShape;
  delete(): void;
}

  export declare class BRepFeat_MakeDPrism_1 extends BRepFeat_MakeDPrism {
    constructor(Sbase: TopoDS_Shape, Pbase: TopoDS_Face, Skface: TopoDS_Face, Angle: Standard_Real, Fuse: Standard_Integer, Modify: Standard_Boolean);
  }

  export declare class BRepFeat_MakeDPrism_2 extends BRepFeat_MakeDPrism {
    constructor();
  }

export declare class Adaptor3d_Curve extends Standard_Transient {
  constructor();
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): any;
  DynamicType(): any;
  ShallowCopy(): any;
  FirstParameter(): Standard_Real;
  LastParameter(): Standard_Real;
  Continuity(): GeomAbs_Shape;
  NbIntervals(S: GeomAbs_Shape): Standard_Integer;
  Intervals(T: TColStd_Array1OfReal, S: GeomAbs_Shape): void;
  Trim(First: Standard_Real, Last: Standard_Real, Tol: Standard_Real): any;
  IsClosed(): Standard_Boolean;
  IsPeriodic(): Standard_Boolean;
  Period(): Standard_Real;
  Value(U: Standard_Real): gp_Pnt;
  D0(U: Standard_Real, P: gp_Pnt): void;
  D1(U: Standard_Real, P: gp_Pnt, V: gp_Vec): void;
  D2(U: Standard_Real, P: gp_Pnt, V1: gp_Vec, V2: gp_Vec): void;
  D3(U: Standard_Real, P: gp_Pnt, V1: gp_Vec, V2: gp_Vec, V3: gp_Vec): void;
  DN(U: Standard_Real, N: Standard_Integer): gp_Vec;
  Resolution(R3d: Standard_Real): Standard_Real;
  GetType(): GeomAbs_CurveType;
  Line(): gp_Lin;
  Circle(): gp_Circ;
  Ellipse(): gp_Elips;
  Hyperbola(): gp_Hypr;
  Parabola(): gp_Parab;
  Degree(): Standard_Integer;
  IsRational(): Standard_Boolean;
  NbPoles(): Standard_Integer;
  NbKnots(): Standard_Integer;
  Bezier(): any;
  BSpline(): any;
  OffsetCurve(): any;
  EvalD0(U: Standard_Real): gp_Pnt;
  EvalD1(U: Standard_Real): any;
  EvalD2(U: Standard_Real): any;
  EvalD3(U: Standard_Real): any;
  EvalDN(U: Standard_Real, N: Standard_Integer): gp_Vec;
  delete(): void;
}

export declare class Adaptor3d_Surface extends Standard_Transient {
  constructor();
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): any;
  DynamicType(): any;
  ShallowCopy(): any;
  FirstUParameter(): Standard_Real;
  LastUParameter(): Standard_Real;
  FirstVParameter(): Standard_Real;
  LastVParameter(): Standard_Real;
  UContinuity(): GeomAbs_Shape;
  VContinuity(): GeomAbs_Shape;
  NbUIntervals(S: GeomAbs_Shape): Standard_Integer;
  NbVIntervals(S: GeomAbs_Shape): Standard_Integer;
  UIntervals(T: TColStd_Array1OfReal, S: GeomAbs_Shape): void;
  VIntervals(T: TColStd_Array1OfReal, S: GeomAbs_Shape): void;
  UTrim(First: Standard_Real, Last: Standard_Real, Tol: Standard_Real): any;
  VTrim(First: Standard_Real, Last: Standard_Real, Tol: Standard_Real): any;
  IsUClosed(): Standard_Boolean;
  IsVClosed(): Standard_Boolean;
  IsUPeriodic(): Standard_Boolean;
  UPeriod(): Standard_Real;
  IsVPeriodic(): Standard_Boolean;
  VPeriod(): Standard_Real;
  Value(U: Standard_Real, V: Standard_Real): gp_Pnt;
  D0(U: Standard_Real, V: Standard_Real, P: gp_Pnt): void;
  D1(U: Standard_Real, V: Standard_Real, P: gp_Pnt, D1U: gp_Vec, D1V: gp_Vec): void;
  D2(U: Standard_Real, V: Standard_Real, P: gp_Pnt, D1U: gp_Vec, D1V: gp_Vec, D2U: gp_Vec, D2V: gp_Vec, D2UV: gp_Vec): void;
  D3(U: Standard_Real, V: Standard_Real, P: gp_Pnt, D1U: gp_Vec, D1V: gp_Vec, D2U: gp_Vec, D2V: gp_Vec, D2UV: gp_Vec, D3U: gp_Vec, D3V: gp_Vec, D3UUV: gp_Vec, D3UVV: gp_Vec): void;
  DN(U: Standard_Real, V: Standard_Real, Nu: Standard_Integer, Nv: Standard_Integer): gp_Vec;
  UResolution(R3d: Standard_Real): Standard_Real;
  VResolution(R3d: Standard_Real): Standard_Real;
  GetType(): GeomAbs_SurfaceType;
  Plane(): gp_Pln;
  Cylinder(): gp_Cylinder;
  Cone(): gp_Cone;
  Sphere(): gp_Sphere;
  Torus(): gp_Torus;
  UDegree(): Standard_Integer;
  NbUPoles(): Standard_Integer;
  VDegree(): Standard_Integer;
  NbVPoles(): Standard_Integer;
  NbUKnots(): Standard_Integer;
  NbVKnots(): Standard_Integer;
  IsURational(): Standard_Boolean;
  IsVRational(): Standard_Boolean;
  Bezier(): any;
  BSpline(): any;
  AxeOfRevolution(): gp_Ax1;
  Direction(): gp_Dir;
  BasisCurve(): any;
  BasisSurface(): any;
  OffsetValue(): Standard_Real;
  EvalD0(U: Standard_Real, V: Standard_Real): gp_Pnt;
  EvalD1(U: Standard_Real, V: Standard_Real): any;
  EvalD2(U: Standard_Real, V: Standard_Real): any;
  EvalD3(U: Standard_Real, V: Standard_Real): any;
  EvalDN(U: Standard_Real, V: Standard_Real, Nu: Standard_Integer, Nv: Standard_Integer): gp_Vec;
  delete(): void;
}

export declare class GeomAdaptor_TransformedSurface extends Adaptor3d_Surface {
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): any;
  DynamicType(): any;
  ShallowCopy(): any;
  Load_1(theSurface: any): void;
  Load_2(theSurface: any, theUFirst: Standard_Real, theULast: Standard_Real, theVFirst: Standard_Real, theVLast: Standard_Real, theTolU: Standard_Real, theTolV: Standard_Real): void;
  SetTrsf(theTrsf: gp_Trsf): void;
  Trsf(): gp_Trsf;
  Surface(): GeomAdaptor_Surface;
  ChangeSurface(): GeomAdaptor_Surface;
  GeomSurface(): any;
  FirstUParameter(): Standard_Real;
  LastUParameter(): Standard_Real;
  FirstVParameter(): Standard_Real;
  LastVParameter(): Standard_Real;
  UContinuity(): GeomAbs_Shape;
  VContinuity(): GeomAbs_Shape;
  NbUIntervals(theS: GeomAbs_Shape): Standard_Integer;
  NbVIntervals(theS: GeomAbs_Shape): Standard_Integer;
  UIntervals(theT: TColStd_Array1OfReal, theS: GeomAbs_Shape): void;
  VIntervals(theT: TColStd_Array1OfReal, theS: GeomAbs_Shape): void;
  UTrim(theFirst: Standard_Real, theLast: Standard_Real, theTol: Standard_Real): any;
  VTrim(theFirst: Standard_Real, theLast: Standard_Real, theTol: Standard_Real): any;
  IsUClosed(): Standard_Boolean;
  IsVClosed(): Standard_Boolean;
  IsUPeriodic(): Standard_Boolean;
  UPeriod(): Standard_Real;
  IsVPeriodic(): Standard_Boolean;
  VPeriod(): Standard_Real;
  Value(theU: Standard_Real, theV: Standard_Real): gp_Pnt;
  D0(theU: Standard_Real, theV: Standard_Real, theP: gp_Pnt): void;
  D1(theU: Standard_Real, theV: Standard_Real, theP: gp_Pnt, theD1U: gp_Vec, theD1V: gp_Vec): void;
  D2(theU: Standard_Real, theV: Standard_Real, theP: gp_Pnt, theD1U: gp_Vec, theD1V: gp_Vec, theD2U: gp_Vec, theD2V: gp_Vec, theD2UV: gp_Vec): void;
  D3(theU: Standard_Real, theV: Standard_Real, theP: gp_Pnt, theD1U: gp_Vec, theD1V: gp_Vec, theD2U: gp_Vec, theD2V: gp_Vec, theD2UV: gp_Vec, theD3U: gp_Vec, theD3V: gp_Vec, theD3UUV: gp_Vec, theD3UVV: gp_Vec): void;
  DN(theU: Standard_Real, theV: Standard_Real, theNu: Standard_Integer, theNv: Standard_Integer): gp_Vec;
  UResolution(theR3d: Standard_Real): Standard_Real;
  VResolution(theR3d: Standard_Real): Standard_Real;
  GetType(): GeomAbs_SurfaceType;
  Plane(): gp_Pln;
  Cylinder(): gp_Cylinder;
  Cone(): gp_Cone;
  Sphere(): gp_Sphere;
  Torus(): gp_Torus;
  UDegree(): Standard_Integer;
  NbUPoles(): Standard_Integer;
  VDegree(): Standard_Integer;
  NbVPoles(): Standard_Integer;
  NbUKnots(): Standard_Integer;
  NbVKnots(): Standard_Integer;
  IsURational(): Standard_Boolean;
  IsVRational(): Standard_Boolean;
  Bezier(): any;
  BSpline(): any;
  AxeOfRevolution(): gp_Ax1;
  Direction(): gp_Dir;
  BasisCurve(): any;
  BasisSurface(): any;
  OffsetValue(): Standard_Real;
  delete(): void;
}

  export declare class GeomAdaptor_TransformedSurface_1 extends GeomAdaptor_TransformedSurface {
    constructor();
  }

  export declare class GeomAdaptor_TransformedSurface_2 extends GeomAdaptor_TransformedSurface {
    constructor(theSurface: any, theTrsf: gp_Trsf);
  }

  export declare class GeomAdaptor_TransformedSurface_3 extends GeomAdaptor_TransformedSurface {
    constructor(theSurface: any, theUFirst: Standard_Real, theULast: Standard_Real, theVFirst: Standard_Real, theVLast: Standard_Real, theTrsf: gp_Trsf, theTolU: Standard_Real, theTolV: Standard_Real);
  }

export declare type TopAbs_ShapeEnum = {
  TopAbs_COMPOUND: {};
  TopAbs_COMPSOLID: {};
  TopAbs_SOLID: {};
  TopAbs_SHELL: {};
  TopAbs_FACE: {};
  TopAbs_WIRE: {};
  TopAbs_EDGE: {};
  TopAbs_VERTEX: {};
  TopAbs_SHAPE: {};
}

export declare type TopAbs_Orientation = {
  TopAbs_FORWARD: {};
  TopAbs_REVERSED: {};
  TopAbs_INTERNAL: {};
  TopAbs_EXTERNAL: {};
}

export declare class Geom_TrimmedCurve extends Geom_BoundedCurve {
  constructor(C: any, U1: Standard_Real, U2: Standard_Real, Sense: Standard_Boolean, theAdjustPeriodic: Standard_Boolean)
  Reverse(): void;
  ReversedParameter(U: Standard_Real): Standard_Real;
  SetTrim(U1: Standard_Real, U2: Standard_Real, Sense: Standard_Boolean, theAdjustPeriodic: Standard_Boolean): void;
  BasisCurve(): any;
  Continuity(): GeomAbs_Shape;
  IsCN(N: Standard_Integer): Standard_Boolean;
  EndPoint(): gp_Pnt;
  FirstParameter(): Standard_Real;
  IsClosed(): Standard_Boolean;
  IsPeriodic(): Standard_Boolean;
  Period(): Standard_Real;
  LastParameter(): Standard_Real;
  StartPoint(): gp_Pnt;
  EvalD0(U: Standard_Real): gp_Pnt;
  EvalD1(U: Standard_Real): any;
  EvalD2(U: Standard_Real): any;
  EvalD3(U: Standard_Real): any;
  EvalDN(U: Standard_Real, N: Standard_Integer): gp_Vec;
  Transform(T: gp_Trsf): void;
  TransformedParameter(U: Standard_Real, T: gp_Trsf): Standard_Real;
  ParametricTransformation(T: gp_Trsf): Standard_Real;
  Copy(): any;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): any;
  DynamicType(): any;
  delete(): void;
}

export declare class Geom_BoundedCurve extends Geom_Curve {
  EndPoint(): gp_Pnt;
  StartPoint(): gp_Pnt;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): any;
  DynamicType(): any;
  delete(): void;
}

export declare class Geom_BSplineSurface extends Geom_BoundedSurface {
  HasEvalRepresentation(): Standard_Boolean;
  EvalRepresentation(): any;
  SetEvalRepresentation(theDesc: any): void;
  ClearEvalRepresentation(): void;
  ExchangeUV(): void;
  SetUPeriodic(): void;
  SetVPeriodic(): void;
  PeriodicNormalization(U: Standard_Real, V: Standard_Real): void;
  SetUOrigin(Index: Standard_Integer): void;
  SetVOrigin(Index: Standard_Integer): void;
  SetUNotPeriodic(): void;
  SetVNotPeriodic(): void;
  UReverse(): void;
  VReverse(): void;
  UReversedParameter(U: Standard_Real): Standard_Real;
  VReversedParameter(V: Standard_Real): Standard_Real;
  IncreaseDegree(UDegree: Standard_Integer, VDegree: Standard_Integer): void;
  InsertUKnots(Knots: TColStd_Array1OfReal, Mults: TColStd_Array1OfInteger, ParametricTolerance: Standard_Real, Add: Standard_Boolean): void;
  InsertVKnots(Knots: TColStd_Array1OfReal, Mults: TColStd_Array1OfInteger, ParametricTolerance: Standard_Real, Add: Standard_Boolean): void;
  RemoveUKnot(Index: Standard_Integer, M: Standard_Integer, Tolerance: Standard_Real): Standard_Boolean;
  RemoveVKnot(Index: Standard_Integer, M: Standard_Integer, Tolerance: Standard_Real): Standard_Boolean;
  IncreaseUMultiplicity_1(UIndex: Standard_Integer, M: Standard_Integer): void;
  IncreaseUMultiplicity_2(FromI1: Standard_Integer, ToI2: Standard_Integer, M: Standard_Integer): void;
  IncrementUMultiplicity(FromI1: Standard_Integer, ToI2: Standard_Integer, Step: Standard_Integer): void;
  IncreaseVMultiplicity_1(VIndex: Standard_Integer, M: Standard_Integer): void;
  IncreaseVMultiplicity_2(FromI1: Standard_Integer, ToI2: Standard_Integer, M: Standard_Integer): void;
  IncrementVMultiplicity(FromI1: Standard_Integer, ToI2: Standard_Integer, Step: Standard_Integer): void;
  InsertUKnot(U: Standard_Real, M: Standard_Integer, ParametricTolerance: Standard_Real, Add: Standard_Boolean): void;
  InsertVKnot(V: Standard_Real, M: Standard_Integer, ParametricTolerance: Standard_Real, Add: Standard_Boolean): void;
  Segment(U1: Standard_Real, U2: Standard_Real, V1: Standard_Real, V2: Standard_Real, theUTolerance: Standard_Real, theVTolerance: Standard_Real): void;
  CheckAndSegment(U1: Standard_Real, U2: Standard_Real, V1: Standard_Real, V2: Standard_Real, theUTolerance: Standard_Real, theVTolerance: Standard_Real): void;
  SetUKnot_1(UIndex: Standard_Integer, K: Standard_Real): void;
  SetUKnots(UK: TColStd_Array1OfReal): void;
  SetUKnot_2(UIndex: Standard_Integer, K: Standard_Real, M: Standard_Integer): void;
  SetVKnot_1(VIndex: Standard_Integer, K: Standard_Real): void;
  SetVKnots(VK: TColStd_Array1OfReal): void;
  SetVKnot_2(VIndex: Standard_Integer, K: Standard_Real, M: Standard_Integer): void;
  LocateU(U: Standard_Real, ParametricTolerance: Standard_Real, I1: Standard_Integer, I2: Standard_Integer, WithKnotRepetition: Standard_Boolean): void;
  LocateV(V: Standard_Real, ParametricTolerance: Standard_Real, I1: Standard_Integer, I2: Standard_Integer, WithKnotRepetition: Standard_Boolean): void;
  SetPole_1(UIndex: Standard_Integer, VIndex: Standard_Integer, P: gp_Pnt): void;
  SetPole_2(UIndex: Standard_Integer, VIndex: Standard_Integer, P: gp_Pnt, Weight: Standard_Real): void;
  SetPoleCol_1(VIndex: Standard_Integer, CPoles: TColgp_Array1OfPnt): void;
  SetPoleCol_2(VIndex: Standard_Integer, CPoles: TColgp_Array1OfPnt, CPoleWeights: TColStd_Array1OfReal): void;
  SetPoleRow_1(UIndex: Standard_Integer, CPoles: TColgp_Array1OfPnt, CPoleWeights: TColStd_Array1OfReal): void;
  SetPoleRow_2(UIndex: Standard_Integer, CPoles: TColgp_Array1OfPnt): void;
  SetWeight(UIndex: Standard_Integer, VIndex: Standard_Integer, Weight: Standard_Real): void;
  SetWeightCol(VIndex: Standard_Integer, CPoleWeights: TColStd_Array1OfReal): void;
  SetWeightRow(UIndex: Standard_Integer, CPoleWeights: TColStd_Array1OfReal): void;
  MovePoint(U: Standard_Real, V: Standard_Real, P: gp_Pnt, UIndex1: Standard_Integer, UIndex2: Standard_Integer, VIndex1: Standard_Integer, VIndex2: Standard_Integer, UFirstIndex: Standard_Integer, ULastIndex: Standard_Integer, VFirstIndex: Standard_Integer, VLastIndex: Standard_Integer): void;
  IsUClosed(): Standard_Boolean;
  IsVClosed(): Standard_Boolean;
  IsCNu(N: Standard_Integer): Standard_Boolean;
  IsCNv(N: Standard_Integer): Standard_Boolean;
  IsUPeriodic(): Standard_Boolean;
  IsURational(): Standard_Boolean;
  IsVPeriodic(): Standard_Boolean;
  IsVRational(): Standard_Boolean;
  Bounds(U1: Standard_Real, U2: Standard_Real, V1: Standard_Real, V2: Standard_Real): void;
  Continuity(): GeomAbs_Shape;
  FirstUKnotIndex(): Standard_Integer;
  FirstVKnotIndex(): Standard_Integer;
  LastUKnotIndex(): Standard_Integer;
  LastVKnotIndex(): Standard_Integer;
  NbUKnots(): Standard_Integer;
  NbUPoles(): Standard_Integer;
  NbVKnots(): Standard_Integer;
  NbVPoles(): Standard_Integer;
  Pole(UIndex: Standard_Integer, VIndex: Standard_Integer): gp_Pnt;
  Poles_1(P: TColgp_Array2OfPnt): void;
  Poles_2(): TColgp_Array2OfPnt;
  UDegree(): Standard_Integer;
  UKnot(UIndex: Standard_Integer): Standard_Real;
  UKnotDistribution(): GeomAbs_BSplKnotDistribution;
  UKnots_1(Ku: TColStd_Array1OfReal): void;
  UKnots_2(): TColStd_Array1OfReal;
  UKnotSequence_1(Ku: TColStd_Array1OfReal): void;
  UKnotSequence_2(): TColStd_Array1OfReal;
  UMultiplicity(UIndex: Standard_Integer): Standard_Integer;
  UMultiplicities_1(Mu: TColStd_Array1OfInteger): void;
  UMultiplicities_2(): TColStd_Array1OfInteger;
  VDegree(): Standard_Integer;
  VKnot(VIndex: Standard_Integer): Standard_Real;
  VKnotDistribution(): GeomAbs_BSplKnotDistribution;
  VKnots_1(Kv: TColStd_Array1OfReal): void;
  VKnots_2(): TColStd_Array1OfReal;
  VKnotSequence_1(Kv: TColStd_Array1OfReal): void;
  VKnotSequence_2(): TColStd_Array1OfReal;
  VMultiplicity(VIndex: Standard_Integer): Standard_Integer;
  VMultiplicities_1(Mv: TColStd_Array1OfInteger): void;
  VMultiplicities_2(): TColStd_Array1OfInteger;
  Weight(UIndex: Standard_Integer, VIndex: Standard_Integer): Standard_Real;
  Weights_1(W: TColStd_Array2OfReal): void;
  WeightsArray(): TColStd_Array2OfReal;
  Weights_2(): TColStd_Array2OfReal;
  EvalD0(U: Standard_Real, V: Standard_Real): gp_Pnt;
  EvalD1(U: Standard_Real, V: Standard_Real): any;
  EvalD2(U: Standard_Real, V: Standard_Real): any;
  EvalD3(U: Standard_Real, V: Standard_Real): any;
  EvalDN(U: Standard_Real, V: Standard_Real, Nu: Standard_Integer, Nv: Standard_Integer): gp_Vec;
  LocalD0(U: Standard_Real, V: Standard_Real, FromUK1: Standard_Integer, ToUK2: Standard_Integer, FromVK1: Standard_Integer, ToVK2: Standard_Integer, P: gp_Pnt): void;
  LocalD1(U: Standard_Real, V: Standard_Real, FromUK1: Standard_Integer, ToUK2: Standard_Integer, FromVK1: Standard_Integer, ToVK2: Standard_Integer, P: gp_Pnt, D1U: gp_Vec, D1V: gp_Vec): void;
  LocalD2(U: Standard_Real, V: Standard_Real, FromUK1: Standard_Integer, ToUK2: Standard_Integer, FromVK1: Standard_Integer, ToVK2: Standard_Integer, P: gp_Pnt, D1U: gp_Vec, D1V: gp_Vec, D2U: gp_Vec, D2V: gp_Vec, D2UV: gp_Vec): void;
  LocalD3(U: Standard_Real, V: Standard_Real, FromUK1: Standard_Integer, ToUK2: Standard_Integer, FromVK1: Standard_Integer, ToVK2: Standard_Integer, P: gp_Pnt, D1U: gp_Vec, D1V: gp_Vec, D2U: gp_Vec, D2V: gp_Vec, D2UV: gp_Vec, D3U: gp_Vec, D3V: gp_Vec, D3UUV: gp_Vec, D3UVV: gp_Vec): void;
  LocalDN(U: Standard_Real, V: Standard_Real, FromUK1: Standard_Integer, ToUK2: Standard_Integer, FromVK1: Standard_Integer, ToVK2: Standard_Integer, Nu: Standard_Integer, Nv: Standard_Integer): gp_Vec;
  LocalValue(U: Standard_Real, V: Standard_Real, FromUK1: Standard_Integer, ToUK2: Standard_Integer, FromVK1: Standard_Integer, ToVK2: Standard_Integer): gp_Pnt;
  UIso_1(U: Standard_Real): any;
  VIso_1(V: Standard_Real): any;
  UIso_2(U: Standard_Real, CheckRational: Standard_Boolean): any;
  VIso_2(V: Standard_Real, CheckRational: Standard_Boolean): any;
  Transform(T: gp_Trsf): void;
  static MaxDegree(): Standard_Integer;
  Resolution(Tolerance3D: Standard_Real, UTolerance: Standard_Real, VTolerance: Standard_Real): void;
  Copy(): any;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): any;
  DynamicType(): any;
  delete(): void;
}

  export declare class Geom_BSplineSurface_1 extends Geom_BSplineSurface {
    constructor(Poles: TColgp_Array2OfPnt, UKnots: TColStd_Array1OfReal, VKnots: TColStd_Array1OfReal, UMults: TColStd_Array1OfInteger, VMults: TColStd_Array1OfInteger, UDegree: Standard_Integer, VDegree: Standard_Integer, UPeriodic: Standard_Boolean, VPeriodic: Standard_Boolean);
  }

  export declare class Geom_BSplineSurface_2 extends Geom_BSplineSurface {
    constructor(Poles: TColgp_Array2OfPnt, Weights: TColStd_Array2OfReal, UKnots: TColStd_Array1OfReal, VKnots: TColStd_Array1OfReal, UMults: TColStd_Array1OfInteger, VMults: TColStd_Array1OfInteger, UDegree: Standard_Integer, VDegree: Standard_Integer, UPeriodic: Standard_Boolean, VPeriodic: Standard_Boolean);
  }

  export declare class Geom_BSplineSurface_3 extends Geom_BSplineSurface {
    constructor(theOther: Geom_BSplineSurface);
  }

export declare class Geom_BSplineCurve extends Geom_BoundedCurve {
  HasEvalRepresentation(): Standard_Boolean;
  EvalRepresentation(): any;
  SetEvalRepresentation(theDesc: any): void;
  ClearEvalRepresentation(): void;
  IncreaseDegree(Degree: Standard_Integer): void;
  IncreaseMultiplicity_1(Index: Standard_Integer, M: Standard_Integer): void;
  IncreaseMultiplicity_2(I1: Standard_Integer, I2: Standard_Integer, M: Standard_Integer): void;
  IncrementMultiplicity(I1: Standard_Integer, I2: Standard_Integer, M: Standard_Integer): void;
  InsertKnot(U: Standard_Real, M: Standard_Integer, ParametricTolerance: Standard_Real, Add: Standard_Boolean): void;
  InsertKnots(Knots: TColStd_Array1OfReal, Mults: TColStd_Array1OfInteger, ParametricTolerance: Standard_Real, Add: Standard_Boolean): void;
  RemoveKnot(Index: Standard_Integer, M: Standard_Integer, Tolerance: Standard_Real): Standard_Boolean;
  Reverse(): void;
  ReversedParameter(U: Standard_Real): Standard_Real;
  Segment(U1: Standard_Real, U2: Standard_Real, theTolerance: Standard_Real): void;
  SetKnot_1(Index: Standard_Integer, K: Standard_Real): void;
  SetKnots(K: TColStd_Array1OfReal): void;
  SetKnot_2(Index: Standard_Integer, K: Standard_Real, M: Standard_Integer): void;
  PeriodicNormalization(U: Standard_Real): void;
  SetPeriodic(): void;
  SetOrigin_1(Index: Standard_Integer): void;
  SetOrigin_2(U: Standard_Real, Tol: Standard_Real): void;
  SetNotPeriodic(): void;
  SetPole_1(Index: Standard_Integer, P: gp_Pnt): void;
  SetPole_2(Index: Standard_Integer, P: gp_Pnt, Weight: Standard_Real): void;
  SetWeight(Index: Standard_Integer, Weight: Standard_Real): void;
  MovePoint(U: Standard_Real, P: gp_Pnt, Index1: Standard_Integer, Index2: Standard_Integer, FirstModifiedPole: Standard_Integer, LastModifiedPole: Standard_Integer): void;
  MovePointAndTangent(U: Standard_Real, P: gp_Pnt, Tangent: gp_Vec, Tolerance: Standard_Real, StartingCondition: Standard_Integer, EndingCondition: Standard_Integer, ErrorStatus: Standard_Integer): void;
  IsCN(N: Standard_Integer): Standard_Boolean;
  IsG1(theTf: Standard_Real, theTl: Standard_Real, theAngTol: Standard_Real): Standard_Boolean;
  IsClosed(): Standard_Boolean;
  IsPeriodic(): Standard_Boolean;
  IsRational(): Standard_Boolean;
  Continuity(): GeomAbs_Shape;
  Degree(): Standard_Integer;
  EvalD0(U: Standard_Real): gp_Pnt;
  EvalD1(U: Standard_Real): any;
  EvalD2(U: Standard_Real): any;
  EvalD3(U: Standard_Real): any;
  EvalDN(U: Standard_Real, N: Standard_Integer): gp_Vec;
  LocalValue(U: Standard_Real, FromK1: Standard_Integer, ToK2: Standard_Integer): gp_Pnt;
  LocalD0(U: Standard_Real, FromK1: Standard_Integer, ToK2: Standard_Integer, P: gp_Pnt): void;
  LocalD1(U: Standard_Real, FromK1: Standard_Integer, ToK2: Standard_Integer, P: gp_Pnt, V1: gp_Vec): void;
  LocalD2(U: Standard_Real, FromK1: Standard_Integer, ToK2: Standard_Integer, P: gp_Pnt, V1: gp_Vec, V2: gp_Vec): void;
  LocalD3(U: Standard_Real, FromK1: Standard_Integer, ToK2: Standard_Integer, P: gp_Pnt, V1: gp_Vec, V2: gp_Vec, V3: gp_Vec): void;
  LocalDN(U: Standard_Real, FromK1: Standard_Integer, ToK2: Standard_Integer, N: Standard_Integer): gp_Vec;
  EndPoint(): gp_Pnt;
  FirstUKnotIndex(): Standard_Integer;
  FirstParameter(): Standard_Real;
  Knot(Index: Standard_Integer): Standard_Real;
  Knots_1(K: TColStd_Array1OfReal): void;
  Knots_2(): TColStd_Array1OfReal;
  KnotSequence_1(K: TColStd_Array1OfReal): void;
  KnotSequence_2(): TColStd_Array1OfReal;
  KnotDistribution(): GeomAbs_BSplKnotDistribution;
  LastUKnotIndex(): Standard_Integer;
  LastParameter(): Standard_Real;
  LocateU(U: Standard_Real, ParametricTolerance: Standard_Real, I1: Standard_Integer, I2: Standard_Integer, WithKnotRepetition: Standard_Boolean): void;
  Multiplicity(Index: Standard_Integer): Standard_Integer;
  Multiplicities_1(M: TColStd_Array1OfInteger): void;
  Multiplicities_2(): TColStd_Array1OfInteger;
  NbKnots(): Standard_Integer;
  NbPoles(): Standard_Integer;
  Pole(Index: Standard_Integer): gp_Pnt;
  Poles_1(P: TColgp_Array1OfPnt): void;
  Poles_2(): TColgp_Array1OfPnt;
  StartPoint(): gp_Pnt;
  Weight(Index: Standard_Integer): Standard_Real;
  Weights_1(W: TColStd_Array1OfReal): void;
  Weights_2(): TColStd_Array1OfReal;
  WeightsArray(): TColStd_Array1OfReal;
  Transform(T: gp_Trsf): void;
  static MaxDegree(): Standard_Integer;
  Resolution(Tolerance3D: Standard_Real, UTolerance: Standard_Real): void;
  Copy(): any;
  IsEqual(theOther: any, thePreci: Standard_Real): Standard_Boolean;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): any;
  DynamicType(): any;
  delete(): void;
}

  export declare class Geom_BSplineCurve_1 extends Geom_BSplineCurve {
    constructor(Poles: TColgp_Array1OfPnt, Knots: TColStd_Array1OfReal, Multiplicities: TColStd_Array1OfInteger, Degree: Standard_Integer, Periodic: Standard_Boolean);
  }

  export declare class Geom_BSplineCurve_2 extends Geom_BSplineCurve {
    constructor(Poles: TColgp_Array1OfPnt, Weights: TColStd_Array1OfReal, Knots: TColStd_Array1OfReal, Multiplicities: TColStd_Array1OfInteger, Degree: Standard_Integer, Periodic: Standard_Boolean, CheckRational: Standard_Boolean);
  }

  export declare class Geom_BSplineCurve_3 extends Geom_BSplineCurve {
    constructor(theOther: Geom_BSplineCurve);
  }

export declare class Geom_SphericalSurface extends Geom_ElementarySurface {
  SetRadius(R: Standard_Real): void;
  SetSphere(S: gp_Sphere): void;
  Sphere(): gp_Sphere;
  UReversedParameter(U: Standard_Real): Standard_Real;
  VReversedParameter(V: Standard_Real): Standard_Real;
  Area(): Standard_Real;
  Bounds(U1: Standard_Real, U2: Standard_Real, V1: Standard_Real, V2: Standard_Real): void;
  Coefficients(A1: Standard_Real, A2: Standard_Real, A3: Standard_Real, B1: Standard_Real, B2: Standard_Real, B3: Standard_Real, C1: Standard_Real, C2: Standard_Real, C3: Standard_Real, D: Standard_Real): void;
  Radius(): Standard_Real;
  Volume(): Standard_Real;
  IsUClosed(): Standard_Boolean;
  IsVClosed(): Standard_Boolean;
  IsUPeriodic(): Standard_Boolean;
  IsVPeriodic(): Standard_Boolean;
  UIso(U: Standard_Real): any;
  VIso(V: Standard_Real): any;
  EvalD0(U: Standard_Real, V: Standard_Real): gp_Pnt;
  EvalD1(U: Standard_Real, V: Standard_Real): any;
  EvalD2(U: Standard_Real, V: Standard_Real): any;
  EvalD3(U: Standard_Real, V: Standard_Real): any;
  EvalDN(U: Standard_Real, V: Standard_Real, Nu: Standard_Integer, Nv: Standard_Integer): gp_Vec;
  Transform(T: gp_Trsf): void;
  Copy(): any;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): any;
  DynamicType(): any;
  delete(): void;
}

  export declare class Geom_SphericalSurface_1 extends Geom_SphericalSurface {
    constructor(A3: gp_Ax3, Radius: Standard_Real);
  }

  export declare class Geom_SphericalSurface_2 extends Geom_SphericalSurface {
    constructor(S: gp_Sphere);
  }

export declare class Geom_BezierCurve extends Geom_BoundedCurve {
  HasEvalRepresentation(): Standard_Boolean;
  EvalRepresentation(): any;
  SetEvalRepresentation(theDesc: any): void;
  ClearEvalRepresentation(): void;
  Increase(Degree: Standard_Integer): void;
  InsertPoleAfter_1(Index: Standard_Integer, P: gp_Pnt): void;
  InsertPoleAfter_2(Index: Standard_Integer, P: gp_Pnt, Weight: Standard_Real): void;
  InsertPoleBefore_1(Index: Standard_Integer, P: gp_Pnt): void;
  InsertPoleBefore_2(Index: Standard_Integer, P: gp_Pnt, Weight: Standard_Real): void;
  RemovePole(Index: Standard_Integer): void;
  Reverse(): void;
  ReversedParameter(U: Standard_Real): Standard_Real;
  Segment(U1: Standard_Real, U2: Standard_Real): void;
  SetPole_1(Index: Standard_Integer, P: gp_Pnt): void;
  SetPole_2(Index: Standard_Integer, P: gp_Pnt, Weight: Standard_Real): void;
  SetWeight(Index: Standard_Integer, Weight: Standard_Real): void;
  IsClosed(): Standard_Boolean;
  IsCN(N: Standard_Integer): Standard_Boolean;
  IsPeriodic(): Standard_Boolean;
  IsRational(): Standard_Boolean;
  Continuity(): GeomAbs_Shape;
  Degree(): Standard_Integer;
  EvalD0(U: Standard_Real): gp_Pnt;
  EvalD1(U: Standard_Real): any;
  EvalD2(U: Standard_Real): any;
  EvalD3(U: Standard_Real): any;
  EvalDN(U: Standard_Real, N: Standard_Integer): gp_Vec;
  StartPoint(): gp_Pnt;
  EndPoint(): gp_Pnt;
  FirstParameter(): Standard_Real;
  LastParameter(): Standard_Real;
  NbPoles(): Standard_Integer;
  Pole(Index: Standard_Integer): gp_Pnt;
  Poles_1(P: TColgp_Array1OfPnt): void;
  Poles_2(): TColgp_Array1OfPnt;
  Weight(Index: Standard_Integer): Standard_Real;
  Weights_1(W: TColStd_Array1OfReal): void;
  Weights_2(): TColStd_Array1OfReal;
  WeightsArray(): TColStd_Array1OfReal;
  Transform(T: gp_Trsf): void;
  static MaxDegree(): Standard_Integer;
  Resolution(Tolerance3D: Standard_Real, UTolerance: Standard_Real): void;
  Copy(): any;
  Knots(): TColStd_Array1OfReal;
  Multiplicities(): TColStd_Array1OfInteger;
  KnotSequence(): TColStd_Array1OfReal;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): any;
  DynamicType(): any;
  delete(): void;
}

  export declare class Geom_BezierCurve_1 extends Geom_BezierCurve {
    constructor(CurvePoles: TColgp_Array1OfPnt);
  }

  export declare class Geom_BezierCurve_2 extends Geom_BezierCurve {
    constructor(CurvePoles: TColgp_Array1OfPnt, PoleWeights: TColStd_Array1OfReal);
  }

  export declare class Geom_BezierCurve_3 extends Geom_BezierCurve {
    constructor(theOther: Geom_BezierCurve);
  }

export declare class Geom_Geometry extends Standard_Transient {
  Mirror_1(P: gp_Pnt): void;
  Mirror_2(A1: gp_Ax1): void;
  Mirror_3(A2: gp_Ax2): void;
  Rotate(A1: gp_Ax1, Ang: Standard_Real): void;
  Scale(P: gp_Pnt, S: Standard_Real): void;
  Translate_1(V: gp_Vec): void;
  Translate_2(P1: gp_Pnt, P2: gp_Pnt): void;
  Transform(T: gp_Trsf): void;
  Mirrored_1(P: gp_Pnt): any;
  Mirrored_2(A1: gp_Ax1): any;
  Mirrored_3(A2: gp_Ax2): any;
  Rotated(A1: gp_Ax1, Ang: Standard_Real): any;
  Scaled(P: gp_Pnt, S: Standard_Real): any;
  Transformed(T: gp_Trsf): any;
  Translated_1(V: gp_Vec): any;
  Translated_2(P1: gp_Pnt, P2: gp_Pnt): any;
  Copy(): any;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): any;
  DynamicType(): any;
  delete(): void;
}

export declare class Geom_CylindricalSurface extends Geom_ElementarySurface {
  SetCylinder(C: gp_Cylinder): void;
  SetRadius(R: Standard_Real): void;
  Cylinder(): gp_Cylinder;
  UReversedParameter(U: Standard_Real): Standard_Real;
  VReversedParameter(V: Standard_Real): Standard_Real;
  TransformParameters(U: Standard_Real, V: Standard_Real, T: gp_Trsf): void;
  ParametricTransformation(T: gp_Trsf): gp_GTrsf2d;
  Bounds(U1: Standard_Real, U2: Standard_Real, V1: Standard_Real, V2: Standard_Real): void;
  Coefficients(A1: Standard_Real, A2: Standard_Real, A3: Standard_Real, B1: Standard_Real, B2: Standard_Real, B3: Standard_Real, C1: Standard_Real, C2: Standard_Real, C3: Standard_Real, D: Standard_Real): void;
  Radius(): Standard_Real;
  IsUClosed(): Standard_Boolean;
  IsVClosed(): Standard_Boolean;
  IsUPeriodic(): Standard_Boolean;
  IsVPeriodic(): Standard_Boolean;
  UIso(U: Standard_Real): any;
  VIso(V: Standard_Real): any;
  EvalD0(U: Standard_Real, V: Standard_Real): gp_Pnt;
  EvalD1(U: Standard_Real, V: Standard_Real): any;
  EvalD2(U: Standard_Real, V: Standard_Real): any;
  EvalD3(U: Standard_Real, V: Standard_Real): any;
  EvalDN(U: Standard_Real, V: Standard_Real, Nu: Standard_Integer, Nv: Standard_Integer): gp_Vec;
  Transform(T: gp_Trsf): void;
  Copy(): any;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): any;
  DynamicType(): any;
  delete(): void;
}

  export declare class Geom_CylindricalSurface_1 extends Geom_CylindricalSurface {
    constructor(A3: gp_Ax3, Radius: Standard_Real);
  }

  export declare class Geom_CylindricalSurface_2 extends Geom_CylindricalSurface {
    constructor(C: gp_Cylinder);
  }

export declare class Geom_Surface extends Geom_Geometry {
  UReverse(): void;
  UReversed(): any;
  UReversedParameter(U: Standard_Real): Standard_Real;
  VReverse(): void;
  VReversed(): any;
  VReversedParameter(V: Standard_Real): Standard_Real;
  TransformParameters(U: Standard_Real, V: Standard_Real, T: gp_Trsf): void;
  ParametricTransformation(T: gp_Trsf): gp_GTrsf2d;
  Bounds(U1: Standard_Real, U2: Standard_Real, V1: Standard_Real, V2: Standard_Real): void;
  IsUClosed(): Standard_Boolean;
  IsVClosed(): Standard_Boolean;
  IsUPeriodic(): Standard_Boolean;
  UPeriod(): Standard_Real;
  IsVPeriodic(): Standard_Boolean;
  VPeriod(): Standard_Real;
  UIso(U: Standard_Real): any;
  VIso(V: Standard_Real): any;
  Continuity(): GeomAbs_Shape;
  IsCNu(N: Standard_Integer): Standard_Boolean;
  IsCNv(N: Standard_Integer): Standard_Boolean;
  EvalD0(U: Standard_Real, V: Standard_Real): gp_Pnt;
  EvalD1(U: Standard_Real, V: Standard_Real): ResD1;
  EvalD2(U: Standard_Real, V: Standard_Real): ResD2;
  EvalD3(U: Standard_Real, V: Standard_Real): ResD3;
  EvalDN(U: Standard_Real, V: Standard_Real, Nu: Standard_Integer, Nv: Standard_Integer): gp_Vec;
  D0(U: Standard_Real, V: Standard_Real, P: gp_Pnt): void;
  D1(U: Standard_Real, V: Standard_Real, P: gp_Pnt, D1U: gp_Vec, D1V: gp_Vec): void;
  D2(U: Standard_Real, V: Standard_Real, P: gp_Pnt, D1U: gp_Vec, D1V: gp_Vec, D2U: gp_Vec, D2V: gp_Vec, D2UV: gp_Vec): void;
  D3(U: Standard_Real, V: Standard_Real, P: gp_Pnt, D1U: gp_Vec, D1V: gp_Vec, D2U: gp_Vec, D2V: gp_Vec, D2UV: gp_Vec, D3U: gp_Vec, D3V: gp_Vec, D3UUV: gp_Vec, D3UVV: gp_Vec): void;
  DN(U: Standard_Real, V: Standard_Real, Nu: Standard_Integer, Nv: Standard_Integer): gp_Vec;
  Value(U: Standard_Real, V: Standard_Real): gp_Pnt;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): any;
  DynamicType(): any;
  delete(): void;
}

export declare class Geom_ElementarySurface extends Geom_Surface {
  SetAxis(theA1: gp_Ax1): void;
  SetLocation(theLoc: gp_Pnt): void;
  SetPosition(theAx3: gp_Ax3): void;
  Axis(): gp_Ax1;
  Location(): gp_Pnt;
  Position(): gp_Ax3;
  UReverse(): void;
  UReversedParameter(U: Standard_Real): Standard_Real;
  VReverse(): void;
  VReversedParameter(V: Standard_Real): Standard_Real;
  Continuity(): GeomAbs_Shape;
  IsCNu(N: Standard_Integer): Standard_Boolean;
  IsCNv(N: Standard_Integer): Standard_Boolean;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): any;
  DynamicType(): any;
  delete(): void;
}

export declare class Geom_Curve extends Geom_Geometry {
  Reverse(): void;
  ReversedParameter(U: Standard_Real): Standard_Real;
  TransformedParameter(U: Standard_Real, T: gp_Trsf): Standard_Real;
  ParametricTransformation(T: gp_Trsf): Standard_Real;
  Reversed(): any;
  FirstParameter(): Standard_Real;
  LastParameter(): Standard_Real;
  IsClosed(): Standard_Boolean;
  IsPeriodic(): Standard_Boolean;
  Period(): Standard_Real;
  Continuity(): GeomAbs_Shape;
  IsCN(N: Standard_Integer): Standard_Boolean;
  EvalD0(U: Standard_Real): gp_Pnt;
  EvalD1(U: Standard_Real): ResD1;
  EvalD2(U: Standard_Real): ResD2;
  EvalD3(U: Standard_Real): ResD3;
  EvalDN(U: Standard_Real, N: Standard_Integer): gp_Vec;
  D0(U: Standard_Real, P: gp_Pnt): void;
  D1(U: Standard_Real, P: gp_Pnt, V1: gp_Vec): void;
  D2(U: Standard_Real, P: gp_Pnt, V1: gp_Vec, V2: gp_Vec): void;
  D3(U: Standard_Real, P: gp_Pnt, V1: gp_Vec, V2: gp_Vec, V3: gp_Vec): void;
  DN(U: Standard_Real, N: Standard_Integer): gp_Vec;
  Value(U: Standard_Real): gp_Pnt;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): any;
  DynamicType(): any;
  delete(): void;
}

export declare class Geom_BoundedSurface extends Geom_Surface {
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): any;
  DynamicType(): any;
  delete(): void;
}

export declare class GProp_GProps {
  Add(Item: GProp_GProps, Density: Standard_Real): void;
  Mass(): Standard_Real;
  CentreOfMass(): gp_Pnt;
  MatrixOfInertia(): gp_Mat;
  StaticMoments(Ix: Standard_Real, Iy: Standard_Real, Iz: Standard_Real): void;
  MomentOfInertia(A: gp_Ax1): Standard_Real;
  PrincipalProperties(): GProp_PrincipalProps;
  RadiusOfGyration(A: gp_Ax1): Standard_Real;
  delete(): void;
}

  export declare class GProp_GProps_1 extends GProp_GProps {
    constructor();
  }

  export declare class GProp_GProps_2 extends GProp_GProps {
    constructor(SystemLocation: gp_Pnt);
  }

export declare class Geom2d_BSplineCurve extends Geom2d_BoundedCurve {
  HasEvalRepresentation(): Standard_Boolean;
  EvalRepresentation(): any;
  SetEvalRepresentation(theDesc: any): void;
  ClearEvalRepresentation(): void;
  IncreaseDegree(Degree: Standard_Integer): void;
  IncreaseMultiplicity_1(Index: Standard_Integer, M: Standard_Integer): void;
  IncreaseMultiplicity_2(I1: Standard_Integer, I2: Standard_Integer, M: Standard_Integer): void;
  IncrementMultiplicity(I1: Standard_Integer, I2: Standard_Integer, M: Standard_Integer): void;
  InsertKnot(U: Standard_Real, M: Standard_Integer, ParametricTolerance: Standard_Real): void;
  InsertKnots(Knots: TColStd_Array1OfReal, Mults: TColStd_Array1OfInteger, ParametricTolerance: Standard_Real, Add: Standard_Boolean): void;
  RemoveKnot(Index: Standard_Integer, M: Standard_Integer, Tolerance: Standard_Real): Standard_Boolean;
  InsertPoleAfter(Index: Standard_Integer, P: gp_Pnt2d, Weight: Standard_Real): void;
  InsertPoleBefore(Index: Standard_Integer, P: gp_Pnt2d, Weight: Standard_Real): void;
  RemovePole(Index: Standard_Integer): void;
  Reverse(): void;
  ReversedParameter(U: Standard_Real): Standard_Real;
  Segment(U1: Standard_Real, U2: Standard_Real, theTolerance: Standard_Real): void;
  SetKnot_1(Index: Standard_Integer, K: Standard_Real): void;
  SetKnots(K: TColStd_Array1OfReal): void;
  SetKnot_2(Index: Standard_Integer, K: Standard_Real, M: Standard_Integer): void;
  PeriodicNormalization(U: Standard_Real): void;
  SetPeriodic(): void;
  SetOrigin(Index: Standard_Integer): void;
  SetNotPeriodic(): void;
  SetPole_1(Index: Standard_Integer, P: gp_Pnt2d): void;
  SetPole_2(Index: Standard_Integer, P: gp_Pnt2d, Weight: Standard_Real): void;
  SetWeight(Index: Standard_Integer, Weight: Standard_Real): void;
  MovePoint(U: Standard_Real, P: gp_Pnt2d, Index1: Standard_Integer, Index2: Standard_Integer, FirstModifiedPole: Standard_Integer, LastModifiedPole: Standard_Integer): void;
  MovePointAndTangent(U: Standard_Real, P: gp_Pnt2d, Tangent: gp_Vec2d, Tolerance: Standard_Real, StartingCondition: Standard_Integer, EndingCondition: Standard_Integer, ErrorStatus: Standard_Integer): void;
  IsCN(N: Standard_Integer): Standard_Boolean;
  IsG1(theTf: Standard_Real, theTl: Standard_Real, theAngTol: Standard_Real): Standard_Boolean;
  IsClosed(): Standard_Boolean;
  IsPeriodic(): Standard_Boolean;
  IsRational(): Standard_Boolean;
  Continuity(): GeomAbs_Shape;
  Degree(): Standard_Integer;
  EvalD0(U: Standard_Real): gp_Pnt2d;
  EvalD1(U: Standard_Real): any;
  EvalD2(U: Standard_Real): any;
  EvalD3(U: Standard_Real): any;
  EvalDN(U: Standard_Real, N: Standard_Integer): gp_Vec2d;
  LocalValue(U: Standard_Real, FromK1: Standard_Integer, ToK2: Standard_Integer): gp_Pnt2d;
  LocalD0(U: Standard_Real, FromK1: Standard_Integer, ToK2: Standard_Integer, P: gp_Pnt2d): void;
  LocalD1(U: Standard_Real, FromK1: Standard_Integer, ToK2: Standard_Integer, P: gp_Pnt2d, V1: gp_Vec2d): void;
  LocalD2(U: Standard_Real, FromK1: Standard_Integer, ToK2: Standard_Integer, P: gp_Pnt2d, V1: gp_Vec2d, V2: gp_Vec2d): void;
  LocalD3(U: Standard_Real, FromK1: Standard_Integer, ToK2: Standard_Integer, P: gp_Pnt2d, V1: gp_Vec2d, V2: gp_Vec2d, V3: gp_Vec2d): void;
  LocalDN(U: Standard_Real, FromK1: Standard_Integer, ToK2: Standard_Integer, N: Standard_Integer): gp_Vec2d;
  EndPoint(): gp_Pnt2d;
  FirstUKnotIndex(): Standard_Integer;
  FirstParameter(): Standard_Real;
  Knot(Index: Standard_Integer): Standard_Real;
  Knots_1(K: TColStd_Array1OfReal): void;
  Knots_2(): TColStd_Array1OfReal;
  KnotSequence_1(K: TColStd_Array1OfReal): void;
  KnotSequence_2(): TColStd_Array1OfReal;
  KnotDistribution(): GeomAbs_BSplKnotDistribution;
  LastUKnotIndex(): Standard_Integer;
  LastParameter(): Standard_Real;
  LocateU(U: Standard_Real, ParametricTolerance: Standard_Real, I1: Standard_Integer, I2: Standard_Integer, WithKnotRepetition: Standard_Boolean): void;
  Multiplicity(Index: Standard_Integer): Standard_Integer;
  Multiplicities_1(M: TColStd_Array1OfInteger): void;
  Multiplicities_2(): TColStd_Array1OfInteger;
  NbKnots(): Standard_Integer;
  NbPoles(): Standard_Integer;
  Pole(Index: Standard_Integer): gp_Pnt2d;
  Poles_1(P: TColgp_Array1OfPnt2d): void;
  Poles_2(): TColgp_Array1OfPnt2d;
  StartPoint(): gp_Pnt2d;
  Weight(Index: Standard_Integer): Standard_Real;
  Weights_1(W: TColStd_Array1OfReal): void;
  Weights_2(): TColStd_Array1OfReal;
  WeightsArray(): TColStd_Array1OfReal;
  Transform(T: gp_Trsf2d): void;
  static MaxDegree(): Standard_Integer;
  Resolution(ToleranceUV: Standard_Real, UTolerance: Standard_Real): void;
  Copy(): any;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): any;
  DynamicType(): any;
  delete(): void;
}

  export declare class Geom2d_BSplineCurve_1 extends Geom2d_BSplineCurve {
    constructor(Poles: TColgp_Array1OfPnt2d, Knots: TColStd_Array1OfReal, Multiplicities: TColStd_Array1OfInteger, Degree: Standard_Integer, Periodic: Standard_Boolean);
  }

  export declare class Geom2d_BSplineCurve_2 extends Geom2d_BSplineCurve {
    constructor(Poles: TColgp_Array1OfPnt2d, Weights: TColStd_Array1OfReal, Knots: TColStd_Array1OfReal, Multiplicities: TColStd_Array1OfInteger, Degree: Standard_Integer, Periodic: Standard_Boolean);
  }

  export declare class Geom2d_BSplineCurve_3 extends Geom2d_BSplineCurve {
    constructor(theOther: Geom2d_BSplineCurve);
  }

export declare class Geom2d_BoundedCurve extends Geom2d_Curve {
  EndPoint(): gp_Pnt2d;
  StartPoint(): gp_Pnt2d;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): any;
  DynamicType(): any;
  delete(): void;
}

export declare class Geom2d_TrimmedCurve extends Geom2d_BoundedCurve {
  constructor(C: any, U1: Standard_Real, U2: Standard_Real, Sense: Standard_Boolean, theAdjustPeriodic: Standard_Boolean)
  Reverse(): void;
  ReversedParameter(U: Standard_Real): Standard_Real;
  SetTrim(U1: Standard_Real, U2: Standard_Real, Sense: Standard_Boolean, theAdjustPeriodic: Standard_Boolean): void;
  BasisCurve(): any;
  Continuity(): GeomAbs_Shape;
  IsCN(N: Standard_Integer): Standard_Boolean;
  EndPoint(): gp_Pnt2d;
  FirstParameter(): Standard_Real;
  IsClosed(): Standard_Boolean;
  IsPeriodic(): Standard_Boolean;
  Period(): Standard_Real;
  LastParameter(): Standard_Real;
  StartPoint(): gp_Pnt2d;
  EvalD0(U: Standard_Real): gp_Pnt2d;
  EvalD1(U: Standard_Real): any;
  EvalD2(U: Standard_Real): any;
  EvalD3(U: Standard_Real): any;
  EvalDN(U: Standard_Real, N: Standard_Integer): gp_Vec2d;
  Transform(T: gp_Trsf2d): void;
  TransformedParameter(U: Standard_Real, T: gp_Trsf2d): Standard_Real;
  ParametricTransformation(T: gp_Trsf2d): Standard_Real;
  Copy(): any;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): any;
  DynamicType(): any;
  delete(): void;
}

export declare class Geom2d_Circle extends Geom2d_Conic {
  SetCirc2d(C: gp_Circ2d): void;
  SetRadius(R: Standard_Real): void;
  Circ2d(): gp_Circ2d;
  Radius(): Standard_Real;
  ReversedParameter(U: Standard_Real): Standard_Real;
  Eccentricity(): Standard_Real;
  FirstParameter(): Standard_Real;
  LastParameter(): Standard_Real;
  IsClosed(): Standard_Boolean;
  IsPeriodic(): Standard_Boolean;
  EvalD0(U: Standard_Real): gp_Pnt2d;
  EvalD1(U: Standard_Real): any;
  EvalD2(U: Standard_Real): any;
  EvalD3(U: Standard_Real): any;
  EvalDN(U: Standard_Real, N: Standard_Integer): gp_Vec2d;
  Transform(T: gp_Trsf2d): void;
  Copy(): any;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): any;
  DynamicType(): any;
  delete(): void;
}

  export declare class Geom2d_Circle_1 extends Geom2d_Circle {
    constructor(C: gp_Circ2d);
  }

  export declare class Geom2d_Circle_2 extends Geom2d_Circle {
    constructor(A: gp_Ax2d, Radius: Standard_Real, Sense: Standard_Boolean);
  }

  export declare class Geom2d_Circle_3 extends Geom2d_Circle {
    constructor(A: gp_Ax22d, Radius: Standard_Real);
  }

export declare class Geom2d_Line extends Geom2d_Curve {
  SetLin2d(L: gp_Lin2d): void;
  SetDirection(V: gp_Dir2d): void;
  Direction(): gp_Dir2d;
  SetLocation(P: gp_Pnt2d): void;
  Location(): gp_Pnt2d;
  SetPosition(A: gp_Ax2d): void;
  Position(): gp_Ax2d;
  Lin2d(): gp_Lin2d;
  Reverse(): void;
  ReversedParameter(U: Standard_Real): Standard_Real;
  FirstParameter(): Standard_Real;
  LastParameter(): Standard_Real;
  IsClosed(): Standard_Boolean;
  IsPeriodic(): Standard_Boolean;
  Continuity(): GeomAbs_Shape;
  Distance(P: gp_Pnt2d): Standard_Real;
  IsCN(N: Standard_Integer): Standard_Boolean;
  EvalD0(U: Standard_Real): gp_Pnt2d;
  EvalD1(U: Standard_Real): any;
  EvalD2(U: Standard_Real): any;
  EvalD3(U: Standard_Real): any;
  EvalDN(U: Standard_Real, N: Standard_Integer): gp_Vec2d;
  Transform(T: gp_Trsf2d): void;
  TransformedParameter(U: Standard_Real, T: gp_Trsf2d): Standard_Real;
  ParametricTransformation(T: gp_Trsf2d): Standard_Real;
  Copy(): any;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): any;
  DynamicType(): any;
  delete(): void;
}

  export declare class Geom2d_Line_1 extends Geom2d_Line {
    constructor(A: gp_Ax2d);
  }

  export declare class Geom2d_Line_2 extends Geom2d_Line {
    constructor(L: gp_Lin2d);
  }

  export declare class Geom2d_Line_3 extends Geom2d_Line {
    constructor(P: gp_Pnt2d, V: gp_Dir2d);
  }

export declare class Geom2d_Curve extends Geom2d_Geometry {
  Reverse(): void;
  ReversedParameter(U: Standard_Real): Standard_Real;
  TransformedParameter(U: Standard_Real, T: gp_Trsf2d): Standard_Real;
  ParametricTransformation(T: gp_Trsf2d): Standard_Real;
  Reversed(): any;
  FirstParameter(): Standard_Real;
  LastParameter(): Standard_Real;
  IsClosed(): Standard_Boolean;
  IsPeriodic(): Standard_Boolean;
  Period(): Standard_Real;
  Continuity(): GeomAbs_Shape;
  IsCN(N: Standard_Integer): Standard_Boolean;
  EvalD0(U: Standard_Real): gp_Pnt2d;
  EvalD1(U: Standard_Real): ResD1;
  EvalD2(U: Standard_Real): ResD2;
  EvalD3(U: Standard_Real): ResD3;
  EvalDN(U: Standard_Real, N: Standard_Integer): gp_Vec2d;
  D0(U: Standard_Real, P: gp_Pnt2d): void;
  D1(U: Standard_Real, P: gp_Pnt2d, V1: gp_Vec2d): void;
  D2(U: Standard_Real, P: gp_Pnt2d, V1: gp_Vec2d, V2: gp_Vec2d): void;
  D3(U: Standard_Real, P: gp_Pnt2d, V1: gp_Vec2d, V2: gp_Vec2d, V3: gp_Vec2d): void;
  DN(U: Standard_Real, N: Standard_Integer): gp_Vec2d;
  Value(U: Standard_Real): gp_Pnt2d;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): any;
  DynamicType(): any;
  delete(): void;
}

export declare class Geom2d_OffsetCurve extends Geom2d_Curve {
  HasEvalRepresentation(): Standard_Boolean;
  EvalRepresentation(): any;
  SetEvalRepresentation(theDesc: any): void;
  ClearEvalRepresentation(): void;
  Reverse(): void;
  ReversedParameter(U: Standard_Real): Standard_Real;
  SetBasisCurve(C: any, isNotCheckC0: Standard_Boolean): void;
  SetOffsetValue(D: Standard_Real): void;
  BasisCurve(): any;
  Continuity(): GeomAbs_Shape;
  EvalD0(U: Standard_Real): gp_Pnt2d;
  EvalD1(U: Standard_Real): any;
  EvalD2(U: Standard_Real): any;
  EvalD3(U: Standard_Real): any;
  EvalDN(U: Standard_Real, N: Standard_Integer): gp_Vec2d;
  FirstParameter(): Standard_Real;
  LastParameter(): Standard_Real;
  Offset(): Standard_Real;
  IsClosed(): Standard_Boolean;
  IsCN(N: Standard_Integer): Standard_Boolean;
  IsPeriodic(): Standard_Boolean;
  Period(): Standard_Real;
  Transform(T: gp_Trsf2d): void;
  TransformedParameter(U: Standard_Real, T: gp_Trsf2d): Standard_Real;
  ParametricTransformation(T: gp_Trsf2d): Standard_Real;
  Copy(): any;
  GetBasisCurveContinuity(): GeomAbs_Shape;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): any;
  DynamicType(): any;
  delete(): void;
}

  export declare class Geom2d_OffsetCurve_1 extends Geom2d_OffsetCurve {
    constructor(C: any, Offset: Standard_Real, isNotCheckC0: Standard_Boolean);
  }

  export declare class Geom2d_OffsetCurve_2 extends Geom2d_OffsetCurve {
    constructor(theOther: Geom2d_OffsetCurve);
  }

export declare class Geom2d_BezierCurve extends Geom2d_BoundedCurve {
  HasEvalRepresentation(): Standard_Boolean;
  EvalRepresentation(): any;
  SetEvalRepresentation(theDesc: any): void;
  ClearEvalRepresentation(): void;
  Increase(Degree: Standard_Integer): void;
  InsertPoleAfter(Index: Standard_Integer, P: gp_Pnt2d, Weight: Standard_Real): void;
  InsertPoleBefore(Index: Standard_Integer, P: gp_Pnt2d, Weight: Standard_Real): void;
  RemovePole(Index: Standard_Integer): void;
  Reverse(): void;
  ReversedParameter(U: Standard_Real): Standard_Real;
  Segment(U1: Standard_Real, U2: Standard_Real): void;
  SetPole_1(Index: Standard_Integer, P: gp_Pnt2d): void;
  SetPole_2(Index: Standard_Integer, P: gp_Pnt2d, Weight: Standard_Real): void;
  SetWeight(Index: Standard_Integer, Weight: Standard_Real): void;
  IsClosed(): Standard_Boolean;
  IsCN(N: Standard_Integer): Standard_Boolean;
  IsPeriodic(): Standard_Boolean;
  IsRational(): Standard_Boolean;
  Continuity(): GeomAbs_Shape;
  Degree(): Standard_Integer;
  EvalD0(U: Standard_Real): gp_Pnt2d;
  EvalD1(U: Standard_Real): any;
  EvalD2(U: Standard_Real): any;
  EvalD3(U: Standard_Real): any;
  EvalDN(U: Standard_Real, N: Standard_Integer): gp_Vec2d;
  EndPoint(): gp_Pnt2d;
  FirstParameter(): Standard_Real;
  LastParameter(): Standard_Real;
  NbPoles(): Standard_Integer;
  Pole(Index: Standard_Integer): gp_Pnt2d;
  Poles_1(P: TColgp_Array1OfPnt2d): void;
  Poles_2(): TColgp_Array1OfPnt2d;
  StartPoint(): gp_Pnt2d;
  Weight(Index: Standard_Integer): Standard_Real;
  Weights_1(W: TColStd_Array1OfReal): void;
  Weights_2(): TColStd_Array1OfReal;
  WeightsArray(): TColStd_Array1OfReal;
  Transform(T: gp_Trsf2d): void;
  static MaxDegree(): Standard_Integer;
  Resolution(ToleranceUV: Standard_Real, UTolerance: Standard_Real): void;
  Copy(): any;
  Knots(): TColStd_Array1OfReal;
  Multiplicities(): TColStd_Array1OfInteger;
  KnotSequence(): TColStd_Array1OfReal;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): any;
  DynamicType(): any;
  delete(): void;
}

  export declare class Geom2d_BezierCurve_1 extends Geom2d_BezierCurve {
    constructor(CurvePoles: TColgp_Array1OfPnt2d);
  }

  export declare class Geom2d_BezierCurve_2 extends Geom2d_BezierCurve {
    constructor(CurvePoles: TColgp_Array1OfPnt2d, PoleWeights: TColStd_Array1OfReal);
  }

  export declare class Geom2d_BezierCurve_3 extends Geom2d_BezierCurve {
    constructor(theOther: Geom2d_BezierCurve);
  }

export declare class Geom2d_Conic extends Geom2d_Curve {
  SetAxis(theA: gp_Ax22d): void;
  SetXAxis(theAX: gp_Ax2d): void;
  SetYAxis(theAY: gp_Ax2d): void;
  SetLocation(theP: gp_Pnt2d): void;
  XAxis(): gp_Ax2d;
  YAxis(): gp_Ax2d;
  Eccentricity(): Standard_Real;
  Location(): gp_Pnt2d;
  Position(): gp_Ax22d;
  Reverse(): void;
  ReversedParameter(U: Standard_Real): Standard_Real;
  Continuity(): GeomAbs_Shape;
  IsCN(N: Standard_Integer): Standard_Boolean;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): any;
  DynamicType(): any;
  delete(): void;
}

export declare class Geom2d_Geometry extends Standard_Transient {
  Mirror_1(P: gp_Pnt2d): void;
  Mirror_2(A: gp_Ax2d): void;
  Rotate(P: gp_Pnt2d, Ang: Standard_Real): void;
  Scale(P: gp_Pnt2d, S: Standard_Real): void;
  Translate_1(V: gp_Vec2d): void;
  Translate_2(P1: gp_Pnt2d, P2: gp_Pnt2d): void;
  Transform(T: gp_Trsf2d): void;
  Mirrored_1(P: gp_Pnt2d): any;
  Mirrored_2(A: gp_Ax2d): any;
  Rotated(P: gp_Pnt2d, Ang: Standard_Real): any;
  Scaled(P: gp_Pnt2d, S: Standard_Real): any;
  Transformed(T: gp_Trsf2d): any;
  Translated_1(V: gp_Vec2d): any;
  Translated_2(P1: gp_Pnt2d, P2: gp_Pnt2d): any;
  Copy(): any;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): any;
  DynamicType(): any;
  delete(): void;
}

export declare class Geom2d_Ellipse extends Geom2d_Conic {
  SetElips2d(E: gp_Elips2d): void;
  SetMajorRadius(MajorRadius: Standard_Real): void;
  SetMinorRadius(MinorRadius: Standard_Real): void;
  Elips2d(): gp_Elips2d;
  ReversedParameter(U: Standard_Real): Standard_Real;
  Directrix1(): gp_Ax2d;
  Directrix2(): gp_Ax2d;
  Eccentricity(): Standard_Real;
  Focal(): Standard_Real;
  Focus1(): gp_Pnt2d;
  Focus2(): gp_Pnt2d;
  MajorRadius(): Standard_Real;
  MinorRadius(): Standard_Real;
  Parameter(): Standard_Real;
  FirstParameter(): Standard_Real;
  LastParameter(): Standard_Real;
  IsClosed(): Standard_Boolean;
  IsPeriodic(): Standard_Boolean;
  EvalD0(U: Standard_Real): gp_Pnt2d;
  EvalD1(U: Standard_Real): any;
  EvalD2(U: Standard_Real): any;
  EvalD3(U: Standard_Real): any;
  EvalDN(U: Standard_Real, N: Standard_Integer): gp_Vec2d;
  Transform(T: gp_Trsf2d): void;
  Copy(): any;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): any;
  DynamicType(): any;
  delete(): void;
}

  export declare class Geom2d_Ellipse_1 extends Geom2d_Ellipse {
    constructor(E: gp_Elips2d);
  }

  export declare class Geom2d_Ellipse_2 extends Geom2d_Ellipse {
    constructor(MajorAxis: gp_Ax2d, MajorRadius: Standard_Real, MinorRadius: Standard_Real, Sense: Standard_Boolean);
  }

  export declare class Geom2d_Ellipse_3 extends Geom2d_Ellipse {
    constructor(Axis: gp_Ax22d, MajorRadius: Standard_Real, MinorRadius: Standard_Real);
  }

export declare class Geom2dAdaptor_Curve extends Adaptor2d_Curve2d {
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): any;
  DynamicType(): any;
  ShallowCopy(): any;
  Reset(): void;
  Load_1(theCurve: any): void;
  Load_2(theCurve: any, theUFirst: Standard_Real, theULast: Standard_Real): void;
  Curve(): any;
  FirstParameter(): Standard_Real;
  LastParameter(): Standard_Real;
  Continuity(): GeomAbs_Shape;
  NbIntervals(S: GeomAbs_Shape): Standard_Integer;
  Intervals(T: TColStd_Array1OfReal, S: GeomAbs_Shape): void;
  Trim(First: Standard_Real, Last: Standard_Real, Tol: Standard_Real): any;
  IsClosed(): Standard_Boolean;
  IsPeriodic(): Standard_Boolean;
  Period(): Standard_Real;
  Value(U: Standard_Real): gp_Pnt2d;
  D0(U: Standard_Real, P: gp_Pnt2d): void;
  D1(U: Standard_Real, P: gp_Pnt2d, V: gp_Vec2d): void;
  D2(U: Standard_Real, P: gp_Pnt2d, V1: gp_Vec2d, V2: gp_Vec2d): void;
  D3(U: Standard_Real, P: gp_Pnt2d, V1: gp_Vec2d, V2: gp_Vec2d, V3: gp_Vec2d): void;
  DN(U: Standard_Real, N: Standard_Integer): gp_Vec2d;
  Resolution(Ruv: Standard_Real): Standard_Real;
  GetType(): GeomAbs_CurveType;
  Line(): gp_Lin2d;
  Circle(): gp_Circ2d;
  Ellipse(): gp_Elips2d;
  Hyperbola(): gp_Hypr2d;
  Parabola(): gp_Parab2d;
  Degree(): Standard_Integer;
  IsRational(): Standard_Boolean;
  NbPoles(): Standard_Integer;
  NbKnots(): Standard_Integer;
  NbSamples(): Standard_Integer;
  Bezier(): any;
  BSpline(): any;
  EvalD0(U: Standard_Real): gp_Pnt2d;
  EvalD1(U: Standard_Real): any;
  EvalD2(U: Standard_Real): any;
  EvalD3(U: Standard_Real): any;
  EvalDN(U: Standard_Real, N: Standard_Integer): gp_Vec2d;
  delete(): void;
}

  export declare class Geom2dAdaptor_Curve_1 extends Geom2dAdaptor_Curve {
    constructor();
  }

  export declare class Geom2dAdaptor_Curve_2 extends Geom2dAdaptor_Curve {
    constructor(C: any);
  }

  export declare class Geom2dAdaptor_Curve_3 extends Geom2dAdaptor_Curve {
    constructor(C: any, UFirst: Standard_Real, ULast: Standard_Real);
  }

export declare class Adaptor2d_Curve2d extends Standard_Transient {
  constructor();
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): any;
  DynamicType(): any;
  ShallowCopy(): any;
  FirstParameter(): Standard_Real;
  LastParameter(): Standard_Real;
  Continuity(): GeomAbs_Shape;
  NbIntervals(S: GeomAbs_Shape): Standard_Integer;
  Intervals(T: TColStd_Array1OfReal, S: GeomAbs_Shape): void;
  Trim(First: Standard_Real, Last: Standard_Real, Tol: Standard_Real): any;
  IsClosed(): Standard_Boolean;
  IsPeriodic(): Standard_Boolean;
  Period(): Standard_Real;
  Value(U: Standard_Real): gp_Pnt2d;
  D0(U: Standard_Real, P: gp_Pnt2d): void;
  D1(U: Standard_Real, P: gp_Pnt2d, V: gp_Vec2d): void;
  D2(U: Standard_Real, P: gp_Pnt2d, V1: gp_Vec2d, V2: gp_Vec2d): void;
  D3(U: Standard_Real, P: gp_Pnt2d, V1: gp_Vec2d, V2: gp_Vec2d, V3: gp_Vec2d): void;
  DN(U: Standard_Real, N: Standard_Integer): gp_Vec2d;
  Resolution(R3d: Standard_Real): Standard_Real;
  GetType(): GeomAbs_CurveType;
  Line(): gp_Lin2d;
  Circle(): gp_Circ2d;
  Ellipse(): gp_Elips2d;
  Hyperbola(): gp_Hypr2d;
  Parabola(): gp_Parab2d;
  Degree(): Standard_Integer;
  IsRational(): Standard_Boolean;
  NbPoles(): Standard_Integer;
  NbKnots(): Standard_Integer;
  NbSamples(): Standard_Integer;
  Bezier(): any;
  BSpline(): any;
  EvalD0(U: Standard_Real): gp_Pnt2d;
  EvalD1(U: Standard_Real): any;
  EvalD2(U: Standard_Real): any;
  EvalD3(U: Standard_Real): any;
  EvalDN(U: Standard_Real, N: Standard_Integer): gp_Vec2d;
  delete(): void;
}

export declare class GeomTools {
  constructor();
  static SetUndefinedTypeHandler(aHandler: any): void;
  static GetUndefinedTypeHandler(): any;
  delete(): void;
}

export declare class Geom2dConvert {
  constructor();
  static SplitBSplineCurve_1(C: any, FromK1: Standard_Integer, ToK2: Standard_Integer, SameOrientation: Standard_Boolean): any;
  static SplitBSplineCurve_2(C: any, FromU1: Standard_Real, ToU2: Standard_Real, ParametricTolerance: Standard_Real, SameOrientation: Standard_Boolean): any;
  static CurveToBSplineCurve(C: any, Parameterisation: Convert_ParameterisationType): any;
  static ConcatG1(ArrayOfCurves: any, ArrayOfToler: TColStd_Array1OfReal, ArrayOfConcatenated: any, ClosedFlag: Standard_Boolean, ClosedTolerance: Standard_Real): void;
  static ConcatC1_1(ArrayOfCurves: any, ArrayOfToler: TColStd_Array1OfReal, ArrayOfIndices: any, ArrayOfConcatenated: any, ClosedFlag: Standard_Boolean, ClosedTolerance: Standard_Real): void;
  static ConcatC1_2(ArrayOfCurves: any, ArrayOfToler: TColStd_Array1OfReal, ArrayOfIndices: any, ArrayOfConcatenated: any, ClosedFlag: Standard_Boolean, ClosedTolerance: Standard_Real, AngularTolerance: Standard_Real): void;
  static C0BSplineToC1BSplineCurve(BS: any, Tolerance: Standard_Real): void;
  static C0BSplineToArrayOfC1BSplineCurve_1(BS: any, tabBS: any, Tolerance: Standard_Real): void;
  static C0BSplineToArrayOfC1BSplineCurve_2(BS: any, tabBS: any, AngularTolerance: Standard_Real, Tolerance: Standard_Real): void;
  delete(): void;
}

export declare class Geom2dConvert_BSplineCurveToBezierCurve {
  Arc(Index: Standard_Integer): any;
  Arcs(Curves: any): void;
  Knots(TKnots: TColStd_Array1OfReal): void;
  NbArcs(): Standard_Integer;
  delete(): void;
}

  export declare class Geom2dConvert_BSplineCurveToBezierCurve_1 extends Geom2dConvert_BSplineCurveToBezierCurve {
    constructor(BasisCurve: any);
  }

  export declare class Geom2dConvert_BSplineCurveToBezierCurve_2 extends Geom2dConvert_BSplineCurveToBezierCurve {
    constructor(BasisCurve: any, U1: Standard_Real, U2: Standard_Real, ParametricTolerance: Standard_Real);
  }

export declare class GeomLib {
  constructor();
  static To3d(Position: gp_Ax2, Curve2d: any): any;
  static GTransform(Curve: any, GTrsf: gp_GTrsf2d): any;
  static SameRange(Tolerance: Standard_Real, Curve2dPtr: any, First: Standard_Real, Last: Standard_Real, RequestedFirst: Standard_Real, RequestedLast: Standard_Real, NewCurve2dPtr: any): void;
  static BuildCurve3d(Tolerance: Standard_Real, CurvePtr: Adaptor3d_CurveOnSurface, FirstParameter: Standard_Real, LastParameter: Standard_Real, NewCurvePtr: any, MaxDeviation: Standard_Real, AverageDeviation: Standard_Real, Continuity: GeomAbs_Shape, MaxDegree: Standard_Integer, MaxSegment: Standard_Integer): void;
  static AdjustExtremity(Curve: any, P1: gp_Pnt, P2: gp_Pnt, T1: gp_Vec, T2: gp_Vec): void;
  static ExtendCurveToPoint(Curve: any, Point: gp_Pnt, Cont: Standard_Integer, After: Standard_Boolean): void;
  static ExtendSurfByLength(Surf: any, Length: Standard_Real, Cont: Standard_Integer, InU: Standard_Boolean, After: Standard_Boolean): void;
  static AxeOfInertia(Points: TColgp_Array1OfPnt, Axe: gp_Ax2, IsSingular: Standard_Boolean, Tol: Standard_Real): void;
  static Inertia(Points: TColgp_Array1OfPnt, Bary: gp_Pnt, XDir: gp_Dir, YDir: gp_Dir, Xgap: Standard_Real, YGap: Standard_Real, ZGap: Standard_Real): void;
  static RemovePointsFromArray(NumPoints: Standard_Integer, InParameters: TColStd_Array1OfReal, OutParameters: any): void;
  static DensifyArray1OfReal(MinNumPoints: Standard_Integer, InParameters: TColStd_Array1OfReal, OutParameters: any): void;
  static FuseIntervals(Interval1: TColStd_Array1OfReal, Interval2: TColStd_Array1OfReal, Fusion: TColStd_SequenceOfReal, Confusion: Standard_Real, IsAdjustToFirstInterval: Standard_Boolean): void;
  static EvalMaxParametricDistance(Curve: Adaptor3d_Curve, AReferenceCurve: Adaptor3d_Curve, Tolerance: Standard_Real, Parameters: TColStd_Array1OfReal, MaxDistance: Standard_Real): void;
  static EvalMaxDistanceAlongParameter(Curve: Adaptor3d_Curve, AReferenceCurve: Adaptor3d_Curve, Tolerance: Standard_Real, Parameters: TColStd_Array1OfReal, MaxDistance: Standard_Real): void;
  static CancelDenominatorDerivative(BSurf: any, UDirection: Standard_Boolean, VDirection: Standard_Boolean): void;
  static NormEstim(theSurf: any, theUV: gp_Pnt2d, theTol: Standard_Real, theNorm: gp_Dir): Standard_Integer;
  static IsClosed(S: any, Tol: Standard_Real, isUClosed: Standard_Boolean, isVClosed: Standard_Boolean): void;
  static IsBSplUClosed(S: any, U1: Standard_Real, U2: Standard_Real, Tol: Standard_Real): Standard_Boolean;
  static IsBSplVClosed(S: any, V1: Standard_Real, V2: Standard_Real, Tol: Standard_Real): Standard_Boolean;
  static IsBzUClosed(S: any, U1: Standard_Real, U2: Standard_Real, Tol: Standard_Real): Standard_Boolean;
  static IsBzVClosed(S: any, V1: Standard_Real, V2: Standard_Real, Tol: Standard_Real): Standard_Boolean;
  static isIsoLine(theC2D: any, theIsU: Standard_Boolean, theParam: Standard_Real, theIsForward: Standard_Boolean): Standard_Boolean;
  static buildC3dOnIsoLine(theC2D: any, theSurf: any, theFirst: Standard_Real, theLast: Standard_Real, theTolerance: Standard_Real, theIsU: Standard_Boolean, theParam: Standard_Real, theIsForward: Standard_Boolean): any;
  delete(): void;
}

export declare class GCE2d_MakeArcOfEllipse extends GCE2d_Root {
  Value(): any;
  delete(): void;
}

  export declare class GCE2d_MakeArcOfEllipse_1 extends GCE2d_MakeArcOfEllipse {
    constructor(Elips: gp_Elips2d, Alpha1: Standard_Real, Alpha2: Standard_Real, Sense: Standard_Boolean);
  }

  export declare class GCE2d_MakeArcOfEllipse_2 extends GCE2d_MakeArcOfEllipse {
    constructor(Elips: gp_Elips2d, P: gp_Pnt2d, Alpha: Standard_Real, Sense: Standard_Boolean);
  }

  export declare class GCE2d_MakeArcOfEllipse_3 extends GCE2d_MakeArcOfEllipse {
    constructor(Elips: gp_Elips2d, P1: gp_Pnt2d, P2: gp_Pnt2d, Sense: Standard_Boolean);
  }

export declare class GCE2d_MakeEllipse extends GCE2d_Root {
  Value(): any;
  delete(): void;
}

  export declare class GCE2d_MakeEllipse_1 extends GCE2d_MakeEllipse {
    constructor(E: gp_Elips2d);
  }

  export declare class GCE2d_MakeEllipse_2 extends GCE2d_MakeEllipse {
    constructor(MajorAxis: gp_Ax2d, MajorRadius: Standard_Real, MinorRadius: Standard_Real, Sense: Standard_Boolean);
  }

  export declare class GCE2d_MakeEllipse_3 extends GCE2d_MakeEllipse {
    constructor(Axis: gp_Ax22d, MajorRadius: Standard_Real, MinorRadius: Standard_Real);
  }

  export declare class GCE2d_MakeEllipse_4 extends GCE2d_MakeEllipse {
    constructor(S1: gp_Pnt2d, S2: gp_Pnt2d, Center: gp_Pnt2d);
  }

export declare class GCE2d_MakeSegment extends GCE2d_Root {
  Value(): any;
  delete(): void;
}

  export declare class GCE2d_MakeSegment_1 extends GCE2d_MakeSegment {
    constructor(P1: gp_Pnt2d, P2: gp_Pnt2d);
  }

  export declare class GCE2d_MakeSegment_2 extends GCE2d_MakeSegment {
    constructor(P1: gp_Pnt2d, V: gp_Dir2d, P2: gp_Pnt2d);
  }

  export declare class GCE2d_MakeSegment_3 extends GCE2d_MakeSegment {
    constructor(Line: gp_Lin2d, U1: Standard_Real, U2: Standard_Real);
  }

  export declare class GCE2d_MakeSegment_4 extends GCE2d_MakeSegment {
    constructor(Line: gp_Lin2d, Point: gp_Pnt2d, Ulast: Standard_Real);
  }

  export declare class GCE2d_MakeSegment_5 extends GCE2d_MakeSegment {
    constructor(Line: gp_Lin2d, P1: gp_Pnt2d, P2: gp_Pnt2d);
  }

export declare class GCE2d_MakeArcOfCircle extends GCE2d_Root {
  Value(): any;
  delete(): void;
}

  export declare class GCE2d_MakeArcOfCircle_1 extends GCE2d_MakeArcOfCircle {
    constructor(Circ: gp_Circ2d, Alpha1: Standard_Real, Alpha2: Standard_Real, Sense: Standard_Boolean);
  }

  export declare class GCE2d_MakeArcOfCircle_2 extends GCE2d_MakeArcOfCircle {
    constructor(Circ: gp_Circ2d, P: gp_Pnt2d, Alpha: Standard_Real, Sense: Standard_Boolean);
  }

  export declare class GCE2d_MakeArcOfCircle_3 extends GCE2d_MakeArcOfCircle {
    constructor(Circ: gp_Circ2d, P1: gp_Pnt2d, P2: gp_Pnt2d, Sense: Standard_Boolean);
  }

  export declare class GCE2d_MakeArcOfCircle_4 extends GCE2d_MakeArcOfCircle {
    constructor(P1: gp_Pnt2d, P2: gp_Pnt2d, P3: gp_Pnt2d);
  }

  export declare class GCE2d_MakeArcOfCircle_5 extends GCE2d_MakeArcOfCircle {
    constructor(P1: gp_Pnt2d, V: gp_Vec2d, P2: gp_Pnt2d);
  }

export declare class GCE2d_MakeCircle extends GCE2d_Root {
  Value(): any;
  delete(): void;
}

  export declare class GCE2d_MakeCircle_1 extends GCE2d_MakeCircle {
    constructor(C: gp_Circ2d);
  }

  export declare class GCE2d_MakeCircle_2 extends GCE2d_MakeCircle {
    constructor(A: gp_Ax2d, Radius: Standard_Real, Sense: Standard_Boolean);
  }

  export declare class GCE2d_MakeCircle_3 extends GCE2d_MakeCircle {
    constructor(A: gp_Ax22d, Radius: Standard_Real);
  }

  export declare class GCE2d_MakeCircle_4 extends GCE2d_MakeCircle {
    constructor(Circ: gp_Circ2d, Dist: Standard_Real);
  }

  export declare class GCE2d_MakeCircle_5 extends GCE2d_MakeCircle {
    constructor(Circ: gp_Circ2d, Point: gp_Pnt2d);
  }

  export declare class GCE2d_MakeCircle_6 extends GCE2d_MakeCircle {
    constructor(P1: gp_Pnt2d, P2: gp_Pnt2d, P3: gp_Pnt2d);
  }

  export declare class GCE2d_MakeCircle_7 extends GCE2d_MakeCircle {
    constructor(P: gp_Pnt2d, Radius: Standard_Real, Sense: Standard_Boolean);
  }

  export declare class GCE2d_MakeCircle_8 extends GCE2d_MakeCircle {
    constructor(Center: gp_Pnt2d, Point: gp_Pnt2d, Sense: Standard_Boolean);
  }

export declare class GCE2d_Root {
  constructor();
  IsDone(): Standard_Boolean;
  Status(): gce_ErrorType;
  delete(): void;
}

export declare type Extrema_ExtAlgo = {
  Extrema_ExtAlgo_Grad: {};
  Extrema_ExtAlgo_Tree: {};
}

export declare class GCPnts_TangentialDeflection {
  Initialize_1(theC: Adaptor3d_Curve, theAngularDeflection: Standard_Real, theCurvatureDeflection: Standard_Real, theMinimumOfPoints: Standard_Integer, theUTol: Standard_Real, theMinLen: Standard_Real): void;
  Initialize_2(theC: Adaptor3d_Curve, theFirstParameter: Standard_Real, theLastParameter: Standard_Real, theAngularDeflection: Standard_Real, theCurvatureDeflection: Standard_Real, theMinimumOfPoints: Standard_Integer, theUTol: Standard_Real, theMinLen: Standard_Real): void;
  Initialize_3(theC: Adaptor2d_Curve2d, theAngularDeflection: Standard_Real, theCurvatureDeflection: Standard_Real, theMinimumOfPoints: Standard_Integer, theUTol: Standard_Real, theMinLen: Standard_Real): void;
  Initialize_4(theC: Adaptor2d_Curve2d, theFirstParameter: Standard_Real, theLastParameter: Standard_Real, theAngularDeflection: Standard_Real, theCurvatureDeflection: Standard_Real, theMinimumOfPoints: Standard_Integer, theUTol: Standard_Real, theMinLen: Standard_Real): void;
  AddPoint(thePnt: gp_Pnt, theParam: Standard_Real, theIsReplace: Standard_Boolean): Standard_Integer;
  NbPoints(): Standard_Integer;
  Parameter(I: Standard_Integer): Standard_Real;
  Value(I: Standard_Integer): gp_Pnt;
  static ArcAngularStep(theRadius: Standard_Real, theLinearDeflection: Standard_Real, theAngularDeflection: Standard_Real, theMinLength: Standard_Real): Standard_Real;
  delete(): void;
}

  export declare class GCPnts_TangentialDeflection_1 extends GCPnts_TangentialDeflection {
    constructor();
  }

  export declare class GCPnts_TangentialDeflection_2 extends GCPnts_TangentialDeflection {
    constructor(theC: Adaptor3d_Curve, theAngularDeflection: Standard_Real, theCurvatureDeflection: Standard_Real, theMinimumOfPoints: Standard_Integer, theUTol: Standard_Real, theMinLen: Standard_Real);
  }

  export declare class GCPnts_TangentialDeflection_3 extends GCPnts_TangentialDeflection {
    constructor(theC: Adaptor3d_Curve, theFirstParameter: Standard_Real, theLastParameter: Standard_Real, theAngularDeflection: Standard_Real, theCurvatureDeflection: Standard_Real, theMinimumOfPoints: Standard_Integer, theUTol: Standard_Real, theMinLen: Standard_Real);
  }

  export declare class GCPnts_TangentialDeflection_4 extends GCPnts_TangentialDeflection {
    constructor(theC: Adaptor2d_Curve2d, theAngularDeflection: Standard_Real, theCurvatureDeflection: Standard_Real, theMinimumOfPoints: Standard_Integer, theUTol: Standard_Real, theMinLen: Standard_Real);
  }

  export declare class GCPnts_TangentialDeflection_5 extends GCPnts_TangentialDeflection {
    constructor(theC: Adaptor2d_Curve2d, theFirstParameter: Standard_Real, theLastParameter: Standard_Real, theAngularDeflection: Standard_Real, theCurvatureDeflection: Standard_Real, theMinimumOfPoints: Standard_Integer, theUTol: Standard_Real, theMinLen: Standard_Real);
  }

export declare class GC_MakeArcOfCircle extends GC_Root {
  Value(): any;
  delete(): void;
}

  export declare class GC_MakeArcOfCircle_1 extends GC_MakeArcOfCircle {
    constructor(Circ: gp_Circ, Alpha1: Standard_Real, Alpha2: Standard_Real, Sense: Standard_Boolean);
  }

  export declare class GC_MakeArcOfCircle_2 extends GC_MakeArcOfCircle {
    constructor(Circ: gp_Circ, P: gp_Pnt, Alpha: Standard_Real, Sense: Standard_Boolean);
  }

  export declare class GC_MakeArcOfCircle_3 extends GC_MakeArcOfCircle {
    constructor(Circ: gp_Circ, P1: gp_Pnt, P2: gp_Pnt, Sense: Standard_Boolean);
  }

  export declare class GC_MakeArcOfCircle_4 extends GC_MakeArcOfCircle {
    constructor(P1: gp_Pnt, P2: gp_Pnt, P3: gp_Pnt);
  }

  export declare class GC_MakeArcOfCircle_5 extends GC_MakeArcOfCircle {
    constructor(P1: gp_Pnt, V: gp_Vec, P2: gp_Pnt);
  }

export declare class GC_Root {
  constructor();
  IsDone(): Standard_Boolean;
  Status(): gce_ErrorType;
  delete(): void;
}

export declare class BndLib_Add2dCurve {
  constructor();
  static Add_1(C: Adaptor2d_Curve2d, Tol: Standard_Real, B: Bnd_Box2d): void;
  static Add_2(C: Adaptor2d_Curve2d, U1: Standard_Real, U2: Standard_Real, Tol: Standard_Real, B: Bnd_Box2d): void;
  static Add_3(C: any, Tol: Standard_Real, Box: Bnd_Box2d): void;
  static Add_4(C: any, U1: Standard_Real, U2: Standard_Real, Tol: Standard_Real, B: Bnd_Box2d): void;
  static AddOptimal(C: any, U1: Standard_Real, U2: Standard_Real, Tol: Standard_Real, B: Bnd_Box2d): void;
  delete(): void;
}

export declare class GeomConvert {
  constructor();
  static SplitBSplineCurve_1(C: any, FromK1: Standard_Integer, ToK2: Standard_Integer, SameOrientation: Standard_Boolean): any;
  static SplitBSplineCurve_2(C: any, FromU1: Standard_Real, ToU2: Standard_Real, ParametricTolerance: Standard_Real, SameOrientation: Standard_Boolean): any;
  static SplitBSplineSurface_1(S: any, FromUK1: Standard_Integer, ToUK2: Standard_Integer, FromVK1: Standard_Integer, ToVK2: Standard_Integer, SameUOrientation: Standard_Boolean, SameVOrientation: Standard_Boolean): any;
  static SplitBSplineSurface_2(S: any, FromK1: Standard_Integer, ToK2: Standard_Integer, USplit: Standard_Boolean, SameOrientation: Standard_Boolean): any;
  static SplitBSplineSurface_3(S: any, FromU1: Standard_Real, ToU2: Standard_Real, FromV1: Standard_Real, ToV2: Standard_Real, ParametricTolerance: Standard_Real, SameUOrientation: Standard_Boolean, SameVOrientation: Standard_Boolean): any;
  static SplitBSplineSurface_4(S: any, FromParam1: Standard_Real, ToParam2: Standard_Real, USplit: Standard_Boolean, ParametricTolerance: Standard_Real, SameOrientation: Standard_Boolean): any;
  static CurveToBSplineCurve(C: any, Parameterisation: Convert_ParameterisationType): any;
  static SurfaceToBSplineSurface(S: any): any;
  static ConcatG1(ArrayOfCurves: any, ArrayOfToler: TColStd_Array1OfReal, ArrayOfConcatenated: any, ClosedFlag: Standard_Boolean, ClosedTolerance: Standard_Real): void;
  static ConcatC1_1(ArrayOfCurves: any, ArrayOfToler: TColStd_Array1OfReal, ArrayOfIndices: any, ArrayOfConcatenated: any, ClosedFlag: Standard_Boolean, ClosedTolerance: Standard_Real): void;
  static ConcatC1_2(ArrayOfCurves: any, ArrayOfToler: TColStd_Array1OfReal, ArrayOfIndices: any, ArrayOfConcatenated: any, ClosedFlag: Standard_Boolean, ClosedTolerance: Standard_Real, AngularTolerance: Standard_Real): void;
  static C0BSplineToC1BSplineCurve(BS: any, tolerance: Standard_Real, AngularTolerance: Standard_Real): void;
  static C0BSplineToArrayOfC1BSplineCurve_1(BS: any, tabBS: any, tolerance: Standard_Real): void;
  static C0BSplineToArrayOfC1BSplineCurve_2(BS: any, tabBS: any, AngularTolerance: Standard_Real, tolerance: Standard_Real): void;
  delete(): void;
}

export declare class TopoDS_Vertex extends TopoDS_Shape {
  constructor()
  delete(): void;
}

export declare class TopoDS_Compound extends TopoDS_Shape {
  constructor()
  delete(): void;
}

export declare class TopoDS_Face extends TopoDS_Shape {
  constructor()
  delete(): void;
}

export declare class TopoDS_Builder {
  constructor();
  MakeWire(W: TopoDS_Wire): void;
  MakeShell(S: TopoDS_Shell): void;
  MakeSolid(S: TopoDS_Solid): void;
  MakeCompSolid(C: TopoDS_CompSolid): void;
  MakeCompound(C: TopoDS_Compound): void;
  Add(S: TopoDS_Shape, C: TopoDS_Shape): void;
  Remove(S: TopoDS_Shape, C: TopoDS_Shape): void;
  delete(): void;
}

export declare class TopoDS_CompSolid extends TopoDS_Shape {
  constructor()
  delete(): void;
}

export declare class TopoDS_Edge extends TopoDS_Shape {
  constructor()
  delete(): void;
}

export declare class TopoDS_Solid extends TopoDS_Shape {
  constructor()
  delete(): void;
}

export declare class TopoDS_Wire extends TopoDS_Shape {
  constructor()
  delete(): void;
}

export declare class TopoDS_Shell extends TopoDS_Shape {
  constructor()
  delete(): void;
}

export declare class TopoDS_Shape {
  constructor()
  IsNull(): Standard_Boolean;
  Nullify(): void;
  Location_1(): TopLoc_Location;
  Location_2(theLoc: TopLoc_Location, theRaiseExc: Standard_Boolean): void;
  Located(theLoc: TopLoc_Location, theRaiseExc: Standard_Boolean): TopoDS_Shape;
  Orientation_1(): TopAbs_Orientation;
  Orientation_2(theOrient: TopAbs_Orientation): void;
  Oriented(theOrient: TopAbs_Orientation): TopoDS_Shape;
  TShape_1(): any;
  ShapeType(): TopAbs_ShapeEnum;
  Free_1(): Standard_Boolean;
  Free_2(theIsFree: Standard_Boolean): void;
  Locked_1(): Standard_Boolean;
  Locked_2(theIsLocked: Standard_Boolean): void;
  Modified_1(): Standard_Boolean;
  Modified_2(theIsModified: Standard_Boolean): void;
  Checked_1(): Standard_Boolean;
  Checked_2(theIsChecked: Standard_Boolean): void;
  Orientable_1(): Standard_Boolean;
  Orientable_2(theIsOrientable: Standard_Boolean): void;
  Closed_1(): Standard_Boolean;
  Closed_2(theIsClosed: Standard_Boolean): void;
  Infinite_1(): Standard_Boolean;
  Infinite_2(theIsInfinite: Standard_Boolean): void;
  Convex_1(): Standard_Boolean;
  Convex_2(theIsConvex: Standard_Boolean): void;
  Move(thePosition: TopLoc_Location, theRaiseExc: Standard_Boolean): void;
  Moved(thePosition: TopLoc_Location, theRaiseExc: Standard_Boolean): TopoDS_Shape;
  Reverse(): void;
  Reversed(): TopoDS_Shape;
  Complement(): void;
  Complemented(): TopoDS_Shape;
  Compose(theOrient: TopAbs_Orientation): void;
  Composed(theOrient: TopAbs_Orientation): TopoDS_Shape;
  NbChildren(): Standard_Integer;
  IsPartner(theOther: TopoDS_Shape): Standard_Boolean;
  IsSame(theOther: TopoDS_Shape): Standard_Boolean;
  IsEqual(theOther: TopoDS_Shape): Standard_Boolean;
  IsNotEqual(theOther: TopoDS_Shape): Standard_Boolean;
  EmptyCopy(): void;
  EmptyCopied(): TopoDS_Shape;
  TShape_2(theTShape: any): void;
  delete(): void;
}

export declare class BRepTools {
  constructor();
  static UVBounds_1(F: TopoDS_Face, UMin: Standard_Real, UMax: Standard_Real, VMin: Standard_Real, VMax: Standard_Real): void;
  static UVBounds_2(F: TopoDS_Face, W: TopoDS_Wire, UMin: Standard_Real, UMax: Standard_Real, VMin: Standard_Real, VMax: Standard_Real): void;
  static UVBounds_3(F: TopoDS_Face, E: TopoDS_Edge, UMin: Standard_Real, UMax: Standard_Real, VMin: Standard_Real, VMax: Standard_Real): void;
  static AddUVBounds_1(F: TopoDS_Face, B: Bnd_Box2d): void;
  static AddUVBounds_2(F: TopoDS_Face, W: TopoDS_Wire, B: Bnd_Box2d): void;
  static AddUVBounds_3(F: TopoDS_Face, E: TopoDS_Edge, B: Bnd_Box2d): void;
  static Update_1(V: TopoDS_Vertex): void;
  static Update_2(E: TopoDS_Edge): void;
  static Update_3(W: TopoDS_Wire): void;
  static Update_4(F: TopoDS_Face): void;
  static Update_5(S: TopoDS_Shell): void;
  static Update_6(S: TopoDS_Solid): void;
  static Update_7(C: TopoDS_CompSolid): void;
  static Update_8(C: TopoDS_Compound): void;
  static Update_9(S: TopoDS_Shape): void;
  static UpdateFaceUVPoints(theF: TopoDS_Face): void;
  static Clean(theShape: TopoDS_Shape, theForce: Standard_Boolean): void;
  static CleanGeometry(theShape: TopoDS_Shape): void;
  static RemoveUnusedPCurves(S: TopoDS_Shape): void;
  static Triangulation(theShape: TopoDS_Shape, theLinDefl: Standard_Real, theToCheckFreeEdges: Standard_Boolean): Standard_Boolean;
  static LoadTriangulation(theShape: TopoDS_Shape, theTriangulationIdx: Standard_Integer, theToSetAsActive: Standard_Boolean, theFileSystem: any): Standard_Boolean;
  static UnloadTriangulation(theShape: TopoDS_Shape, theTriangulationIdx: Standard_Integer): Standard_Boolean;
  static ActivateTriangulation(theShape: TopoDS_Shape, theTriangulationIdx: Standard_Integer, theToActivateStrictly: Standard_Boolean): Standard_Boolean;
  static LoadAllTriangulations(theShape: TopoDS_Shape, theFileSystem: any): Standard_Boolean;
  static UnloadAllTriangulations(theShape: TopoDS_Shape): Standard_Boolean;
  static Compare_1(V1: TopoDS_Vertex, V2: TopoDS_Vertex): Standard_Boolean;
  static Compare_2(E1: TopoDS_Edge, E2: TopoDS_Edge): Standard_Boolean;
  static OuterWire(F: TopoDS_Face): TopoDS_Wire;
  static Map3DEdges(S: TopoDS_Shape, M: TopTools_IndexedMapOfShape): void;
  static IsReallyClosed(E: TopoDS_Edge, F: TopoDS_Face): Standard_Boolean;
  static DetectClosedness(theFace: TopoDS_Face, theUclosed: Standard_Boolean, theVclosed: Standard_Boolean): void;
  static Write_3(theShape: TopoDS_Shape, theFile: Standard_Character, theProgress: Message_ProgressRange): Standard_Boolean;
  static Write_4(theShape: TopoDS_Shape, theFile: Standard_Character, theWithTriangles: Standard_Boolean, theWithNormals: Standard_Boolean, theVersion: TopTools_FormatVersion, theProgress: Message_ProgressRange): Standard_Boolean;
  static Read_2(Sh: TopoDS_Shape, File: Standard_Character, B: BRep_Builder, theProgress: Message_ProgressRange): Standard_Boolean;
  static EvalAndUpdateTol(theE: TopoDS_Edge, theC3d: any, theC2d: any, theS: any, theF: Standard_Real, theL: Standard_Real): Standard_Real;
  static OriEdgeInFace(theEdge: TopoDS_Edge, theFace: TopoDS_Face): TopAbs_Orientation;
  static RemoveInternals(theS: TopoDS_Shape, theForce: Standard_Boolean): void;
  static CheckLocations(theS: TopoDS_Shape, theProblemShapes: TopTools_ListOfShape): void;
  delete(): void;
}

export declare class BRep_Tool {
  constructor();
  static IsClosed_1(S: TopoDS_Shape): Standard_Boolean;
  static Surface_1(F: TopoDS_Face, L: TopLoc_Location): any;
  static Surface_2(F: TopoDS_Face): any;
  static Triangulation(theFace: TopoDS_Face, theLocation: TopLoc_Location, theMeshPurpose: Poly_MeshPurpose): any;
  static Triangulations(theFace: TopoDS_Face, theLocation: TopLoc_Location): any;
  static Tolerance_1(F: TopoDS_Face): Standard_Real;
  static NaturalRestriction(F: TopoDS_Face): Standard_Boolean;
  static IsGeometric_1(F: TopoDS_Face): Standard_Boolean;
  static IsGeometric_2(E: TopoDS_Edge): Standard_Boolean;
  static Curve_1(E: TopoDS_Edge, L: TopLoc_Location, First: Standard_Real, Last: Standard_Real): any;
  static Curve_2(E: TopoDS_Edge, First: Standard_Real, Last: Standard_Real): any;
  static Polygon3D(E: TopoDS_Edge, L: TopLoc_Location): any;
  static CurveOnSurface_1(E: TopoDS_Edge, F: TopoDS_Face, First: Standard_Real, Last: Standard_Real, theIsStored: Standard_Boolean): any;
  static CurveOnSurface_2(E: TopoDS_Edge, S: any, L: TopLoc_Location, First: Standard_Real, Last: Standard_Real, theIsStored: Standard_Boolean): any;
  static CurveOnPlane(E: TopoDS_Edge, S: any, L: TopLoc_Location, First: Standard_Real, Last: Standard_Real): any;
  static CurveOnSurface_3(E: TopoDS_Edge, C: any, S: any, L: TopLoc_Location, First: Standard_Real, Last: Standard_Real): void;
  static CurveOnSurface_4(E: TopoDS_Edge, C: any, S: any, L: TopLoc_Location, First: Standard_Real, Last: Standard_Real, Index: Standard_Integer): void;
  static PolygonOnSurface_1(E: TopoDS_Edge, F: TopoDS_Face): any;
  static PolygonOnSurface_2(E: TopoDS_Edge, S: any, L: TopLoc_Location): any;
  static PolygonOnSurface_3(E: TopoDS_Edge, C: any, S: any, L: TopLoc_Location): void;
  static PolygonOnSurface_4(E: TopoDS_Edge, C: any, S: any, L: TopLoc_Location, Index: Standard_Integer): void;
  static PolygonOnTriangulation_1(E: TopoDS_Edge, T: any, L: TopLoc_Location): any;
  static PolygonOnTriangulation_2(E: TopoDS_Edge, P: any, T: any, L: TopLoc_Location): void;
  static PolygonOnTriangulation_3(E: TopoDS_Edge, P: any, T: any, L: TopLoc_Location, Index: Standard_Integer): void;
  static IsClosed_2(E: TopoDS_Edge, F: TopoDS_Face): Standard_Boolean;
  static IsClosed_3(E: TopoDS_Edge, S: any, L: TopLoc_Location): Standard_Boolean;
  static IsClosed_4(E: TopoDS_Edge, T: any, L: TopLoc_Location): Standard_Boolean;
  static Tolerance_2(E: TopoDS_Edge): Standard_Real;
  static SameParameter(E: TopoDS_Edge): Standard_Boolean;
  static SameRange(E: TopoDS_Edge): Standard_Boolean;
  static Degenerated(E: TopoDS_Edge): Standard_Boolean;
  static Range_1(E: TopoDS_Edge, First: Standard_Real, Last: Standard_Real): void;
  static Range_2(E: TopoDS_Edge, S: any, L: TopLoc_Location, First: Standard_Real, Last: Standard_Real): void;
  static Range_3(E: TopoDS_Edge, F: TopoDS_Face, First: Standard_Real, Last: Standard_Real): void;
  static UVPoints_1(E: TopoDS_Edge, S: any, L: TopLoc_Location, PFirst: gp_Pnt2d, PLast: gp_Pnt2d): void;
  static UVPoints_2(E: TopoDS_Edge, F: TopoDS_Face, PFirst: gp_Pnt2d, PLast: gp_Pnt2d): void;
  static SetUVPoints_1(E: TopoDS_Edge, S: any, L: TopLoc_Location, PFirst: gp_Pnt2d, PLast: gp_Pnt2d): void;
  static SetUVPoints_2(E: TopoDS_Edge, F: TopoDS_Face, PFirst: gp_Pnt2d, PLast: gp_Pnt2d): void;
  static HasContinuity_1(E: TopoDS_Edge, F1: TopoDS_Face, F2: TopoDS_Face): Standard_Boolean;
  static Continuity_1(E: TopoDS_Edge, F1: TopoDS_Face, F2: TopoDS_Face): GeomAbs_Shape;
  static HasContinuity_2(E: TopoDS_Edge, S1: any, S2: any, L1: TopLoc_Location, L2: TopLoc_Location): Standard_Boolean;
  static Continuity_2(E: TopoDS_Edge, S1: any, S2: any, L1: TopLoc_Location, L2: TopLoc_Location): GeomAbs_Shape;
  static HasContinuity_3(E: TopoDS_Edge): Standard_Boolean;
  static MaxContinuity(theEdge: TopoDS_Edge): GeomAbs_Shape;
  static Pnt(V: TopoDS_Vertex): gp_Pnt;
  static Tolerance_3(V: TopoDS_Vertex): Standard_Real;
  static Parameter_1(theV: TopoDS_Vertex, theE: TopoDS_Edge, theParam: Standard_Real): Standard_Boolean;
  static Parameter_2(V: TopoDS_Vertex, E: TopoDS_Edge): Standard_Real;
  static Parameter_3(V: TopoDS_Vertex, E: TopoDS_Edge, F: TopoDS_Face): Standard_Real;
  static Parameter_4(V: TopoDS_Vertex, E: TopoDS_Edge, S: any, L: TopLoc_Location): Standard_Real;
  static Parameters(V: TopoDS_Vertex, F: TopoDS_Face): gp_Pnt2d;
  static MaxTolerance(theShape: TopoDS_Shape, theSubShape: TopAbs_ShapeEnum): Standard_Real;
  delete(): void;
}

export declare class BRepAdaptor_Surface extends GeomAdaptor_TransformedSurface {
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): any;
  DynamicType(): any;
  ShallowCopy(): any;
  Initialize(F: TopoDS_Face, Restriction: Standard_Boolean): void;
  Face(): TopoDS_Face;
  Tolerance(): Standard_Real;
  delete(): void;
}

  export declare class BRepAdaptor_Surface_1 extends BRepAdaptor_Surface {
    constructor();
  }

  export declare class BRepAdaptor_Surface_2 extends BRepAdaptor_Surface {
    constructor(F: TopoDS_Face, R: Standard_Boolean);
  }

export declare class BRepAdaptor_CompCurve extends Adaptor3d_Curve {
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): any;
  DynamicType(): any;
  ShallowCopy(): any;
  Initialize_1(W: TopoDS_Wire, KnotByCurvilinearAbcissa: Standard_Boolean): void;
  Initialize_2(W: TopoDS_Wire, KnotByCurvilinearAbcissa: Standard_Boolean, First: Standard_Real, Last: Standard_Real, Tol: Standard_Real): void;
  Wire(): TopoDS_Wire;
  Edge(U: Standard_Real, E: TopoDS_Edge, UonE: Standard_Real): void;
  FirstParameter(): Standard_Real;
  LastParameter(): Standard_Real;
  Continuity(): GeomAbs_Shape;
  NbIntervals(S: GeomAbs_Shape): Standard_Integer;
  Intervals(T: TColStd_Array1OfReal, S: GeomAbs_Shape): void;
  Trim(First: Standard_Real, Last: Standard_Real, Tol: Standard_Real): any;
  IsClosed(): Standard_Boolean;
  IsPeriodic(): Standard_Boolean;
  Period(): Standard_Real;
  Value(U: Standard_Real): gp_Pnt;
  D0(U: Standard_Real, P: gp_Pnt): void;
  D1(U: Standard_Real, P: gp_Pnt, V: gp_Vec): void;
  D2(U: Standard_Real, P: gp_Pnt, V1: gp_Vec, V2: gp_Vec): void;
  D3(U: Standard_Real, P: gp_Pnt, V1: gp_Vec, V2: gp_Vec, V3: gp_Vec): void;
  DN(U: Standard_Real, N: Standard_Integer): gp_Vec;
  Resolution(R3d: Standard_Real): Standard_Real;
  GetType(): GeomAbs_CurveType;
  Line(): gp_Lin;
  Circle(): gp_Circ;
  Ellipse(): gp_Elips;
  Hyperbola(): gp_Hypr;
  Parabola(): gp_Parab;
  Degree(): Standard_Integer;
  IsRational(): Standard_Boolean;
  NbPoles(): Standard_Integer;
  NbKnots(): Standard_Integer;
  Bezier(): any;
  BSpline(): any;
  delete(): void;
}

  export declare class BRepAdaptor_CompCurve_1 extends BRepAdaptor_CompCurve {
    constructor();
  }

  export declare class BRepAdaptor_CompCurve_2 extends BRepAdaptor_CompCurve {
    constructor(W: TopoDS_Wire, KnotByCurvilinearAbcissa: Standard_Boolean);
  }

  export declare class BRepAdaptor_CompCurve_3 extends BRepAdaptor_CompCurve {
    constructor(W: TopoDS_Wire, KnotByCurvilinearAbcissa: Standard_Boolean, First: Standard_Real, Last: Standard_Real, Tol: Standard_Real);
  }

export declare class BRepAdaptor_Curve extends Adaptor3d_Curve {
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): any;
  DynamicType(): any;
  ShallowCopy(): any;
  Reset(): void;
  Initialize_1(E: TopoDS_Edge): void;
  Initialize_2(E: TopoDS_Edge, F: TopoDS_Face): void;
  Trsf(): gp_Trsf;
  Is3DCurve(): Standard_Boolean;
  IsCurveOnSurface(): Standard_Boolean;
  Curve(): GeomAdaptor_Curve;
  CurveOnSurface(): Adaptor3d_CurveOnSurface;
  Edge(): TopoDS_Edge;
  Tolerance(): Standard_Real;
  FirstParameter(): Standard_Real;
  LastParameter(): Standard_Real;
  Continuity(): GeomAbs_Shape;
  NbIntervals(S: GeomAbs_Shape): Standard_Integer;
  Intervals(T: TColStd_Array1OfReal, S: GeomAbs_Shape): void;
  Trim(First: Standard_Real, Last: Standard_Real, Tol: Standard_Real): any;
  IsClosed(): Standard_Boolean;
  IsPeriodic(): Standard_Boolean;
  Period(): Standard_Real;
  Value(U: Standard_Real): gp_Pnt;
  D0(U: Standard_Real, P: gp_Pnt): void;
  D1(U: Standard_Real, P: gp_Pnt, V: gp_Vec): void;
  D2(U: Standard_Real, P: gp_Pnt, V1: gp_Vec, V2: gp_Vec): void;
  D3(U: Standard_Real, P: gp_Pnt, V1: gp_Vec, V2: gp_Vec, V3: gp_Vec): void;
  DN(U: Standard_Real, N: Standard_Integer): gp_Vec;
  Resolution(R3d: Standard_Real): Standard_Real;
  GetType(): GeomAbs_CurveType;
  Line(): gp_Lin;
  Circle(): gp_Circ;
  Ellipse(): gp_Elips;
  Hyperbola(): gp_Hypr;
  Parabola(): gp_Parab;
  Degree(): Standard_Integer;
  IsRational(): Standard_Boolean;
  NbPoles(): Standard_Integer;
  NbKnots(): Standard_Integer;
  Bezier(): any;
  BSpline(): any;
  OffsetCurve(): any;
  delete(): void;
}

  export declare class BRepAdaptor_Curve_1 extends BRepAdaptor_Curve {
    constructor();
  }

  export declare class BRepAdaptor_Curve_2 extends BRepAdaptor_Curve {
    constructor(E: TopoDS_Edge);
  }

  export declare class BRepAdaptor_Curve_3 extends BRepAdaptor_Curve {
    constructor(E: TopoDS_Edge, F: TopoDS_Face);
  }

export declare class BRepAdaptor_Curve2d extends Geom2dAdaptor_Curve {
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): any;
  DynamicType(): any;
  ShallowCopy(): any;
  Initialize(E: TopoDS_Edge, F: TopoDS_Face): void;
  Edge(): TopoDS_Edge;
  Face(): TopoDS_Face;
  delete(): void;
}

  export declare class BRepAdaptor_Curve2d_1 extends BRepAdaptor_Curve2d {
    constructor();
  }

  export declare class BRepAdaptor_Curve2d_2 extends BRepAdaptor_Curve2d {
    constructor(E: TopoDS_Edge, F: TopoDS_Face);
  }

export declare class TopExp_Explorer {
  Init(S: TopoDS_Shape, ToFind: TopAbs_ShapeEnum, ToAvoid: TopAbs_ShapeEnum): void;
  More(): Standard_Boolean;
  Next(): void;
  Value(): TopoDS_Shape;
  Current(): TopoDS_Shape;
  ReInit(): void;
  ExploredShape(): TopoDS_Shape;
  Depth(): Standard_Integer;
  Clear(): void;
  delete(): void;
}

  export declare class TopExp_Explorer_1 extends TopExp_Explorer {
    constructor();
  }

  export declare class TopExp_Explorer_2 extends TopExp_Explorer {
    constructor(S: TopoDS_Shape, ToFind: TopAbs_ShapeEnum, ToAvoid: TopAbs_ShapeEnum);
  }

export declare class StlAPI_Reader {
  constructor();
  Read_1(theShape: TopoDS_Shape, theFileName: Standard_Character): Standard_Boolean;
  delete(): void;
}

export declare class StlAPI {
  constructor();
  static Write(theShape: TopoDS_Shape, theFile: Standard_Character, theAsciiMode: Standard_Boolean): Standard_Boolean;
  static Read(theShape: TopoDS_Shape, aFile: Standard_Character): Standard_Boolean;
  delete(): void;
}

export declare class Interface_Static extends Interface_TypedValue {
  Family(): Standard_Character;
  SetWild(wildcard: any): void;
  Wild(): any;
  SetUptodate(): void;
  UpdatedStatus(): Standard_Boolean;
  static Init_1(family: Standard_Character, name: Standard_Character, type: Interface_ParamType, init: Standard_Character): Standard_Boolean;
  static Init_2(family: Standard_Character, name: Standard_Character, type: Standard_Character, init: Standard_Character): Standard_Boolean;
  static Static(name: Standard_Character): any;
  static IsPresent(name: Standard_Character): Standard_Boolean;
  static CDef(name: Standard_Character, part: Standard_Character): Standard_Character;
  static IDef(name: Standard_Character, part: Standard_Character): Standard_Integer;
  static IsSet(name: Standard_Character, proper: Standard_Boolean): Standard_Boolean;
  static CVal(name: Standard_Character): Standard_Character;
  static IVal(name: Standard_Character): Standard_Integer;
  static RVal(name: Standard_Character): Standard_Real;
  static SetCVal(name: Standard_Character, val: Standard_Character): Standard_Boolean;
  static SetIVal(name: Standard_Character, val: Standard_Integer): Standard_Boolean;
  static SetRVal(name: Standard_Character, val: Standard_Real): Standard_Boolean;
  static Update(name: Standard_Character): Standard_Boolean;
  static IsUpdated(name: Standard_Character): Standard_Boolean;
  static Items(mode: Standard_Integer, criter: Standard_Character): any;
  static Standards(): void;
  static FillMap(theMap: NCollection_DataMap<TCollection_AsciiString, TCollection_AsciiString>): void;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): any;
  DynamicType(): any;
  delete(): void;
}

  export declare class Interface_Static_1 extends Interface_Static {
    constructor(family: Standard_Character, name: Standard_Character, type: Interface_ParamType, init: Standard_Character);
  }

  export declare class Interface_Static_2 extends Interface_Static {
    constructor(family: Standard_Character, name: Standard_Character, other: any);
  }

export declare class Interface_TypedValue extends MoniTool_TypedValue {
  constructor(name: Standard_Character, type: Interface_ParamType, init: Standard_Character)
  Type(): Interface_ParamType;
  static ParamTypeToValueType(typ: Interface_ParamType): MoniTool_ValueType;
  static ValueTypeToParamType(typ: MoniTool_ValueType): Interface_ParamType;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): any;
  DynamicType(): any;
  delete(): void;
}

export declare class MoniTool_TypedValue extends Standard_Transient {
  Name(): Standard_Character;
  ValueType(): MoniTool_ValueType;
  Definition(): XCAFDoc_PartId;
  SetDefinition(deftext: Standard_Character): void;
  AddDef(initext: Standard_Character): Standard_Boolean;
  SetLabel(label: Standard_Character): void;
  Label(): Standard_Character;
  SetMaxLength(max: Standard_Integer): void;
  MaxLength(): Standard_Integer;
  SetIntegerLimit(max: Standard_Boolean, val: Standard_Integer): void;
  IntegerLimit(max: Standard_Boolean, val: Standard_Integer): Standard_Boolean;
  SetRealLimit(max: Standard_Boolean, val: Standard_Real): void;
  RealLimit(max: Standard_Boolean, val: Standard_Real): Standard_Boolean;
  SetUnitDef(def: Standard_Character): void;
  UnitDef(): Standard_Character;
  StartEnum(start: Standard_Integer, match: Standard_Boolean): void;
  AddEnum(v1: Standard_Character, v2: Standard_Character, v3: Standard_Character, v4: Standard_Character, v5: Standard_Character, v6: Standard_Character, v7: Standard_Character, v8: Standard_Character, v9: Standard_Character, v10: Standard_Character): void;
  AddEnumValue(val: Standard_Character, num: Standard_Integer): void;
  EnumDef(startcase: Standard_Integer, endcase: Standard_Integer, match: Standard_Boolean): Standard_Boolean;
  EnumVal(num: Standard_Integer): Standard_Character;
  EnumCase(val: Standard_Character): Standard_Integer;
  SetObjectType(typ: any): void;
  ObjectType(): any;
  SetInterpret(func: MoniTool_ValueInterpret): void;
  HasInterpret(): Standard_Boolean;
  SetSatisfies(func: MoniTool_ValueSatisfies, name: Standard_Character): void;
  SatisfiesName(): Standard_Character;
  IsSetValue(): Standard_Boolean;
  CStringValue(): Standard_Character;
  HStringValue(): any;
  Interpret(hval: any, native: Standard_Boolean): any;
  Satisfies(hval: any): Standard_Boolean;
  ClearValue(): void;
  SetCStringValue(val: Standard_Character): Standard_Boolean;
  SetHStringValue(hval: any): Standard_Boolean;
  IntegerValue(): Standard_Integer;
  SetIntegerValue(ival: Standard_Integer): Standard_Boolean;
  RealValue(): Standard_Real;
  SetRealValue(rval: Standard_Real): Standard_Boolean;
  ObjectValue(): any;
  GetObjectValue(val: any): void;
  SetObjectValue(obj: any): Standard_Boolean;
  ObjectTypeName(): Standard_Character;
  static AddLib(tv: any, def: Standard_Character): Standard_Boolean;
  static Lib(def: Standard_Character): any;
  static FromLib(def: Standard_Character): any;
  static LibList(): any;
  static StaticValue(name: Standard_Character): any;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): any;
  DynamicType(): any;
  delete(): void;
}

  export declare class MoniTool_TypedValue_1 extends MoniTool_TypedValue {
    constructor(name: Standard_Character, type: MoniTool_ValueType, init: Standard_Character);
  }

  export declare class MoniTool_TypedValue_2 extends MoniTool_TypedValue {
    constructor(other: any);
  }

export declare class XSControl_WorkSession extends IFSelect_WorkSession {
  constructor()
  ClearData(theMode: Standard_Integer): void;
  SelectNorm(theNormName: Standard_Character): Standard_Boolean;
  SetController(theCtl: any): void;
  SelectedNorm(theRsc: Standard_Boolean): Standard_Character;
  NormAdaptor(): any;
  Context(): XSControl_WorkSessionMap;
  SetAllContext(theContext: XSControl_WorkSessionMap): void;
  ClearContext(): void;
  InitTransferReader(theMode: Standard_Integer): void;
  SetTransferReader(theTR: any): void;
  TransferReader(): any;
  MapReader(): any;
  SetMapReader(theTP: any): Standard_Boolean;
  Result(theEnt: any, theMode: Standard_Integer): any;
  TransferReadOne(theEnts: any, theProgress: Message_ProgressRange): Standard_Integer;
  TransferReadRoots(theProgress: Message_ProgressRange): Standard_Integer;
  NewModel(): any;
  TransferWriter(): any;
  SetMapWriter(theFP: any): Standard_Boolean;
  TransferWriteShape(theShape: TopoDS_Shape, theCompGraph: Standard_Boolean, theProgress: Message_ProgressRange): IFSelect_ReturnStatus;
  Vars(): any;
  SetVars(theVars: any): void;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): any;
  DynamicType(): any;
  delete(): void;
}

export declare class XSControl_Reader {
  SetNorm(norm: Standard_Character): Standard_Boolean;
  SetWS(WS: any, scratch: Standard_Boolean): void;
  WS(): any;
  ReadFile(filename: Standard_Character): IFSelect_ReturnStatus;
  Model(): any;
  GiveList_1(first: Standard_Character, second: Standard_Character): any;
  GiveList_2(first: Standard_Character, ent: any): any;
  NbRootsForTransfer(): Standard_Integer;
  RootForTransfer(num: Standard_Integer): any;
  TransferOneRoot(num: Standard_Integer, theProgress: Message_ProgressRange): Standard_Boolean;
  TransferOne(num: Standard_Integer, theProgress: Message_ProgressRange): Standard_Boolean;
  TransferEntity(start: any, theProgress: Message_ProgressRange): Standard_Boolean;
  TransferList(list: any, theProgress: Message_ProgressRange): Standard_Integer;
  TransferRoots(theProgress: Message_ProgressRange): Standard_Integer;
  ClearShapes(): void;
  NbShapes(): Standard_Integer;
  Shape(num: Standard_Integer): TopoDS_Shape;
  OneShape(): TopoDS_Shape;
  PrintCheckLoad_1(failsonly: Standard_Boolean, mode: IFSelect_PrintCount): void;
  PrintCheckTransfer_1(failsonly: Standard_Boolean, mode: IFSelect_PrintCount): void;
  PrintStatsTransfer_1(what: Standard_Integer, mode: Standard_Integer): void;
  GetStatsTransfer(list: any, nbMapped: Standard_Integer, nbWithResult: Standard_Integer, nbWithFail: Standard_Integer): void;
  SetShapeFixParameters_1(theParameters: any): void;
  SetShapeFixParameters_2(theParameters: any): void;
  SetShapeFixParameters_3(theParameters: DE_ShapeFixParameters, theAdditionalParameters: any): void;
  GetShapeFixParameters(): any;
  SetShapeProcessFlags(theFlags: any): void;
  GetShapeProcessFlags(): any;
  delete(): void;
}

  export declare class XSControl_Reader_1 extends XSControl_Reader {
    constructor();
  }

  export declare class XSControl_Reader_2 extends XSControl_Reader {
    constructor(norm: Standard_Character);
  }

  export declare class XSControl_Reader_3 extends XSControl_Reader {
    constructor(WS: any, scratch: Standard_Boolean);
  }

export declare class IFSelect_WorkSession extends Standard_Transient {
  constructor()
  SetErrorHandle(toHandle: Standard_Boolean): void;
  ErrorHandle(): Standard_Boolean;
  ShareOut(): any;
  SetShareOut(shareout: any): void;
  SetModeStat(theMode: Standard_Boolean): void;
  GetModeStat(): Standard_Boolean;
  SetLibrary(theLib: any): void;
  WorkLibrary(): any;
  SetProtocol(protocol: any): void;
  Protocol(): any;
  SetSignType(signtype: any): void;
  SignType(): any;
  HasModel(): Standard_Boolean;
  SetModel(model: any, clearpointed: Standard_Boolean): void;
  Model(): any;
  SetLoadedFile(theFileName: Standard_Character): void;
  LoadedFile(): Standard_Character;
  ReadFile(filename: Standard_Character): IFSelect_ReturnStatus;
  NbStartingEntities(): Standard_Integer;
  StartingEntity(num: Standard_Integer): any;
  StartingNumber(ent: any): Standard_Integer;
  NumberFromLabel(val: Standard_Character, afternum: Standard_Integer): Standard_Integer;
  EntityLabel(ent: any): any;
  EntityName(ent: any): any;
  CategoryNumber(ent: any): Standard_Integer;
  CategoryName(ent: any): Standard_Character;
  ValidityName(ent: any): Standard_Character;
  ClearData(mode: Standard_Integer): void;
  ComputeGraph(enforce: Standard_Boolean): Standard_Boolean;
  HGraph(): any;
  Graph(): Interface_Graph;
  Shareds(ent: any): any;
  Sharings(ent: any): any;
  IsLoaded(): Standard_Boolean;
  ComputeCheck(enforce: Standard_Boolean): Standard_Boolean;
  MaxIdent(): Standard_Integer;
  Item(id: Standard_Integer): any;
  ItemIdent(item: any): Standard_Integer;
  NamedItem_1(name: Standard_Character): any;
  NamedItem_2(name: any): any;
  NameIdent(name: Standard_Character): Standard_Integer;
  HasName(item: any): Standard_Boolean;
  Name(item: any): any;
  AddItem(item: any, active: Standard_Boolean): Standard_Integer;
  AddNamedItem(name: Standard_Character, item: any, active: Standard_Boolean): Standard_Integer;
  SetActive(item: any, mode: Standard_Boolean): Standard_Boolean;
  RemoveNamedItem(name: Standard_Character): Standard_Boolean;
  RemoveName(name: Standard_Character): Standard_Boolean;
  RemoveItem(item: any): Standard_Boolean;
  ClearItems(): void;
  ItemLabel(id: Standard_Integer): any;
  ItemIdents(type: any): any;
  ItemNames(type: any): any;
  ItemNamesForLabel(label: Standard_Character): any;
  NextIdentForLabel(label: Standard_Character, id: Standard_Integer, mode: Standard_Integer): Standard_Integer;
  NewParamFromStatic(statname: Standard_Character, name: Standard_Character): any;
  IntParam(id: Standard_Integer): any;
  IntValue(it: any): Standard_Integer;
  NewIntParam(name: Standard_Character): any;
  SetIntValue(it: any, val: Standard_Integer): Standard_Boolean;
  TextParam(id: Standard_Integer): any;
  TextValue(par: any): XCAFDoc_PartId;
  NewTextParam(name: Standard_Character): any;
  SetTextValue(par: any, val: Standard_Character): Standard_Boolean;
  Signature(id: Standard_Integer): any;
  SignValue(sign: any, ent: any): Standard_Character;
  Selection(id: Standard_Integer): any;
  SelectionResult(sel: any): any;
  SelectionResultFromList(sel: any, list: any): any;
  SetItemSelection(item: any, sel: any): Standard_Boolean;
  ResetItemSelection(item: any): Standard_Boolean;
  ItemSelection(item: any): any;
  SignCounter(id: Standard_Integer): any;
  ComputeCounter(counter: any, forced: Standard_Boolean): Standard_Boolean;
  ComputeCounterFromList(counter: any, list: any, clear: Standard_Boolean): Standard_Boolean;
  AppliedDispatches(): any;
  ClearShareOut(onlydisp: Standard_Boolean): void;
  Dispatch(id: Standard_Integer): any;
  DispatchRank(disp: any): Standard_Integer;
  ModelCopier(): any;
  SetModelCopier(copier: any): void;
  NbFinalModifiers(formodel: Standard_Boolean): Standard_Integer;
  FinalModifierIdents(formodel: Standard_Boolean): any;
  GeneralModifier(id: Standard_Integer): any;
  ModelModifier(id: Standard_Integer): any;
  ModifierRank(item: any): Standard_Integer;
  ChangeModifierRank(formodel: Standard_Boolean, before: Standard_Integer, after: Standard_Integer): Standard_Boolean;
  ClearFinalModifiers(): void;
  SetAppliedModifier(modif: any, item: any): Standard_Boolean;
  ResetAppliedModifier(modif: any): Standard_Boolean;
  UsesAppliedModifier(modif: any): any;
  Transformer(id: Standard_Integer): any;
  RunTransformer(transf: any): Standard_Integer;
  RunModifier(modif: any, copy: Standard_Boolean): Standard_Integer;
  RunModifierSelected(modif: any, sel: any, copy: Standard_Boolean): Standard_Integer;
  NewTransformStandard(copy: Standard_Boolean, name: Standard_Character): any;
  SetModelContent(sel: any, keep: Standard_Boolean): Standard_Boolean;
  FilePrefix(): any;
  DefaultFileRoot(): any;
  FileExtension(): any;
  FileRoot(disp: any): any;
  SetFilePrefix(name: Standard_Character): void;
  SetDefaultFileRoot(name: Standard_Character): Standard_Boolean;
  SetFileExtension(name: Standard_Character): void;
  SetFileRoot(disp: any, name: Standard_Character): Standard_Boolean;
  GiveFileRoot(file: Standard_Character): Standard_Character;
  GiveFileComplete(file: Standard_Character): Standard_Character;
  ClearFile(): void;
  EvaluateFile(): void;
  NbFiles(): Standard_Integer;
  FileModel(num: Standard_Integer): any;
  FileName(num: Standard_Integer): XCAFDoc_PartId;
  BeginSentFiles(record: Standard_Boolean): void;
  SentFiles(): any;
  SendSplit(): Standard_Boolean;
  EvalSplit(): any;
  MaxSendingCount(): Standard_Integer;
  SetRemaining(mode: IFSelect_RemainMode): Standard_Boolean;
  SendAll(filename: Standard_Character, computegraph: Standard_Boolean): IFSelect_ReturnStatus;
  SendSelected(filename: Standard_Character, sel: any, computegraph: Standard_Boolean): IFSelect_ReturnStatus;
  WriteFile_1(filename: Standard_Character): IFSelect_ReturnStatus;
  WriteFile_2(filename: Standard_Character, sel: any): IFSelect_ReturnStatus;
  NbSources(sel: any): Standard_Integer;
  Source(sel: any, num: Standard_Integer): any;
  IsReversedSelectExtract(sel: any): Standard_Boolean;
  ToggleSelectExtract(sel: any): Standard_Boolean;
  SetInputSelection(sel: any, input: any): Standard_Boolean;
  SetControl(sel: any, sc: any, formain: Standard_Boolean): Standard_Boolean;
  CombineAdd(selcomb: any, seladd: any, atnum: Standard_Integer): Standard_Integer;
  CombineRemove(selcomb: any, selrem: any): Standard_Boolean;
  NewSelectPointed(list: any, name: Standard_Character): any;
  SetSelectPointed(sel: any, list: any, mode: Standard_Integer): Standard_Boolean;
  GiveSelection(selname: Standard_Character): any;
  GiveList_1(obj: any): any;
  GiveList_2(first: Standard_Character, second: Standard_Character): any;
  GiveListFromList(selname: Standard_Character, ent: any): any;
  GiveListCombined(l1: any, l2: any, mode: Standard_Integer): any;
  QueryCheckStatus(ent: any): Standard_Integer;
  QueryParent(entdad: any, entson: any): Standard_Integer;
  SetParams(params: any, uselist: NCollection_Vector<int>): void;
  TraceStatics(use: Standard_Integer, mode: Standard_Integer): void;
  DumpShare(): void;
  ListItems(label: Standard_Character): void;
  ListFinalModifiers(formodel: Standard_Boolean): void;
  DumpSelection(sel: any): void;
  TraceDumpModel(mode: Standard_Integer): void;
  TraceDumpEntity(ent: any, level: Standard_Integer): void;
  EvaluateSelection(sel: any): void;
  EvaluateDispatch(disp: any, mode: Standard_Integer): void;
  EvaluateComplete(mode: Standard_Integer): void;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): any;
  DynamicType(): any;
  delete(): void;
}

export declare type IFSelect_ReturnStatus = {
  IFSelect_RetVoid: {};
  IFSelect_RetDone: {};
  IFSelect_RetError: {};
  IFSelect_RetFail: {};
  IFSelect_RetStop: {};
}

export declare class STEPCAFControl_Writer {
  Init(theWS: any, theScratch: Standard_Boolean): void;
  Write(theFileName: Standard_Character): IFSelect_ReturnStatus;
  Transfer_1(theDoc: any, theMode: STEPControl_StepModelType, theIsMulti: Standard_Character, theProgress: Message_ProgressRange): Standard_Boolean;
  Transfer_2(theDoc: any, theParams: DESTEP_Parameters, theMode: STEPControl_StepModelType, theIsMulti: Standard_Character, theProgress: Message_ProgressRange): Standard_Boolean;
  Transfer_3(theLabel: TDF_Label, theMode: STEPControl_StepModelType, theIsMulti: Standard_Character, theProgress: Message_ProgressRange): Standard_Boolean;
  Transfer_4(theLabel: TDF_Label, theParams: DESTEP_Parameters, theMode: STEPControl_StepModelType, theIsMulti: Standard_Character, theProgress: Message_ProgressRange): Standard_Boolean;
  Transfer_5(theLabelSeq: NCollection_Sequence<TDF_Label>, theMode: STEPControl_StepModelType, theIsMulti: Standard_Character, theProgress: Message_ProgressRange): Standard_Boolean;
  Transfer_6(theLabelSeq: NCollection_Sequence<TDF_Label>, theParams: DESTEP_Parameters, theMode: STEPControl_StepModelType, theIsMulti: Standard_Character, theProgress: Message_ProgressRange): Standard_Boolean;
  Perform_1(theDoc: any, theFileName: XCAFDoc_PartId, theProgress: Message_ProgressRange): Standard_Boolean;
  Perform_2(theDoc: any, theFileName: Standard_Character, theProgress: Message_ProgressRange): Standard_Boolean;
  Perform_3(theDoc: any, theFileName: Standard_Character, theParams: DESTEP_Parameters, theProgress: Message_ProgressRange): Standard_Boolean;
  ExternFiles(): any;
  ExternFile_1(theLabel: TDF_Label, theExtFile: any): Standard_Boolean;
  ExternFile_2(theName: Standard_Character, theExtFile: any): Standard_Boolean;
  ChangeWriter(): STEPControl_Writer;
  Writer(): STEPControl_Writer;
  SetColorMode(theColorMode: Standard_Boolean): void;
  GetColorMode(): Standard_Boolean;
  SetNameMode(theNameMode: Standard_Boolean): void;
  GetNameMode(): Standard_Boolean;
  SetLayerMode(theLayerMode: Standard_Boolean): void;
  GetLayerMode(): Standard_Boolean;
  SetPropsMode(thePropsMode: Standard_Boolean): void;
  GetPropsMode(): Standard_Boolean;
  SetMetadataMode(theMetadataMode: Standard_Boolean): void;
  GetMetadataMode(): Standard_Boolean;
  SetSHUOMode(theSHUOMode: Standard_Boolean): void;
  GetSHUOMode(): Standard_Boolean;
  SetDimTolMode(theDimTolMode: Standard_Boolean): void;
  GetDimTolMode(): Standard_Boolean;
  SetMaterialMode(theMaterialMode: Standard_Boolean): void;
  GetMaterialMode(): Standard_Boolean;
  SetVisualMaterialMode(theVisualMaterialMode: Standard_Boolean): void;
  GetVisualMaterialMode(): Standard_Boolean;
  SetCleanDuplicates(theCleanDuplicates: Standard_Boolean): void;
  GetCleanDuplicates(): Standard_Boolean;
  SetShapeFixParameters_1(theParameters: any): void;
  SetShapeFixParameters_2(theParameters: any): void;
  SetShapeFixParameters_3(theParameters: DE_ShapeFixParameters, theAdditionalParameters: any): void;
  GetShapeFixParameters(): any;
  SetShapeProcessFlags(theFlags: any): void;
  GetShapeProcessFlags(): any;
  delete(): void;
}

  export declare class STEPCAFControl_Writer_1 extends STEPCAFControl_Writer {
    constructor();
  }

  export declare class STEPCAFControl_Writer_2 extends STEPCAFControl_Writer {
    constructor(theWS: any, theScratch: Standard_Boolean);
  }

export declare class STEPControl_Reader extends XSControl_Reader {
  StepModel(): any;
  ReadFile_1(filename: Standard_Character): IFSelect_ReturnStatus;
  ReadFile_2(filename: Standard_Character, theParams: DESTEP_Parameters): IFSelect_ReturnStatus;
  TransferRoot(num: Standard_Integer, theProgress: Message_ProgressRange): Standard_Boolean;
  NbRootsForTransfer(): Standard_Integer;
  FileUnits(theUnitLengthNames: TColStd_SequenceOfAsciiString, theUnitAngleNames: TColStd_SequenceOfAsciiString, theUnitSolidAngleNames: TColStd_SequenceOfAsciiString): void;
  SetSystemLengthUnit(theLengthUnit: Standard_Real): void;
  SystemLengthUnit(): Standard_Real;
  delete(): void;
}

  export declare class STEPControl_Reader_1 extends STEPControl_Reader {
    constructor();
  }

  export declare class STEPControl_Reader_2 extends STEPControl_Reader {
    constructor(WS: any, scratch: Standard_Boolean);
  }

export declare class STEPControl_Writer {
  SetTolerance(Tol: Standard_Real): void;
  UnsetTolerance(): void;
  SetWS(WS: any, scratch: Standard_Boolean): void;
  WS(): any;
  Model(newone: Standard_Boolean): any;
  Transfer_1(sh: TopoDS_Shape, mode: STEPControl_StepModelType, compgraph: Standard_Boolean, theProgress: Message_ProgressRange): IFSelect_ReturnStatus;
  Transfer_2(sh: TopoDS_Shape, mode: STEPControl_StepModelType, theParams: DESTEP_Parameters, compgraph: Standard_Boolean, theProgress: Message_ProgressRange): IFSelect_ReturnStatus;
  Write(theFileName: Standard_Character): IFSelect_ReturnStatus;
  PrintStatsTransfer(what: Standard_Integer, mode: Standard_Integer): void;
  CleanDuplicateEntities(): void;
  SetShapeFixParameters_1(theParameters: any): void;
  SetShapeFixParameters_2(theParameters: any): void;
  SetShapeFixParameters_3(theParameters: DE_ShapeFixParameters, theAdditionalParameters: any): void;
  GetShapeFixParameters(): any;
  SetShapeProcessFlags(theFlags: any): void;
  GetShapeProcessFlags(): any;
  delete(): void;
}

  export declare class STEPControl_Writer_1 extends STEPControl_Writer {
    constructor();
  }

  export declare class STEPControl_Writer_2 extends STEPControl_Writer {
    constructor(WS: any, scratch: Standard_Boolean);
  }

export declare type STEPControl_StepModelType = {
  STEPControl_AsIs: {};
  STEPControl_ManifoldSolidBrep: {};
  STEPControl_BrepWithVoids: {};
  STEPControl_FacetedBrep: {};
  STEPControl_FacetedBrepAndBrepWithVoids: {};
  STEPControl_ShellBasedSurfaceModel: {};
  STEPControl_GeometricCurveSet: {};
  STEPControl_Hybrid: {};
}

export declare class XCAFDoc_LengthUnit extends TDF_Attribute {
  constructor()
  static GetID(): Standard_GUID;
  static Set_1(theLabel: TDF_Label, theUnitName: XCAFDoc_PartId, theUnitValue: Standard_Real): any;
  static Set_2(theLabel: TDF_Label, theUnitValue: Standard_Real): any;
  static Set_3(theLabel: TDF_Label, theGUID: Standard_GUID, theUnitName: XCAFDoc_PartId, theUnitValue: Standard_Real): any;
  Set_4(theUnitName: XCAFDoc_PartId, theUnitValue: Standard_Real): void;
  GetUnitName(): XCAFDoc_PartId;
  GetUnitValue(): Standard_Real;
  IsEmpty(): Standard_Boolean;
  ID(): Standard_GUID;
  Restore(theWith: any): void;
  Paste(theInto: any, theRT: any): void;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): any;
  DynamicType(): any;
  NewEmpty(): any;
  delete(): void;
}

export declare class XCAFDoc_DocumentTool extends TDataStd_GenericEmpty {
  constructor()
  static GetID(): Standard_GUID;
  static Set(L: TDF_Label, IsAcces: Standard_Boolean): any;
  static IsXCAFDocument(Doc: any): Standard_Boolean;
  static DocLabel(acces: TDF_Label): TDF_Label;
  static ShapesLabel(acces: TDF_Label): TDF_Label;
  static ColorsLabel(acces: TDF_Label): TDF_Label;
  static LayersLabel(acces: TDF_Label): TDF_Label;
  static DGTsLabel(acces: TDF_Label): TDF_Label;
  static MaterialsLabel(acces: TDF_Label): TDF_Label;
  static ViewsLabel(acces: TDF_Label): TDF_Label;
  static ClippingPlanesLabel(acces: TDF_Label): TDF_Label;
  static NotesLabel(acces: TDF_Label): TDF_Label;
  static VisMaterialLabel(theLabel: TDF_Label): TDF_Label;
  static ShapeTool(acces: TDF_Label): any;
  static CheckShapeTool(theAcces: TDF_Label): Standard_Boolean;
  static ColorTool(acces: TDF_Label): any;
  static CheckColorTool(theAcces: TDF_Label): Standard_Boolean;
  static VisMaterialTool(theLabel: TDF_Label): any;
  static CheckVisMaterialTool(theAcces: TDF_Label): Standard_Boolean;
  static LayerTool(acces: TDF_Label): any;
  static CheckLayerTool(theAcces: TDF_Label): Standard_Boolean;
  static DimTolTool(acces: TDF_Label): any;
  static CheckDimTolTool(theAcces: TDF_Label): Standard_Boolean;
  static MaterialTool(acces: TDF_Label): any;
  static CheckMaterialTool(theAcces: TDF_Label): Standard_Boolean;
  static ViewTool(acces: TDF_Label): any;
  static CheckViewTool(theAcces: TDF_Label): Standard_Boolean;
  static ClippingPlaneTool(acces: TDF_Label): any;
  static CheckClippingPlaneTool(theAcces: TDF_Label): Standard_Boolean;
  static NotesTool(acces: TDF_Label): any;
  static CheckNotesTool(theAcces: TDF_Label): Standard_Boolean;
  static GetLengthUnit_1(theDoc: any, theResut: Standard_Real, theBaseUnit: UnitsMethods_LengthUnit): Standard_Boolean;
  static GetLengthUnit_2(theDoc: any, theResut: Standard_Real): Standard_Boolean;
  static SetLengthUnit_1(theDoc: any, theUnitValue: Standard_Real): void;
  static SetLengthUnit_2(theDoc: any, theUnitValue: Standard_Real, theBaseUnit: UnitsMethods_LengthUnit): void;
  Init(): void;
  ID(): Standard_GUID;
  AfterRetrieval(forceIt: Standard_Boolean): Standard_Boolean;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): any;
  DynamicType(): any;
  NewEmpty(): any;
  delete(): void;
}

export declare class XCAFDoc_ShapeTool extends TDataStd_GenericEmpty {
  constructor()
  static GetID(): Standard_GUID;
  static Set(L: TDF_Label): any;
  IsTopLevel(L: TDF_Label): Standard_Boolean;
  static IsFree(L: TDF_Label): Standard_Boolean;
  static IsShape(L: TDF_Label): Standard_Boolean;
  static IsSimpleShape(L: TDF_Label): Standard_Boolean;
  static IsReference(L: TDF_Label): Standard_Boolean;
  static IsAssembly(L: TDF_Label): Standard_Boolean;
  static IsComponent(L: TDF_Label): Standard_Boolean;
  static IsCompound(L: TDF_Label): Standard_Boolean;
  static IsSubShape_1(L: TDF_Label): Standard_Boolean;
  IsSubShape_2(shapeL: TDF_Label, sub: TopoDS_Shape): Standard_Boolean;
  SearchUsingMap(S: TopoDS_Shape, L: TDF_Label, findWithoutLoc: Standard_Boolean, findSubshape: Standard_Boolean): Standard_Boolean;
  Search(S: TopoDS_Shape, L: TDF_Label, findInstance: Standard_Boolean, findComponent: Standard_Boolean, findSubshape: Standard_Boolean): Standard_Boolean;
  FindShape_1(S: TopoDS_Shape, L: TDF_Label, findInstance: Standard_Boolean): Standard_Boolean;
  FindShape_2(S: TopoDS_Shape, findInstance: Standard_Boolean): TDF_Label;
  static GetShape_1(L: TDF_Label, S: TopoDS_Shape): Standard_Boolean;
  static GetShape_2(L: TDF_Label): TopoDS_Shape;
  static GetOneShape_1(theLabels: NCollection_Sequence<TDF_Label>): TopoDS_Shape;
  GetOneShape_2(): TopoDS_Shape;
  NewShape(): TDF_Label;
  SetShape(L: TDF_Label, S: TopoDS_Shape): void;
  AddShape(S: TopoDS_Shape, makeAssembly: Standard_Boolean, makePrepare: Standard_Boolean): TDF_Label;
  RemoveShape(L: TDF_Label, removeCompletely: Standard_Boolean): Standard_Boolean;
  Init(): void;
  static SetAutoNaming(V: Standard_Boolean): void;
  static AutoNaming(): Standard_Boolean;
  ComputeShapes(L: TDF_Label): void;
  ComputeSimpleShapes(): void;
  GetShapes(Labels: NCollection_Sequence<TDF_Label>): void;
  GetFreeShapes(FreeLabels: NCollection_Sequence<TDF_Label>): void;
  static GetUsers(L: TDF_Label, Labels: NCollection_Sequence<TDF_Label>, getsubchilds: Standard_Boolean): Standard_Integer;
  static GetLocation(L: TDF_Label): TopLoc_Location;
  static GetReferredShape(L: TDF_Label, Label: TDF_Label): Standard_Boolean;
  static NbComponents(L: TDF_Label, getsubchilds: Standard_Boolean): Standard_Integer;
  static GetComponents(L: TDF_Label, Labels: NCollection_Sequence<TDF_Label>, getsubchilds: Standard_Boolean): Standard_Boolean;
  AddComponent_1(assembly: TDF_Label, comp: TDF_Label, Loc: TopLoc_Location): TDF_Label;
  AddComponent_2(assembly: TDF_Label, comp: TopoDS_Shape, expand: Standard_Boolean): TDF_Label;
  RemoveComponent(comp: TDF_Label): void;
  UpdateAssemblies(): void;
  FindSubShape(shapeL: TDF_Label, sub: TopoDS_Shape, L: TDF_Label): Standard_Boolean;
  AddSubShape_1(shapeL: TDF_Label, sub: TopoDS_Shape): TDF_Label;
  AddSubShape_2(shapeL: TDF_Label, sub: TopoDS_Shape, addedSubShapeL: TDF_Label): Standard_Boolean;
  FindMainShapeUsingMap(sub: TopoDS_Shape): TDF_Label;
  FindMainShape(sub: TopoDS_Shape): TDF_Label;
  static GetSubShapes(L: TDF_Label, Labels: NCollection_Sequence<TDF_Label>): Standard_Boolean;
  BaseLabel(): TDF_Label;
  ID(): Standard_GUID;
  static IsExternRef(L: TDF_Label): Standard_Boolean;
  SetExternRefs_1(SHAS: any): TDF_Label;
  SetExternRefs_2(L: TDF_Label, SHAS: any): void;
  static GetExternRefs(L: TDF_Label, SHAS: any): void;
  SetSHUO(Labels: NCollection_Sequence<TDF_Label>, MainSHUOAttr: any): Standard_Boolean;
  static GetSHUO(SHUOLabel: TDF_Label, aSHUOAttr: any): Standard_Boolean;
  static GetAllComponentSHUO(CompLabel: TDF_Label, SHUOAttrs: any): Standard_Boolean;
  static GetSHUOUpperUsage(NextUsageL: TDF_Label, Labels: NCollection_Sequence<TDF_Label>): Standard_Boolean;
  static GetSHUONextUsage(UpperUsageL: TDF_Label, Labels: NCollection_Sequence<TDF_Label>): Standard_Boolean;
  RemoveSHUO(SHUOLabel: TDF_Label): Standard_Boolean;
  FindComponent(theShape: TopoDS_Shape, Labels: NCollection_Sequence<TDF_Label>): Standard_Boolean;
  GetSHUOInstance(theSHUO: any): TopoDS_Shape;
  SetInstanceSHUO(theShape: TopoDS_Shape): any;
  GetAllSHUOInstances(theSHUO: any, theSHUOShapeSeq: TopTools_SequenceOfShape): Standard_Boolean;
  static FindSHUO(Labels: NCollection_Sequence<TDF_Label>, theSHUOAttr: any): Standard_Boolean;
  SetLocation(theShapeLabel: TDF_Label, theLoc: TopLoc_Location, theRefLabel: TDF_Label): Standard_Boolean;
  Expand(Shape: TDF_Label): Standard_Boolean;
  GetNamedProperties_1(theLabel: TDF_Label, theToCreate: Standard_Boolean): any;
  GetNamedProperties_2(theShape: TopoDS_Shape, theToCreate: Standard_Boolean): any;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): any;
  DynamicType(): any;
  NewEmpty(): any;
  delete(): void;
}

export declare class XCAFDoc_ColorTool extends TDataStd_GenericEmpty {
  constructor()
  static AutoNaming(): Standard_Boolean;
  static SetAutoNaming(theIsAutoNaming: Standard_Boolean): void;
  static Set(L: TDF_Label): any;
  static GetID(): Standard_GUID;
  BaseLabel(): TDF_Label;
  ShapeTool(): any;
  IsColor(lab: TDF_Label): Standard_Boolean;
  static GetColor_1(lab: TDF_Label, col: Quantity_Color): Standard_Boolean;
  static GetColor_2(lab: TDF_Label, col: Quantity_ColorRGBA): Standard_Boolean;
  FindColor_1(col: Quantity_Color, lab: TDF_Label): Standard_Boolean;
  FindColor_2(col: Quantity_ColorRGBA, lab: TDF_Label): Standard_Boolean;
  FindColor_3(col: Quantity_Color): TDF_Label;
  FindColor_4(col: Quantity_ColorRGBA): TDF_Label;
  AddColor_1(col: Quantity_Color): TDF_Label;
  AddColor_2(col: Quantity_ColorRGBA): TDF_Label;
  RemoveColor(lab: TDF_Label): void;
  GetColors(Labels: NCollection_Sequence<TDF_Label>): void;
  SetColor_1(L: TDF_Label, colorL: TDF_Label, type: XCAFDoc_ColorType): void;
  SetColor_2(L: TDF_Label, Color: Quantity_Color, type: XCAFDoc_ColorType): void;
  SetColor_3(L: TDF_Label, Color: Quantity_ColorRGBA, type: XCAFDoc_ColorType): void;
  UnSetColor_1(L: TDF_Label, type: XCAFDoc_ColorType): void;
  IsSet_1(L: TDF_Label, type: XCAFDoc_ColorType): Standard_Boolean;
  static GetColor_3(L: TDF_Label, type: XCAFDoc_ColorType, colorL: TDF_Label): Standard_Boolean;
  static GetColor_4(L: TDF_Label, type: XCAFDoc_ColorType, color: Quantity_Color): Standard_Boolean;
  static GetColor_5(L: TDF_Label, type: XCAFDoc_ColorType, color: Quantity_ColorRGBA): Standard_Boolean;
  SetColor_4(S: TopoDS_Shape, colorL: TDF_Label, type: XCAFDoc_ColorType): Standard_Boolean;
  SetColor_5(S: TopoDS_Shape, Color: Quantity_Color, type: XCAFDoc_ColorType): Standard_Boolean;
  SetColor_6(S: TopoDS_Shape, Color: Quantity_ColorRGBA, type: XCAFDoc_ColorType): Standard_Boolean;
  UnSetColor_2(S: TopoDS_Shape, type: XCAFDoc_ColorType): Standard_Boolean;
  IsSet_2(S: TopoDS_Shape, type: XCAFDoc_ColorType): Standard_Boolean;
  GetColor_6(S: TopoDS_Shape, type: XCAFDoc_ColorType, colorL: TDF_Label): Standard_Boolean;
  GetColor_7(S: TopoDS_Shape, type: XCAFDoc_ColorType, color: Quantity_Color): Standard_Boolean;
  GetColor_8(S: TopoDS_Shape, type: XCAFDoc_ColorType, color: Quantity_ColorRGBA): Standard_Boolean;
  static IsVisible(L: TDF_Label): Standard_Boolean;
  SetVisibility(shapeLabel: TDF_Label, isvisible: Standard_Boolean): void;
  IsColorByLayer(L: TDF_Label): Standard_Boolean;
  SetColorByLayer(shapeLabel: TDF_Label, isColorByLayer: Standard_Boolean): void;
  SetInstanceColor_1(theShape: TopoDS_Shape, type: XCAFDoc_ColorType, color: Quantity_Color, isCreateSHUO: Standard_Boolean): Standard_Boolean;
  SetInstanceColor_2(theShape: TopoDS_Shape, type: XCAFDoc_ColorType, color: Quantity_ColorRGBA, isCreateSHUO: Standard_Boolean): Standard_Boolean;
  GetInstanceColor_1(theShape: TopoDS_Shape, type: XCAFDoc_ColorType, color: Quantity_Color): Standard_Boolean;
  GetInstanceColor_2(theShape: TopoDS_Shape, type: XCAFDoc_ColorType, color: Quantity_ColorRGBA): Standard_Boolean;
  IsInstanceVisible(theShape: TopoDS_Shape): Standard_Boolean;
  ReverseChainsOfTreeNodes(): Standard_Boolean;
  ID(): Standard_GUID;
  static get_type_name(): Standard_Character;
  static get_type_descriptor(): any;
  DynamicType(): any;
  NewEmpty(): any;
  delete(): void;
}

export declare type XCAFDoc_ColorType = {
  XCAFDoc_ColorGen: {};
  XCAFDoc_ColorSurf: {};
  XCAFDoc_ColorCurv: {};
}

export declare class Poly_Array1OfTriangle {
  Init(theValue: Poly_Triangle): void;
  Size(): number;
  Length(): number;
  IsEmpty(): boolean;
  Lower(): number;
  Upper(): number;
  Assign(theOther: Poly_Array1OfTriangle): Poly_Array1OfTriangle;
  Move_1(theOther: Poly_Array1OfTriangle): Poly_Array1OfTriangle;
  Move_2(theOther: Poly_Array1OfTriangle): Poly_Array1OfTriangle;
  First(): Poly_Triangle;
  ChangeFirst(): Poly_Triangle;
  Last(): Poly_Triangle;
  ChangeLast(): Poly_Triangle;
  Value(theIndex: number): Poly_Triangle;
  ChangeValue(theIndex: number): Poly_Triangle;
  SetValue_1(theIndex: number, theItem: Poly_Triangle): void;
  SetValue_2(theIndex: number, theItem: Poly_Triangle): void;
  UpdateLowerBound(theLower: number): void;
  UpdateUpperBound(theUpper: number): void;
  Resize(theLower: number, theUpper: number, theToCopyData: boolean): void;
  IsDeletable(): boolean;
  delete(): void;
}

  export declare class Poly_Array1OfTriangle_1 extends Poly_Array1OfTriangle {
    constructor();
  }

  export declare class Poly_Array1OfTriangle_2 extends Poly_Array1OfTriangle {
    constructor(theLower: number, theUpper: number);
  }

  export declare class Poly_Array1OfTriangle_4 extends Poly_Array1OfTriangle {
    constructor(theBegin: Poly_Triangle, theLower: number, theUpper: number, theUseBuffer: boolean);
  }

  export declare class Poly_Array1OfTriangle_5 extends Poly_Array1OfTriangle {
    constructor(theOther: Poly_Array1OfTriangle);
  }

  export declare class Poly_Array1OfTriangle_6 extends Poly_Array1OfTriangle {
    constructor(theOther: Poly_Array1OfTriangle);
  }

export declare class TColgp_Array2OfPnt {
  static BeginPosition(theRowLower: number, a1: number, theColLower: number, theColUpper: number): number;
  static LastPosition(theRowLower: number, theRowUpper: number, theColLower: number, theColUpper: number): number;
  Size(): number;
  Length(): number;
  NbRows(): number;
  NbColumns(): number;
  RowLength(): number;
  ColLength(): number;
  LowerRow(): number;
  UpperRow(): number;
  LowerCol(): number;
  UpperCol(): number;
  UpdateLowerRow(theLowerRow: number): void;
  UpdateLowerCol(theLowerCol: number): void;
  UpdateUpperRow(theUpperRow: number): void;
  UpdateUpperCol(theUpperCol: number): void;
  Assign(theOther: TColgp_Array2OfPnt): TColgp_Array2OfPnt;
  Move_1(theOther: TColgp_Array2OfPnt): TColgp_Array2OfPnt;
  Move_2(theOther: TColgp_Array2OfPnt): TColgp_Array2OfPnt;
  SetValue_1(theRow: number, theCol: number, theItem: gp_Pnt): void;
  SetValue_2(theRow: number, theCol: number, theItem: gp_Pnt): void;
  Resize(theRowLower: number, theRowUpper: number, theColLower: number, theColUpper: number, theToCopyData: boolean): void;
  ResizeWithTrim(theRowLower: number, theRowUpper: number, theColLower: number, theColUpper: number, theToCopyData: boolean): void;
  delete(): void;
}

  export declare class TColgp_Array2OfPnt_1 extends TColgp_Array2OfPnt {
    constructor();
  }

  export declare class TColgp_Array2OfPnt_2 extends TColgp_Array2OfPnt {
    constructor(theRowLower: number, theRowUpper: number, theColLower: number, theColUpper: number);
  }

  export declare class TColgp_Array2OfPnt_4 extends TColgp_Array2OfPnt {
    constructor(theOther: TColgp_Array2OfPnt);
  }

  export declare class TColgp_Array2OfPnt_5 extends TColgp_Array2OfPnt {
    constructor(theOther: TColgp_Array2OfPnt);
  }

  export declare class TColgp_Array2OfPnt_6 extends TColgp_Array2OfPnt {
    constructor(theBegin: gp_Pnt, theRowLower: number, theRowUpper: number, theColLower: number, theColUpper: number);
  }

export declare class TColgp_Array1OfPnt2d {
  Init(theValue: gp_Pnt2d): void;
  Size(): number;
  Length(): number;
  IsEmpty(): boolean;
  Lower(): number;
  Upper(): number;
  Assign(theOther: TColgp_Array1OfPnt2d): TColgp_Array1OfPnt2d;
  Move_1(theOther: TColgp_Array1OfPnt2d): TColgp_Array1OfPnt2d;
  Move_2(theOther: TColgp_Array1OfPnt2d): TColgp_Array1OfPnt2d;
  First(): gp_Pnt2d;
  ChangeFirst(): gp_Pnt2d;
  Last(): gp_Pnt2d;
  ChangeLast(): gp_Pnt2d;
  Value(theIndex: number): gp_Pnt2d;
  ChangeValue(theIndex: number): gp_Pnt2d;
  SetValue_1(theIndex: number, theItem: gp_Pnt2d): void;
  SetValue_2(theIndex: number, theItem: gp_Pnt2d): void;
  UpdateLowerBound(theLower: number): void;
  UpdateUpperBound(theUpper: number): void;
  Resize(theLower: number, theUpper: number, theToCopyData: boolean): void;
  IsDeletable(): boolean;
  delete(): void;
}

  export declare class TColgp_Array1OfPnt2d_1 extends TColgp_Array1OfPnt2d {
    constructor();
  }

  export declare class TColgp_Array1OfPnt2d_2 extends TColgp_Array1OfPnt2d {
    constructor(theLower: number, theUpper: number);
  }

  export declare class TColgp_Array1OfPnt2d_4 extends TColgp_Array1OfPnt2d {
    constructor(theBegin: gp_Pnt2d, theLower: number, theUpper: number, theUseBuffer: boolean);
  }

  export declare class TColgp_Array1OfPnt2d_5 extends TColgp_Array1OfPnt2d {
    constructor(theOther: TColgp_Array1OfPnt2d);
  }

  export declare class TColgp_Array1OfPnt2d_6 extends TColgp_Array1OfPnt2d {
    constructor(theOther: TColgp_Array1OfPnt2d);
  }

export declare class TColStd_Array1OfInteger {
  Init(theValue: number): void;
  Size(): number;
  Length(): number;
  IsEmpty(): boolean;
  Lower(): number;
  Upper(): number;
  Assign(theOther: TColStd_Array1OfInteger): TColStd_Array1OfInteger;
  Move_1(theOther: TColStd_Array1OfInteger): TColStd_Array1OfInteger;
  Move_2(theOther: TColStd_Array1OfInteger): TColStd_Array1OfInteger;
  First(): number;
  ChangeFirst(): number;
  Last(): number;
  ChangeLast(): number;
  Value(theIndex: number): number;
  ChangeValue(theIndex: number): number;
  SetValue_1(theIndex: number, theItem: number): void;
  SetValue_2(theIndex: number, theItem: number): void;
  UpdateLowerBound(theLower: number): void;
  UpdateUpperBound(theUpper: number): void;
  Resize(theLower: number, theUpper: number, theToCopyData: boolean): void;
  IsDeletable(): boolean;
  delete(): void;
}

  export declare class TColStd_Array1OfInteger_1 extends TColStd_Array1OfInteger {
    constructor();
  }

  export declare class TColStd_Array1OfInteger_2 extends TColStd_Array1OfInteger {
    constructor(theLower: number, theUpper: number);
  }

  export declare class TColStd_Array1OfInteger_4 extends TColStd_Array1OfInteger {
    constructor(theBegin: number, theLower: number, theUpper: number, theUseBuffer: boolean);
  }

  export declare class TColStd_Array1OfInteger_5 extends TColStd_Array1OfInteger {
    constructor(theOther: TColStd_Array1OfInteger);
  }

  export declare class TColStd_Array1OfInteger_6 extends TColStd_Array1OfInteger {
    constructor(theOther: TColStd_Array1OfInteger);
  }

export declare class TColStd_Array1OfBoolean {
  Init(theValue: boolean): void;
  Size(): number;
  Length(): number;
  IsEmpty(): boolean;
  Lower(): number;
  Upper(): number;
  Assign(theOther: TColStd_Array1OfBoolean): TColStd_Array1OfBoolean;
  Move_1(theOther: TColStd_Array1OfBoolean): TColStd_Array1OfBoolean;
  Move_2(theOther: TColStd_Array1OfBoolean): TColStd_Array1OfBoolean;
  First(): boolean;
  ChangeFirst(): boolean;
  Last(): boolean;
  ChangeLast(): boolean;
  Value(theIndex: number): boolean;
  ChangeValue(theIndex: number): boolean;
  SetValue_1(theIndex: number, theItem: boolean): void;
  SetValue_2(theIndex: number, theItem: boolean): void;
  UpdateLowerBound(theLower: number): void;
  UpdateUpperBound(theUpper: number): void;
  Resize(theLower: number, theUpper: number, theToCopyData: boolean): void;
  IsDeletable(): boolean;
  delete(): void;
}

  export declare class TColStd_Array1OfBoolean_1 extends TColStd_Array1OfBoolean {
    constructor();
  }

  export declare class TColStd_Array1OfBoolean_2 extends TColStd_Array1OfBoolean {
    constructor(theLower: number, theUpper: number);
  }

  export declare class TColStd_Array1OfBoolean_4 extends TColStd_Array1OfBoolean {
    constructor(theBegin: boolean, theLower: number, theUpper: number, theUseBuffer: boolean);
  }

  export declare class TColStd_Array1OfBoolean_5 extends TColStd_Array1OfBoolean {
    constructor(theOther: TColStd_Array1OfBoolean);
  }

  export declare class TColStd_Array1OfBoolean_6 extends TColStd_Array1OfBoolean {
    constructor(theOther: TColStd_Array1OfBoolean);
  }

export declare class TColgp_Array1OfDir {
  Init(theValue: gp_Dir): void;
  Size(): number;
  Length(): number;
  IsEmpty(): boolean;
  Lower(): number;
  Upper(): number;
  Assign(theOther: TColgp_Array1OfDir): TColgp_Array1OfDir;
  Move_1(theOther: TColgp_Array1OfDir): TColgp_Array1OfDir;
  Move_2(theOther: TColgp_Array1OfDir): TColgp_Array1OfDir;
  First(): gp_Dir;
  ChangeFirst(): gp_Dir;
  Last(): gp_Dir;
  ChangeLast(): gp_Dir;
  Value(theIndex: number): gp_Dir;
  ChangeValue(theIndex: number): gp_Dir;
  SetValue_1(theIndex: number, theItem: gp_Dir): void;
  SetValue_2(theIndex: number, theItem: gp_Dir): void;
  UpdateLowerBound(theLower: number): void;
  UpdateUpperBound(theUpper: number): void;
  Resize(theLower: number, theUpper: number, theToCopyData: boolean): void;
  IsDeletable(): boolean;
  delete(): void;
}

  export declare class TColgp_Array1OfDir_1 extends TColgp_Array1OfDir {
    constructor();
  }

  export declare class TColgp_Array1OfDir_2 extends TColgp_Array1OfDir {
    constructor(theLower: number, theUpper: number);
  }

  export declare class TColgp_Array1OfDir_4 extends TColgp_Array1OfDir {
    constructor(theBegin: gp_Dir, theLower: number, theUpper: number, theUseBuffer: boolean);
  }

  export declare class TColgp_Array1OfDir_5 extends TColgp_Array1OfDir {
    constructor(theOther: TColgp_Array1OfDir);
  }

  export declare class TColgp_Array1OfDir_6 extends TColgp_Array1OfDir {
    constructor(theOther: TColgp_Array1OfDir);
  }

export declare class TColgp_Array1OfPnt {
  Init(theValue: gp_Pnt): void;
  Size(): number;
  Length(): number;
  IsEmpty(): boolean;
  Lower(): number;
  Upper(): number;
  Assign(theOther: TColgp_Array1OfPnt): TColgp_Array1OfPnt;
  Move_1(theOther: TColgp_Array1OfPnt): TColgp_Array1OfPnt;
  Move_2(theOther: TColgp_Array1OfPnt): TColgp_Array1OfPnt;
  First(): gp_Pnt;
  ChangeFirst(): gp_Pnt;
  Last(): gp_Pnt;
  ChangeLast(): gp_Pnt;
  Value(theIndex: number): gp_Pnt;
  ChangeValue(theIndex: number): gp_Pnt;
  SetValue_1(theIndex: number, theItem: gp_Pnt): void;
  SetValue_2(theIndex: number, theItem: gp_Pnt): void;
  UpdateLowerBound(theLower: number): void;
  UpdateUpperBound(theUpper: number): void;
  Resize(theLower: number, theUpper: number, theToCopyData: boolean): void;
  IsDeletable(): boolean;
  delete(): void;
}

  export declare class TColgp_Array1OfPnt_1 extends TColgp_Array1OfPnt {
    constructor();
  }

  export declare class TColgp_Array1OfPnt_2 extends TColgp_Array1OfPnt {
    constructor(theLower: number, theUpper: number);
  }

  export declare class TColgp_Array1OfPnt_4 extends TColgp_Array1OfPnt {
    constructor(theBegin: gp_Pnt, theLower: number, theUpper: number, theUseBuffer: boolean);
  }

  export declare class TColgp_Array1OfPnt_5 extends TColgp_Array1OfPnt {
    constructor(theOther: TColgp_Array1OfPnt);
  }

  export declare class TColgp_Array1OfPnt_6 extends TColgp_Array1OfPnt {
    constructor(theOther: TColgp_Array1OfPnt);
  }

export declare class TopTools_ListOfShape extends NCollection_BaseList {
  Size(): number;
  Assign(theOther: TopTools_ListOfShape): TopTools_ListOfShape;
  Clear(theAllocator: any): void;
  First_1(): TopoDS_Shape;
  First_2(): TopoDS_Shape;
  Last_1(): TopoDS_Shape;
  Last_2(): TopoDS_Shape;
  Append_1(theItem: TopoDS_Shape): TopoDS_Shape;
  Append_2(theItem: TopoDS_Shape): TopoDS_Shape;
  Append_5(theOther: TopTools_ListOfShape): void;
  Prepend_1(theItem: TopoDS_Shape): TopoDS_Shape;
  Prepend_2(theItem: TopoDS_Shape): TopoDS_Shape;
  Prepend_3(theOther: TopTools_ListOfShape): void;
  RemoveFirst(): void;
  Reverse(): void;
  Exchange(theOther: TopTools_ListOfShape): void;
  delete(): void;
}

  export declare class TopTools_ListOfShape_1 extends TopTools_ListOfShape {
    constructor();
  }

  export declare class TopTools_ListOfShape_2 extends TopTools_ListOfShape {
    constructor(theAllocator: any);
  }

  export declare class TopTools_ListOfShape_3 extends TopTools_ListOfShape {
    constructor(theOther: TopTools_ListOfShape);
  }

  export declare class TopTools_ListOfShape_4 extends TopTools_ListOfShape {
    constructor(theOther: TopTools_ListOfShape);
  }

  export declare class TopTools_ListOfShape_5 extends TopTools_ListOfShape {
    constructor(theInitList: any, theAllocator: any);
  }

export declare class TColgp_Array1OfVec {
  Init(theValue: gp_Vec): void;
  Size(): number;
  Length(): number;
  IsEmpty(): boolean;
  Lower(): number;
  Upper(): number;
  Assign(theOther: TColgp_Array1OfVec): TColgp_Array1OfVec;
  Move_1(theOther: TColgp_Array1OfVec): TColgp_Array1OfVec;
  Move_2(theOther: TColgp_Array1OfVec): TColgp_Array1OfVec;
  First(): gp_Vec;
  ChangeFirst(): gp_Vec;
  Last(): gp_Vec;
  ChangeLast(): gp_Vec;
  Value(theIndex: number): gp_Vec;
  ChangeValue(theIndex: number): gp_Vec;
  SetValue_1(theIndex: number, theItem: gp_Vec): void;
  SetValue_2(theIndex: number, theItem: gp_Vec): void;
  UpdateLowerBound(theLower: number): void;
  UpdateUpperBound(theUpper: number): void;
  Resize(theLower: number, theUpper: number, theToCopyData: boolean): void;
  IsDeletable(): boolean;
  delete(): void;
}

  export declare class TColgp_Array1OfVec_1 extends TColgp_Array1OfVec {
    constructor();
  }

  export declare class TColgp_Array1OfVec_2 extends TColgp_Array1OfVec {
    constructor(theLower: number, theUpper: number);
  }

  export declare class TColgp_Array1OfVec_4 extends TColgp_Array1OfVec {
    constructor(theBegin: gp_Vec, theLower: number, theUpper: number, theUseBuffer: boolean);
  }

  export declare class TColgp_Array1OfVec_5 extends TColgp_Array1OfVec {
    constructor(theOther: TColgp_Array1OfVec);
  }

  export declare class TColgp_Array1OfVec_6 extends TColgp_Array1OfVec {
    constructor(theOther: TColgp_Array1OfVec);
  }

export declare class TColStd_Array1OfReal {
  Init(theValue: number): void;
  Size(): number;
  Length(): number;
  IsEmpty(): boolean;
  Lower(): number;
  Upper(): number;
  Assign(theOther: TColStd_Array1OfReal): TColStd_Array1OfReal;
  Move_1(theOther: TColStd_Array1OfReal): TColStd_Array1OfReal;
  Move_2(theOther: TColStd_Array1OfReal): TColStd_Array1OfReal;
  First(): number;
  ChangeFirst(): number;
  Last(): number;
  ChangeLast(): number;
  Value(theIndex: number): number;
  ChangeValue(theIndex: number): number;
  SetValue_1(theIndex: number, theItem: number): void;
  SetValue_2(theIndex: number, theItem: number): void;
  UpdateLowerBound(theLower: number): void;
  UpdateUpperBound(theUpper: number): void;
  Resize(theLower: number, theUpper: number, theToCopyData: boolean): void;
  IsDeletable(): boolean;
  delete(): void;
}

  export declare class TColStd_Array1OfReal_1 extends TColStd_Array1OfReal {
    constructor();
  }

  export declare class TColStd_Array1OfReal_2 extends TColStd_Array1OfReal {
    constructor(theLower: number, theUpper: number);
  }

  export declare class TColStd_Array1OfReal_4 extends TColStd_Array1OfReal {
    constructor(theBegin: number, theLower: number, theUpper: number, theUseBuffer: boolean);
  }

  export declare class TColStd_Array1OfReal_5 extends TColStd_Array1OfReal {
    constructor(theOther: TColStd_Array1OfReal);
  }

  export declare class TColStd_Array1OfReal_6 extends TColStd_Array1OfReal {
    constructor(theOther: TColStd_Array1OfReal);
  }

type Standard_Boolean = boolean;
type Standard_Byte = number;
type Standard_Character = string;
type Standard_CString = string;
type Standard_Integer = number;
type Standard_Real = number;
type Standard_ShortReal = number;
type Standard_Size = number;

declare namespace FS {
  interface Lookup {
      path: string;
      node: FSNode;
  }

  interface FSStream {}
  interface FSNode {}
  interface ErrnoError {}

  let ignorePermissions: boolean;
  let trackingDelegate: any;
  let tracking: any;
  let genericErrors: any;

  //
  // paths
  //
  function lookupPath(path: string, opts: any): Lookup;
  function getPath(node: FSNode): string;

  //
  // nodes
  //
  function isFile(mode: number): boolean;
  function isDir(mode: number): boolean;
  function isLink(mode: number): boolean;
  function isChrdev(mode: number): boolean;
  function isBlkdev(mode: number): boolean;
  function isFIFO(mode: number): boolean;
  function isSocket(mode: number): boolean;

  //
  // devices
  //
  function major(dev: number): number;
  function minor(dev: number): number;
  function makedev(ma: number, mi: number): number;
  function registerDevice(dev: number, ops: any): void;

  //
  // core
  //
  function syncfs(populate: boolean, callback: (e: any) => any): void;
  function syncfs(callback: (e: any) => any, populate?: boolean): void;
  function mount(type: any, opts: any, mountpoint: string): any;
  function unmount(mountpoint: string): void;

  function mkdir(path: string, mode?: number): any;
  function mkdev(path: string, mode?: number, dev?: number): any;
  function symlink(oldpath: string, newpath: string): any;
  function rename(old_path: string, new_path: string): void;
  function rmdir(path: string): void;
  function readdir(path: string): any;
  function unlink(path: string): void;
  function readlink(path: string): string;
  function stat(path: string, dontFollow?: boolean): any;
  function lstat(path: string): any;
  function chmod(path: string, mode: number, dontFollow?: boolean): void;
  function lchmod(path: string, mode: number): void;
  function fchmod(fd: number, mode: number): void;
  function chown(path: string, uid: number, gid: number, dontFollow?: boolean): void;
  function lchown(path: string, uid: number, gid: number): void;
  function fchown(fd: number, uid: number, gid: number): void;
  function truncate(path: string, len: number): void;
  function ftruncate(fd: number, len: number): void;
  function utime(path: string, atime: number, mtime: number): void;
  function open(path: string, flags: string, mode?: number, fd_start?: number, fd_end?: number): FSStream;
  function close(stream: FSStream): void;
  function llseek(stream: FSStream, offset: number, whence: number): any;
  function read(stream: FSStream, buffer: ArrayBufferView, offset: number, length: number, position?: number): number;
  function write(
      stream: FSStream,
      buffer: ArrayBufferView,
      offset: number,
      length: number,
      position?: number,
      canOwn?: boolean,
  ): number;
  function allocate(stream: FSStream, offset: number, length: number): void;
  function mmap(
      stream: FSStream,
      buffer: ArrayBufferView,
      offset: number,
      length: number,
      position: number,
      prot: number,
      flags: number,
  ): any;
  function ioctl(stream: FSStream, cmd: any, arg: any): any;
  function readFile(path: string, opts: { encoding: 'binary'; flags?: string }): Uint8Array;
  function readFile(path: string, opts: { encoding: 'utf8'; flags?: string }): string;
  function readFile(path: string, opts?: { flags?: string }): Uint8Array;
  function writeFile(path: string, data: string | ArrayBufferView, opts?: { flags?: string }): void;

  //
  // module-level FS code
  //
  function cwd(): string;
  function chdir(path: string): void;
  function init(
      input: null | (() => number | null),
      output: null | ((c: number) => any),
      error: null | ((c: number) => any),
  ): void;

  function createLazyFile(
      parent: string | FSNode,
      name: string,
      url: string,
      canRead: boolean,
      canWrite: boolean,
  ): FSNode;
  function createPreloadedFile(
      parent: string | FSNode,
      name: string,
      url: string,
      canRead: boolean,
      canWrite: boolean,
      onload?: () => void,
      onerror?: () => void,
      dontCreateFile?: boolean,
      canOwn?: boolean,
  ): void;
  function createDataFile(
      parent: string | FSNode,
      name: string,
      data: ArrayBufferView | string,
      canRead: boolean,
      canWrite: boolean,
      canOwn: boolean,
  ): FSNode;
  interface AnalysisResults {
    isRoot: boolean,
    exists: boolean,
    error: Error,
    name: string,
    path: any,
    object: any,
    parentExists: boolean,
    parentPath: any,
    parentObject: any
  }
  function analyzePath(path: string): AnalysisResults;
}


export type OpenCascadeInstance = {FS: typeof FS} & {
  Message_ProgressRange: typeof Message_ProgressRange;
  Message_ProgressRange_1: typeof Message_ProgressRange_1;
  Message_ProgressRange_2: typeof Message_ProgressRange_2;
  Quantity_Color: typeof Quantity_Color;
  Quantity_Color_1: typeof Quantity_Color_1;
  Quantity_Color_2: typeof Quantity_Color_2;
  Quantity_Color_3: typeof Quantity_Color_3;
  Quantity_Color_4: typeof Quantity_Color_4;
  Quantity_ColorRGBA: typeof Quantity_ColorRGBA;
  Quantity_ColorRGBA_1: typeof Quantity_ColorRGBA_1;
  Quantity_ColorRGBA_2: typeof Quantity_ColorRGBA_2;
  Quantity_ColorRGBA_3: typeof Quantity_ColorRGBA_3;
  Quantity_ColorRGBA_4: typeof Quantity_ColorRGBA_4;
  Quantity_ColorRGBA_5: typeof Quantity_ColorRGBA_5;
  NCollection_BaseList: typeof NCollection_BaseList;
  Standard_Transient: typeof Standard_Transient;
  Standard_Transient_1: typeof Standard_Transient_1;
  Standard_Transient_2: typeof Standard_Transient_2;
  Precision: typeof Precision;
  TCollection_ExtendedString: typeof TCollection_ExtendedString;
  TCollection_ExtendedString_1: typeof TCollection_ExtendedString_1;
  TCollection_ExtendedString_2: typeof TCollection_ExtendedString_2;
  TCollection_ExtendedString_3: typeof TCollection_ExtendedString_3;
  TCollection_ExtendedString_4: typeof TCollection_ExtendedString_4;
  TCollection_ExtendedString_5: typeof TCollection_ExtendedString_5;
  TCollection_ExtendedString_6: typeof TCollection_ExtendedString_6;
  TCollection_ExtendedString_7: typeof TCollection_ExtendedString_7;
  TCollection_ExtendedString_8: typeof TCollection_ExtendedString_8;
  TCollection_ExtendedString_9: typeof TCollection_ExtendedString_9;
  TCollection_ExtendedString_10: typeof TCollection_ExtendedString_10;
  TCollection_ExtendedString_11: typeof TCollection_ExtendedString_11;
  TCollection_ExtendedString_12: typeof TCollection_ExtendedString_12;
  TCollection_ExtendedString_13: typeof TCollection_ExtendedString_13;
  TCollection_ExtendedString_15: typeof TCollection_ExtendedString_15;
  TopLoc_Location: typeof TopLoc_Location;
  TopLoc_Location_1: typeof TopLoc_Location_1;
  TopLoc_Location_2: typeof TopLoc_Location_2;
  TopLoc_Location_3: typeof TopLoc_Location_3;
  TopLoc_Location_4: typeof TopLoc_Location_4;
  TopLoc_Location_5: typeof TopLoc_Location_5;
  gp_Circ2d: typeof gp_Circ2d;
  gp_Circ2d_1: typeof gp_Circ2d_1;
  gp_Circ2d_2: typeof gp_Circ2d_2;
  gp_Circ2d_3: typeof gp_Circ2d_3;
  gp_Vec: typeof gp_Vec;
  gp_Vec_1: typeof gp_Vec_1;
  gp_Vec_2: typeof gp_Vec_2;
  gp_Vec_3: typeof gp_Vec_3;
  gp_Vec_4: typeof gp_Vec_4;
  gp_Vec_5: typeof gp_Vec_5;
  gp_Elips2d: typeof gp_Elips2d;
  gp_Elips2d_1: typeof gp_Elips2d_1;
  gp_Elips2d_2: typeof gp_Elips2d_2;
  gp_Elips2d_3: typeof gp_Elips2d_3;
  gp_GTrsf2d: typeof gp_GTrsf2d;
  gp_GTrsf2d_1: typeof gp_GTrsf2d_1;
  gp_GTrsf2d_2: typeof gp_GTrsf2d_2;
  gp_GTrsf2d_3: typeof gp_GTrsf2d_3;
  gp_Ax1: typeof gp_Ax1;
  gp_Ax1_1: typeof gp_Ax1_1;
  gp_Ax1_2: typeof gp_Ax1_2;
  gp_Ax1_3: typeof gp_Ax1_3;
  gp_Ax1_4: typeof gp_Ax1_4;
  gp_Trsf: typeof gp_Trsf;
  gp_Trsf_1: typeof gp_Trsf_1;
  gp_Trsf_2: typeof gp_Trsf_2;
  gp_Pnt: typeof gp_Pnt;
  gp_Pnt_1: typeof gp_Pnt_1;
  gp_Pnt_2: typeof gp_Pnt_2;
  gp_Pnt_3: typeof gp_Pnt_3;
  gp_Elips: typeof gp_Elips;
  gp_Elips_1: typeof gp_Elips_1;
  gp_Elips_2: typeof gp_Elips_2;
  gp_Ax3: typeof gp_Ax3;
  gp_Ax3_1: typeof gp_Ax3_1;
  gp_Ax3_2: typeof gp_Ax3_2;
  gp_Ax3_3: typeof gp_Ax3_3;
  gp_Ax3_4: typeof gp_Ax3_4;
  gp_Ax3_5: typeof gp_Ax3_5;
  gp_Ax3_6: typeof gp_Ax3_6;
  gp_Ax3_7: typeof gp_Ax3_7;
  gp_Ax2: typeof gp_Ax2;
  gp_Ax2_1: typeof gp_Ax2_1;
  gp_Ax2_2: typeof gp_Ax2_2;
  gp_Ax2_3: typeof gp_Ax2_3;
  gp_Ax2_4: typeof gp_Ax2_4;
  gp_Ax2_5: typeof gp_Ax2_5;
  gp_Ax2_6: typeof gp_Ax2_6;
  gp_Pnt2d: typeof gp_Pnt2d;
  gp_Pnt2d_1: typeof gp_Pnt2d_1;
  gp_Pnt2d_2: typeof gp_Pnt2d_2;
  gp_Pnt2d_3: typeof gp_Pnt2d_3;
  gp_XY: typeof gp_XY;
  gp_XY_1: typeof gp_XY_1;
  gp_XY_2: typeof gp_XY_2;
  gp_Dir: typeof gp_Dir;
  gp_Dir_1: typeof gp_Dir_1;
  gp_Dir_2: typeof gp_Dir_2;
  gp_Dir_3: typeof gp_Dir_3;
  gp_Dir_4: typeof gp_Dir_4;
  gp_Dir_5: typeof gp_Dir_5;
  gp_Dir_6: typeof gp_Dir_6;
  gp_Dir_7: typeof gp_Dir_7;
  gp_Dir_D: typeof gp_Dir_D;
  gp_Ax22d: typeof gp_Ax22d;
  gp_Ax22d_1: typeof gp_Ax22d_1;
  gp_Ax22d_2: typeof gp_Ax22d_2;
  gp_Ax22d_3: typeof gp_Ax22d_3;
  gp_Ax22d_4: typeof gp_Ax22d_4;
  gp_XYZ: typeof gp_XYZ;
  gp_XYZ_1: typeof gp_XYZ_1;
  gp_XYZ_2: typeof gp_XYZ_2;
  gp_Cylinder: typeof gp_Cylinder;
  gp_Cylinder_1: typeof gp_Cylinder_1;
  gp_Cylinder_2: typeof gp_Cylinder_2;
  gp_Dir2d: typeof gp_Dir2d;
  gp_Dir2d_1: typeof gp_Dir2d_1;
  gp_Dir2d_2: typeof gp_Dir2d_2;
  gp_Dir2d_3: typeof gp_Dir2d_3;
  gp_Dir2d_4: typeof gp_Dir2d_4;
  gp_Dir2d_5: typeof gp_Dir2d_5;
  gp_Dir2d_D: typeof gp_Dir2d_D;
  gp_Circ: typeof gp_Circ;
  gp_Circ_1: typeof gp_Circ_1;
  gp_Circ_2: typeof gp_Circ_2;
  gp_Ax2d: typeof gp_Ax2d;
  gp_Ax2d_1: typeof gp_Ax2d_1;
  gp_Ax2d_2: typeof gp_Ax2d_2;
  gp_Ax2d_3: typeof gp_Ax2d_3;
  gp_Ax2d_4: typeof gp_Ax2d_4;
  gp_Sphere: typeof gp_Sphere;
  gp_Sphere_1: typeof gp_Sphere_1;
  gp_Sphere_2: typeof gp_Sphere_2;
  gp_Vec2d: typeof gp_Vec2d;
  gp_Vec2d_1: typeof gp_Vec2d_1;
  gp_Vec2d_2: typeof gp_Vec2d_2;
  gp_Vec2d_3: typeof gp_Vec2d_3;
  gp_Vec2d_4: typeof gp_Vec2d_4;
  gp_Vec2d_5: typeof gp_Vec2d_5;
  gp_Trsf2d: typeof gp_Trsf2d;
  gp_Trsf2d_1: typeof gp_Trsf2d_1;
  gp_Trsf2d_2: typeof gp_Trsf2d_2;
  gp_GTrsf: typeof gp_GTrsf;
  gp_GTrsf_1: typeof gp_GTrsf_1;
  gp_GTrsf_2: typeof gp_GTrsf_2;
  gp_GTrsf_3: typeof gp_GTrsf_3;
  GeomAbs_SurfaceType: GeomAbs_SurfaceType;
  GeomAbs_JoinType: GeomAbs_JoinType;
  GeomAbs_CurveType: GeomAbs_CurveType;
  GeomAbs_Shape: GeomAbs_Shape;
  Bnd_Box2d: typeof Bnd_Box2d;
  Bnd_Box: typeof Bnd_Box;
  Bnd_Box_1: typeof Bnd_Box_1;
  Bnd_Box_2: typeof Bnd_Box_2;
  Convert_ParameterisationType: Convert_ParameterisationType;
  Poly_PolygonOnTriangulation: typeof Poly_PolygonOnTriangulation;
  Poly_PolygonOnTriangulation_1: typeof Poly_PolygonOnTriangulation_1;
  Poly_PolygonOnTriangulation_2: typeof Poly_PolygonOnTriangulation_2;
  Poly_PolygonOnTriangulation_3: typeof Poly_PolygonOnTriangulation_3;
  Poly_Triangulation: typeof Poly_Triangulation;
  Poly_Triangulation_1: typeof Poly_Triangulation_1;
  Poly_Triangulation_2: typeof Poly_Triangulation_2;
  Poly_Triangulation_3: typeof Poly_Triangulation_3;
  Poly_Triangulation_4: typeof Poly_Triangulation_4;
  Poly_Triangulation_5: typeof Poly_Triangulation_5;
  Poly_Triangle: typeof Poly_Triangle;
  Poly_Triangle_1: typeof Poly_Triangle_1;
  Poly_Triangle_2: typeof Poly_Triangle_2;
  TDF_Attribute: typeof TDF_Attribute;
  TDF_Label: typeof TDF_Label;
  TDataStd_Name: typeof TDataStd_Name;
  TDataStd_GenericEmpty: typeof TDataStd_GenericEmpty;
  TDataStd_GenericExtString: typeof TDataStd_GenericExtString;
  TDocStd_Document: typeof TDocStd_Document;
  CDM_Document: typeof CDM_Document;
  GeomToolsWrapper: typeof GeomToolsWrapper;
  Handle_XSControl_WorkSession: typeof Handle_XSControl_WorkSession;
  Handle_XSControl_WorkSession_1: typeof Handle_XSControl_WorkSession_1;
  Handle_XSControl_WorkSession_2: typeof Handle_XSControl_WorkSession_2;
  Handle_XSControl_WorkSession_3: typeof Handle_XSControl_WorkSession_3;
  Handle_XSControl_WorkSession_4: typeof Handle_XSControl_WorkSession_4;
  Handle_XCAFDoc_ColorTool: typeof Handle_XCAFDoc_ColorTool;
  Handle_XCAFDoc_ColorTool_1: typeof Handle_XCAFDoc_ColorTool_1;
  Handle_XCAFDoc_ColorTool_2: typeof Handle_XCAFDoc_ColorTool_2;
  Handle_XCAFDoc_ColorTool_3: typeof Handle_XCAFDoc_ColorTool_3;
  Handle_XCAFDoc_ColorTool_4: typeof Handle_XCAFDoc_ColorTool_4;
  Handle_TDataStd_Name: typeof Handle_TDataStd_Name;
  Handle_TDataStd_Name_1: typeof Handle_TDataStd_Name_1;
  Handle_TDataStd_Name_2: typeof Handle_TDataStd_Name_2;
  Handle_TDataStd_Name_3: typeof Handle_TDataStd_Name_3;
  Handle_TDataStd_Name_4: typeof Handle_TDataStd_Name_4;
  Handle_Poly_PolygonOnTriangulation: typeof Handle_Poly_PolygonOnTriangulation;
  Handle_Poly_PolygonOnTriangulation_1: typeof Handle_Poly_PolygonOnTriangulation_1;
  Handle_Poly_PolygonOnTriangulation_2: typeof Handle_Poly_PolygonOnTriangulation_2;
  Handle_Poly_PolygonOnTriangulation_3: typeof Handle_Poly_PolygonOnTriangulation_3;
  Handle_Poly_PolygonOnTriangulation_4: typeof Handle_Poly_PolygonOnTriangulation_4;
  Handle_Geom2d_Curve: typeof Handle_Geom2d_Curve;
  Handle_Geom2d_Curve_1: typeof Handle_Geom2d_Curve_1;
  Handle_Geom2d_Curve_2: typeof Handle_Geom2d_Curve_2;
  Handle_Geom2d_Curve_3: typeof Handle_Geom2d_Curve_3;
  Handle_Geom2d_Curve_4: typeof Handle_Geom2d_Curve_4;
  Handle_Geom2d_Geometry: typeof Handle_Geom2d_Geometry;
  Handle_Geom2d_Geometry_1: typeof Handle_Geom2d_Geometry_1;
  Handle_Geom2d_Geometry_2: typeof Handle_Geom2d_Geometry_2;
  Handle_Geom2d_Geometry_3: typeof Handle_Geom2d_Geometry_3;
  Handle_Geom2d_Geometry_4: typeof Handle_Geom2d_Geometry_4;
  BRepMesh_IncrementalMeshWrapper: typeof BRepMesh_IncrementalMeshWrapper;
  Handle_Geom_Curve: typeof Handle_Geom_Curve;
  Handle_Geom_Curve_1: typeof Handle_Geom_Curve_1;
  Handle_Geom_Curve_2: typeof Handle_Geom_Curve_2;
  Handle_Geom_Curve_3: typeof Handle_Geom_Curve_3;
  Handle_Geom_Curve_4: typeof Handle_Geom_Curve_4;
  TopoDS_Cast: typeof TopoDS_Cast;
  Handle_Geom2d_BezierCurve: typeof Handle_Geom2d_BezierCurve;
  Handle_Geom2d_BezierCurve_1: typeof Handle_Geom2d_BezierCurve_1;
  Handle_Geom2d_BezierCurve_2: typeof Handle_Geom2d_BezierCurve_2;
  Handle_Geom2d_BezierCurve_3: typeof Handle_Geom2d_BezierCurve_3;
  Handle_Geom2d_BezierCurve_4: typeof Handle_Geom2d_BezierCurve_4;
  Handle_Poly_Triangulation: typeof Handle_Poly_Triangulation;
  Handle_Poly_Triangulation_1: typeof Handle_Poly_Triangulation_1;
  Handle_Poly_Triangulation_2: typeof Handle_Poly_Triangulation_2;
  Handle_Poly_Triangulation_3: typeof Handle_Poly_Triangulation_3;
  Handle_Poly_Triangulation_4: typeof Handle_Poly_Triangulation_4;
  OCJS_ShapeHasher: typeof OCJS_ShapeHasher;
  Handle_TDocStd_Document: typeof Handle_TDocStd_Document;
  Handle_TDocStd_Document_1: typeof Handle_TDocStd_Document_1;
  Handle_TDocStd_Document_2: typeof Handle_TDocStd_Document_2;
  Handle_TDocStd_Document_3: typeof Handle_TDocStd_Document_3;
  Handle_TDocStd_Document_4: typeof Handle_TDocStd_Document_4;
  BRepToolsWrapper: typeof BRepToolsWrapper;
  Handle_Geom2d_TrimmedCurve: typeof Handle_Geom2d_TrimmedCurve;
  Handle_Geom2d_TrimmedCurve_1: typeof Handle_Geom2d_TrimmedCurve_1;
  Handle_Geom2d_TrimmedCurve_2: typeof Handle_Geom2d_TrimmedCurve_2;
  Handle_Geom2d_TrimmedCurve_3: typeof Handle_Geom2d_TrimmedCurve_3;
  Handle_Geom2d_TrimmedCurve_4: typeof Handle_Geom2d_TrimmedCurve_4;
  Handle_Geom2d_BSplineCurve: typeof Handle_Geom2d_BSplineCurve;
  Handle_Geom2d_BSplineCurve_1: typeof Handle_Geom2d_BSplineCurve_1;
  Handle_Geom2d_BSplineCurve_2: typeof Handle_Geom2d_BSplineCurve_2;
  Handle_Geom2d_BSplineCurve_3: typeof Handle_Geom2d_BSplineCurve_3;
  Handle_Geom2d_BSplineCurve_4: typeof Handle_Geom2d_BSplineCurve_4;
  Handle_XCAFDoc_ShapeTool: typeof Handle_XCAFDoc_ShapeTool;
  Handle_XCAFDoc_ShapeTool_1: typeof Handle_XCAFDoc_ShapeTool_1;
  Handle_XCAFDoc_ShapeTool_2: typeof Handle_XCAFDoc_ShapeTool_2;
  Handle_XCAFDoc_ShapeTool_3: typeof Handle_XCAFDoc_ShapeTool_3;
  Handle_XCAFDoc_ShapeTool_4: typeof Handle_XCAFDoc_ShapeTool_4;
  Handle_HLRBRep_Algo: typeof Handle_HLRBRep_Algo;
  Handle_HLRBRep_Algo_1: typeof Handle_HLRBRep_Algo_1;
  Handle_HLRBRep_Algo_2: typeof Handle_HLRBRep_Algo_2;
  Handle_HLRBRep_Algo_3: typeof Handle_HLRBRep_Algo_3;
  Handle_HLRBRep_Algo_4: typeof Handle_HLRBRep_Algo_4;
  Handle_Geom_Geometry: typeof Handle_Geom_Geometry;
  Handle_Geom_Geometry_1: typeof Handle_Geom_Geometry_1;
  Handle_Geom_Geometry_2: typeof Handle_Geom_Geometry_2;
  Handle_Geom_Geometry_3: typeof Handle_Geom_Geometry_3;
  Handle_Geom_Geometry_4: typeof Handle_Geom_Geometry_4;
  Handle_Law_Function: typeof Handle_Law_Function;
  Handle_Law_Function_1: typeof Handle_Law_Function_1;
  Handle_Law_Function_2: typeof Handle_Law_Function_2;
  Handle_Law_Function_3: typeof Handle_Law_Function_3;
  Handle_Law_Function_4: typeof Handle_Law_Function_4;
  Handle_Geom_Surface: typeof Handle_Geom_Surface;
  Handle_Geom_Surface_1: typeof Handle_Geom_Surface_1;
  Handle_Geom_Surface_2: typeof Handle_Geom_Surface_2;
  Handle_Geom_Surface_3: typeof Handle_Geom_Surface_3;
  Handle_Geom_Surface_4: typeof Handle_Geom_Surface_4;
  BRepFill_TypeOfContact: BRepFill_TypeOfContact;
  BOPAlgo_GlueEnum: BOPAlgo_GlueEnum;
  BOPAlgo_Options: typeof BOPAlgo_Options;
  BOPAlgo_Options_1: typeof BOPAlgo_Options_1;
  BOPAlgo_Options_2: typeof BOPAlgo_Options_2;
  BRepAlgoAPI_Cut: typeof BRepAlgoAPI_Cut;
  BRepAlgoAPI_Cut_1: typeof BRepAlgoAPI_Cut_1;
  BRepAlgoAPI_Cut_2: typeof BRepAlgoAPI_Cut_2;
  BRepAlgoAPI_Cut_3: typeof BRepAlgoAPI_Cut_3;
  BRepAlgoAPI_Cut_4: typeof BRepAlgoAPI_Cut_4;
  BRepAlgoAPI_BuilderAlgo: typeof BRepAlgoAPI_BuilderAlgo;
  BRepAlgoAPI_BuilderAlgo_1: typeof BRepAlgoAPI_BuilderAlgo_1;
  BRepAlgoAPI_BuilderAlgo_2: typeof BRepAlgoAPI_BuilderAlgo_2;
  BRepAlgoAPI_Common: typeof BRepAlgoAPI_Common;
  BRepAlgoAPI_Common_1: typeof BRepAlgoAPI_Common_1;
  BRepAlgoAPI_Common_2: typeof BRepAlgoAPI_Common_2;
  BRepAlgoAPI_Common_3: typeof BRepAlgoAPI_Common_3;
  BRepAlgoAPI_Common_4: typeof BRepAlgoAPI_Common_4;
  BRepAlgoAPI_Section: typeof BRepAlgoAPI_Section;
  BRepAlgoAPI_Section_1: typeof BRepAlgoAPI_Section_1;
  BRepAlgoAPI_Section_2: typeof BRepAlgoAPI_Section_2;
  BRepAlgoAPI_Section_3: typeof BRepAlgoAPI_Section_3;
  BRepAlgoAPI_Section_4: typeof BRepAlgoAPI_Section_4;
  BRepAlgoAPI_Section_5: typeof BRepAlgoAPI_Section_5;
  BRepAlgoAPI_Section_6: typeof BRepAlgoAPI_Section_6;
  BRepAlgoAPI_Section_7: typeof BRepAlgoAPI_Section_7;
  BRepAlgoAPI_Section_8: typeof BRepAlgoAPI_Section_8;
  BRepAlgoAPI_Algo: typeof BRepAlgoAPI_Algo;
  BRepAlgoAPI_BooleanOperation: typeof BRepAlgoAPI_BooleanOperation;
  BRepAlgoAPI_BooleanOperation_1: typeof BRepAlgoAPI_BooleanOperation_1;
  BRepAlgoAPI_BooleanOperation_2: typeof BRepAlgoAPI_BooleanOperation_2;
  BRepAlgoAPI_Fuse: typeof BRepAlgoAPI_Fuse;
  BRepAlgoAPI_Fuse_1: typeof BRepAlgoAPI_Fuse_1;
  BRepAlgoAPI_Fuse_2: typeof BRepAlgoAPI_Fuse_2;
  BRepAlgoAPI_Fuse_3: typeof BRepAlgoAPI_Fuse_3;
  BRepAlgoAPI_Fuse_4: typeof BRepAlgoAPI_Fuse_4;
  Law_Composite: typeof Law_Composite;
  Law_Composite_1: typeof Law_Composite_1;
  Law_Composite_2: typeof Law_Composite_2;
  Law_Interpol: typeof Law_Interpol;
  Law_BSpFunc: typeof Law_BSpFunc;
  Law_BSpFunc_1: typeof Law_BSpFunc_1;
  Law_BSpFunc_2: typeof Law_BSpFunc_2;
  Law_S: typeof Law_S;
  Law_Linear: typeof Law_Linear;
  Law_Function: typeof Law_Function;
  Geom2dAPI_InterCurveCurve: typeof Geom2dAPI_InterCurveCurve;
  Geom2dAPI_InterCurveCurve_1: typeof Geom2dAPI_InterCurveCurve_1;
  Geom2dAPI_InterCurveCurve_2: typeof Geom2dAPI_InterCurveCurve_2;
  Geom2dAPI_InterCurveCurve_3: typeof Geom2dAPI_InterCurveCurve_3;
  Geom2dAPI_ProjectPointOnCurve: typeof Geom2dAPI_ProjectPointOnCurve;
  Geom2dAPI_ProjectPointOnCurve_1: typeof Geom2dAPI_ProjectPointOnCurve_1;
  Geom2dAPI_ProjectPointOnCurve_2: typeof Geom2dAPI_ProjectPointOnCurve_2;
  Geom2dAPI_ProjectPointOnCurve_3: typeof Geom2dAPI_ProjectPointOnCurve_3;
  Geom2dAPI_ExtremaCurveCurve: typeof Geom2dAPI_ExtremaCurveCurve;
  Geom2dAPI_PointsToBSpline: typeof Geom2dAPI_PointsToBSpline;
  Geom2dAPI_PointsToBSpline_1: typeof Geom2dAPI_PointsToBSpline_1;
  Geom2dAPI_PointsToBSpline_2: typeof Geom2dAPI_PointsToBSpline_2;
  Geom2dAPI_PointsToBSpline_3: typeof Geom2dAPI_PointsToBSpline_3;
  Geom2dAPI_PointsToBSpline_4: typeof Geom2dAPI_PointsToBSpline_4;
  Geom2dAPI_PointsToBSpline_5: typeof Geom2dAPI_PointsToBSpline_5;
  Geom2dAPI_PointsToBSpline_6: typeof Geom2dAPI_PointsToBSpline_6;
  GeomAPI_PointsToBSpline: typeof GeomAPI_PointsToBSpline;
  GeomAPI_PointsToBSpline_1: typeof GeomAPI_PointsToBSpline_1;
  GeomAPI_PointsToBSpline_2: typeof GeomAPI_PointsToBSpline_2;
  GeomAPI_PointsToBSpline_3: typeof GeomAPI_PointsToBSpline_3;
  GeomAPI_PointsToBSpline_4: typeof GeomAPI_PointsToBSpline_4;
  GeomAPI_PointsToBSpline_5: typeof GeomAPI_PointsToBSpline_5;
  GeomAPI_ProjectPointOnSurf: typeof GeomAPI_ProjectPointOnSurf;
  GeomAPI_ProjectPointOnSurf_1: typeof GeomAPI_ProjectPointOnSurf_1;
  GeomAPI_ProjectPointOnSurf_2: typeof GeomAPI_ProjectPointOnSurf_2;
  GeomAPI_ProjectPointOnSurf_3: typeof GeomAPI_ProjectPointOnSurf_3;
  GeomAPI_ProjectPointOnSurf_4: typeof GeomAPI_ProjectPointOnSurf_4;
  GeomAPI_ProjectPointOnSurf_5: typeof GeomAPI_ProjectPointOnSurf_5;
  BRepPrimAPI_MakePrism: typeof BRepPrimAPI_MakePrism;
  BRepPrimAPI_MakePrism_1: typeof BRepPrimAPI_MakePrism_1;
  BRepPrimAPI_MakePrism_2: typeof BRepPrimAPI_MakePrism_2;
  BRepPrimAPI_MakeSphere: typeof BRepPrimAPI_MakeSphere;
  BRepPrimAPI_MakeSphere_1: typeof BRepPrimAPI_MakeSphere_1;
  BRepPrimAPI_MakeSphere_2: typeof BRepPrimAPI_MakeSphere_2;
  BRepPrimAPI_MakeSphere_3: typeof BRepPrimAPI_MakeSphere_3;
  BRepPrimAPI_MakeSphere_4: typeof BRepPrimAPI_MakeSphere_4;
  BRepPrimAPI_MakeSphere_5: typeof BRepPrimAPI_MakeSphere_5;
  BRepPrimAPI_MakeSphere_6: typeof BRepPrimAPI_MakeSphere_6;
  BRepPrimAPI_MakeSphere_7: typeof BRepPrimAPI_MakeSphere_7;
  BRepPrimAPI_MakeSphere_8: typeof BRepPrimAPI_MakeSphere_8;
  BRepPrimAPI_MakeSphere_9: typeof BRepPrimAPI_MakeSphere_9;
  BRepPrimAPI_MakeSphere_10: typeof BRepPrimAPI_MakeSphere_10;
  BRepPrimAPI_MakeSphere_11: typeof BRepPrimAPI_MakeSphere_11;
  BRepPrimAPI_MakeSphere_12: typeof BRepPrimAPI_MakeSphere_12;
  BRepPrimAPI_MakeRevol: typeof BRepPrimAPI_MakeRevol;
  BRepPrimAPI_MakeRevol_1: typeof BRepPrimAPI_MakeRevol_1;
  BRepPrimAPI_MakeRevol_2: typeof BRepPrimAPI_MakeRevol_2;
  BRepPrimAPI_MakeSweep: typeof BRepPrimAPI_MakeSweep;
  BRepPrimAPI_MakeCylinder: typeof BRepPrimAPI_MakeCylinder;
  BRepPrimAPI_MakeCylinder_1: typeof BRepPrimAPI_MakeCylinder_1;
  BRepPrimAPI_MakeCylinder_2: typeof BRepPrimAPI_MakeCylinder_2;
  BRepPrimAPI_MakeCylinder_3: typeof BRepPrimAPI_MakeCylinder_3;
  BRepPrimAPI_MakeCylinder_4: typeof BRepPrimAPI_MakeCylinder_4;
  BRepPrimAPI_MakeOneAxis: typeof BRepPrimAPI_MakeOneAxis;
  BRepPrimAPI_MakeBox: typeof BRepPrimAPI_MakeBox;
  BRepPrimAPI_MakeBox_1: typeof BRepPrimAPI_MakeBox_1;
  BRepPrimAPI_MakeBox_2: typeof BRepPrimAPI_MakeBox_2;
  BRepPrimAPI_MakeBox_3: typeof BRepPrimAPI_MakeBox_3;
  BRepPrimAPI_MakeBox_4: typeof BRepPrimAPI_MakeBox_4;
  BRepPrimAPI_MakeBox_5: typeof BRepPrimAPI_MakeBox_5;
  HLRBRep_InternalAlgo: typeof HLRBRep_InternalAlgo;
  HLRBRep_InternalAlgo_1: typeof HLRBRep_InternalAlgo_1;
  HLRBRep_InternalAlgo_2: typeof HLRBRep_InternalAlgo_2;
  HLRBRep_Algo: typeof HLRBRep_Algo;
  HLRBRep_Algo_1: typeof HLRBRep_Algo_1;
  HLRBRep_Algo_2: typeof HLRBRep_Algo_2;
  HLRBRep_HLRToShape: typeof HLRBRep_HLRToShape;
  HLRAlgo_Projector: typeof HLRAlgo_Projector;
  HLRAlgo_Projector_1: typeof HLRAlgo_Projector_1;
  HLRAlgo_Projector_2: typeof HLRAlgo_Projector_2;
  HLRAlgo_Projector_3: typeof HLRAlgo_Projector_3;
  HLRAlgo_Projector_4: typeof HLRAlgo_Projector_4;
  HLRAlgo_Projector_5: typeof HLRAlgo_Projector_5;
  BRepOffset_Mode: BRepOffset_Mode;
  BRepOffsetAPI_MakeThickSolid: typeof BRepOffsetAPI_MakeThickSolid;
  BRepOffsetAPI_MakeFilling: typeof BRepOffsetAPI_MakeFilling;
  BRepOffsetAPI_MakeOffsetShape: typeof BRepOffsetAPI_MakeOffsetShape;
  BRepOffsetAPI_ThruSections: typeof BRepOffsetAPI_ThruSections;
  BRepOffsetAPI_MakeOffset: typeof BRepOffsetAPI_MakeOffset;
  BRepOffsetAPI_MakeOffset_1: typeof BRepOffsetAPI_MakeOffset_1;
  BRepOffsetAPI_MakeOffset_2: typeof BRepOffsetAPI_MakeOffset_2;
  BRepOffsetAPI_MakeOffset_3: typeof BRepOffsetAPI_MakeOffset_3;
  BRepOffsetAPI_MakePipeShell: typeof BRepOffsetAPI_MakePipeShell;
  BRepExtrema_DistShapeShape: typeof BRepExtrema_DistShapeShape;
  BRepExtrema_DistShapeShape_1: typeof BRepExtrema_DistShapeShape_1;
  BRepExtrema_DistShapeShape_2: typeof BRepExtrema_DistShapeShape_2;
  BRepExtrema_DistShapeShape_3: typeof BRepExtrema_DistShapeShape_3;
  BRepBndLib: typeof BRepBndLib;
  BRepBuilderAPI_WireError: BRepBuilderAPI_WireError;
  BRepBuilderAPI_MakeEdge: typeof BRepBuilderAPI_MakeEdge;
  BRepBuilderAPI_MakeEdge_1: typeof BRepBuilderAPI_MakeEdge_1;
  BRepBuilderAPI_MakeEdge_2: typeof BRepBuilderAPI_MakeEdge_2;
  BRepBuilderAPI_MakeEdge_3: typeof BRepBuilderAPI_MakeEdge_3;
  BRepBuilderAPI_MakeEdge_4: typeof BRepBuilderAPI_MakeEdge_4;
  BRepBuilderAPI_MakeEdge_5: typeof BRepBuilderAPI_MakeEdge_5;
  BRepBuilderAPI_MakeEdge_6: typeof BRepBuilderAPI_MakeEdge_6;
  BRepBuilderAPI_MakeEdge_7: typeof BRepBuilderAPI_MakeEdge_7;
  BRepBuilderAPI_MakeEdge_8: typeof BRepBuilderAPI_MakeEdge_8;
  BRepBuilderAPI_MakeEdge_9: typeof BRepBuilderAPI_MakeEdge_9;
  BRepBuilderAPI_MakeEdge_10: typeof BRepBuilderAPI_MakeEdge_10;
  BRepBuilderAPI_MakeEdge_11: typeof BRepBuilderAPI_MakeEdge_11;
  BRepBuilderAPI_MakeEdge_12: typeof BRepBuilderAPI_MakeEdge_12;
  BRepBuilderAPI_MakeEdge_13: typeof BRepBuilderAPI_MakeEdge_13;
  BRepBuilderAPI_MakeEdge_14: typeof BRepBuilderAPI_MakeEdge_14;
  BRepBuilderAPI_MakeEdge_15: typeof BRepBuilderAPI_MakeEdge_15;
  BRepBuilderAPI_MakeEdge_16: typeof BRepBuilderAPI_MakeEdge_16;
  BRepBuilderAPI_MakeEdge_17: typeof BRepBuilderAPI_MakeEdge_17;
  BRepBuilderAPI_MakeEdge_18: typeof BRepBuilderAPI_MakeEdge_18;
  BRepBuilderAPI_MakeEdge_19: typeof BRepBuilderAPI_MakeEdge_19;
  BRepBuilderAPI_MakeEdge_20: typeof BRepBuilderAPI_MakeEdge_20;
  BRepBuilderAPI_MakeEdge_21: typeof BRepBuilderAPI_MakeEdge_21;
  BRepBuilderAPI_MakeEdge_22: typeof BRepBuilderAPI_MakeEdge_22;
  BRepBuilderAPI_MakeEdge_23: typeof BRepBuilderAPI_MakeEdge_23;
  BRepBuilderAPI_MakeEdge_24: typeof BRepBuilderAPI_MakeEdge_24;
  BRepBuilderAPI_MakeEdge_25: typeof BRepBuilderAPI_MakeEdge_25;
  BRepBuilderAPI_MakeEdge_26: typeof BRepBuilderAPI_MakeEdge_26;
  BRepBuilderAPI_MakeEdge_27: typeof BRepBuilderAPI_MakeEdge_27;
  BRepBuilderAPI_MakeEdge_28: typeof BRepBuilderAPI_MakeEdge_28;
  BRepBuilderAPI_MakeEdge_29: typeof BRepBuilderAPI_MakeEdge_29;
  BRepBuilderAPI_MakeEdge_30: typeof BRepBuilderAPI_MakeEdge_30;
  BRepBuilderAPI_MakeEdge_31: typeof BRepBuilderAPI_MakeEdge_31;
  BRepBuilderAPI_MakeEdge_32: typeof BRepBuilderAPI_MakeEdge_32;
  BRepBuilderAPI_MakeEdge_33: typeof BRepBuilderAPI_MakeEdge_33;
  BRepBuilderAPI_MakeEdge_34: typeof BRepBuilderAPI_MakeEdge_34;
  BRepBuilderAPI_MakeEdge_35: typeof BRepBuilderAPI_MakeEdge_35;
  BRepBuilderAPI_TransitionMode: BRepBuilderAPI_TransitionMode;
  BRepBuilderAPI_ModifyShape: typeof BRepBuilderAPI_ModifyShape;
  BRepBuilderAPI_Sewing: typeof BRepBuilderAPI_Sewing;
  BRepBuilderAPI_MakeFace: typeof BRepBuilderAPI_MakeFace;
  BRepBuilderAPI_MakeFace_1: typeof BRepBuilderAPI_MakeFace_1;
  BRepBuilderAPI_MakeFace_2: typeof BRepBuilderAPI_MakeFace_2;
  BRepBuilderAPI_MakeFace_3: typeof BRepBuilderAPI_MakeFace_3;
  BRepBuilderAPI_MakeFace_4: typeof BRepBuilderAPI_MakeFace_4;
  BRepBuilderAPI_MakeFace_5: typeof BRepBuilderAPI_MakeFace_5;
  BRepBuilderAPI_MakeFace_6: typeof BRepBuilderAPI_MakeFace_6;
  BRepBuilderAPI_MakeFace_7: typeof BRepBuilderAPI_MakeFace_7;
  BRepBuilderAPI_MakeFace_8: typeof BRepBuilderAPI_MakeFace_8;
  BRepBuilderAPI_MakeFace_9: typeof BRepBuilderAPI_MakeFace_9;
  BRepBuilderAPI_MakeFace_10: typeof BRepBuilderAPI_MakeFace_10;
  BRepBuilderAPI_MakeFace_11: typeof BRepBuilderAPI_MakeFace_11;
  BRepBuilderAPI_MakeFace_12: typeof BRepBuilderAPI_MakeFace_12;
  BRepBuilderAPI_MakeFace_13: typeof BRepBuilderAPI_MakeFace_13;
  BRepBuilderAPI_MakeFace_14: typeof BRepBuilderAPI_MakeFace_14;
  BRepBuilderAPI_MakeFace_15: typeof BRepBuilderAPI_MakeFace_15;
  BRepBuilderAPI_MakeFace_16: typeof BRepBuilderAPI_MakeFace_16;
  BRepBuilderAPI_MakeFace_17: typeof BRepBuilderAPI_MakeFace_17;
  BRepBuilderAPI_MakeFace_18: typeof BRepBuilderAPI_MakeFace_18;
  BRepBuilderAPI_MakeFace_19: typeof BRepBuilderAPI_MakeFace_19;
  BRepBuilderAPI_MakeFace_20: typeof BRepBuilderAPI_MakeFace_20;
  BRepBuilderAPI_MakeFace_21: typeof BRepBuilderAPI_MakeFace_21;
  BRepBuilderAPI_MakeFace_22: typeof BRepBuilderAPI_MakeFace_22;
  BRepBuilderAPI_Transform: typeof BRepBuilderAPI_Transform;
  BRepBuilderAPI_Transform_1: typeof BRepBuilderAPI_Transform_1;
  BRepBuilderAPI_Transform_2: typeof BRepBuilderAPI_Transform_2;
  BRepBuilderAPI_MakeVertex: typeof BRepBuilderAPI_MakeVertex;
  BRepBuilderAPI_MakeShape: typeof BRepBuilderAPI_MakeShape;
  BRepBuilderAPI_MakeWire: typeof BRepBuilderAPI_MakeWire;
  BRepBuilderAPI_MakeWire_1: typeof BRepBuilderAPI_MakeWire_1;
  BRepBuilderAPI_MakeWire_2: typeof BRepBuilderAPI_MakeWire_2;
  BRepBuilderAPI_MakeWire_3: typeof BRepBuilderAPI_MakeWire_3;
  BRepBuilderAPI_MakeWire_4: typeof BRepBuilderAPI_MakeWire_4;
  BRepBuilderAPI_MakeWire_5: typeof BRepBuilderAPI_MakeWire_5;
  BRepBuilderAPI_MakeWire_6: typeof BRepBuilderAPI_MakeWire_6;
  BRepBuilderAPI_MakeWire_7: typeof BRepBuilderAPI_MakeWire_7;
  BRepBuilderAPI_MakeShell: typeof BRepBuilderAPI_MakeShell;
  BRepBuilderAPI_MakeShell_1: typeof BRepBuilderAPI_MakeShell_1;
  BRepBuilderAPI_MakeShell_2: typeof BRepBuilderAPI_MakeShell_2;
  BRepBuilderAPI_MakeShell_3: typeof BRepBuilderAPI_MakeShell_3;
  BRepBuilderAPI_MakeSolid: typeof BRepBuilderAPI_MakeSolid;
  BRepBuilderAPI_MakeSolid_1: typeof BRepBuilderAPI_MakeSolid_1;
  BRepBuilderAPI_MakeSolid_2: typeof BRepBuilderAPI_MakeSolid_2;
  BRepBuilderAPI_MakeSolid_3: typeof BRepBuilderAPI_MakeSolid_3;
  BRepBuilderAPI_MakeSolid_4: typeof BRepBuilderAPI_MakeSolid_4;
  BRepBuilderAPI_MakeSolid_5: typeof BRepBuilderAPI_MakeSolid_5;
  BRepBuilderAPI_MakeSolid_6: typeof BRepBuilderAPI_MakeSolid_6;
  BRepBuilderAPI_MakeSolid_7: typeof BRepBuilderAPI_MakeSolid_7;
  BRepBuilderAPI_Command: typeof BRepBuilderAPI_Command;
  BRepLib: typeof BRepLib;
  BRepGProp: typeof BRepGProp;
  BRepGProp_Face: typeof BRepGProp_Face;
  BRepGProp_Face_1: typeof BRepGProp_Face_1;
  BRepGProp_Face_2: typeof BRepGProp_Face_2;
  ChFi3d_FilletShape: ChFi3d_FilletShape;
  ChFiDS_ChamfMode: ChFiDS_ChamfMode;
  BRepFilletAPI_MakeChamfer: typeof BRepFilletAPI_MakeChamfer;
  BRepFilletAPI_MakeFillet: typeof BRepFilletAPI_MakeFillet;
  BRepFilletAPI_LocalOperation: typeof BRepFilletAPI_LocalOperation;
  ShapeFix_Wire: typeof ShapeFix_Wire;
  ShapeFix_Wire_1: typeof ShapeFix_Wire_1;
  ShapeFix_Wire_2: typeof ShapeFix_Wire_2;
  ShapeFix_Solid: typeof ShapeFix_Solid;
  ShapeFix_Solid_1: typeof ShapeFix_Solid_1;
  ShapeFix_Solid_2: typeof ShapeFix_Solid_2;
  ShapeFix_Root: typeof ShapeFix_Root;
  ShapeFix_Face: typeof ShapeFix_Face;
  ShapeFix_Face_1: typeof ShapeFix_Face_1;
  ShapeFix_Face_2: typeof ShapeFix_Face_2;
  ShapeUpgrade_UnifySameDomain: typeof ShapeUpgrade_UnifySameDomain;
  ShapeUpgrade_UnifySameDomain_1: typeof ShapeUpgrade_UnifySameDomain_1;
  ShapeUpgrade_UnifySameDomain_2: typeof ShapeUpgrade_UnifySameDomain_2;
  BRepFeat_Form: typeof BRepFeat_Form;
  BRepFeat_MakeDPrism: typeof BRepFeat_MakeDPrism;
  BRepFeat_MakeDPrism_1: typeof BRepFeat_MakeDPrism_1;
  BRepFeat_MakeDPrism_2: typeof BRepFeat_MakeDPrism_2;
  Adaptor3d_Curve: typeof Adaptor3d_Curve;
  Adaptor3d_Surface: typeof Adaptor3d_Surface;
  GeomAdaptor_TransformedSurface: typeof GeomAdaptor_TransformedSurface;
  GeomAdaptor_TransformedSurface_1: typeof GeomAdaptor_TransformedSurface_1;
  GeomAdaptor_TransformedSurface_2: typeof GeomAdaptor_TransformedSurface_2;
  GeomAdaptor_TransformedSurface_3: typeof GeomAdaptor_TransformedSurface_3;
  TopAbs_ShapeEnum: TopAbs_ShapeEnum;
  TopAbs_Orientation: TopAbs_Orientation;
  Geom_TrimmedCurve: typeof Geom_TrimmedCurve;
  Geom_BoundedCurve: typeof Geom_BoundedCurve;
  Geom_BSplineSurface: typeof Geom_BSplineSurface;
  Geom_BSplineSurface_1: typeof Geom_BSplineSurface_1;
  Geom_BSplineSurface_2: typeof Geom_BSplineSurface_2;
  Geom_BSplineSurface_3: typeof Geom_BSplineSurface_3;
  Geom_BSplineCurve: typeof Geom_BSplineCurve;
  Geom_BSplineCurve_1: typeof Geom_BSplineCurve_1;
  Geom_BSplineCurve_2: typeof Geom_BSplineCurve_2;
  Geom_BSplineCurve_3: typeof Geom_BSplineCurve_3;
  Geom_SphericalSurface: typeof Geom_SphericalSurface;
  Geom_SphericalSurface_1: typeof Geom_SphericalSurface_1;
  Geom_SphericalSurface_2: typeof Geom_SphericalSurface_2;
  Geom_BezierCurve: typeof Geom_BezierCurve;
  Geom_BezierCurve_1: typeof Geom_BezierCurve_1;
  Geom_BezierCurve_2: typeof Geom_BezierCurve_2;
  Geom_BezierCurve_3: typeof Geom_BezierCurve_3;
  Geom_Geometry: typeof Geom_Geometry;
  Geom_CylindricalSurface: typeof Geom_CylindricalSurface;
  Geom_CylindricalSurface_1: typeof Geom_CylindricalSurface_1;
  Geom_CylindricalSurface_2: typeof Geom_CylindricalSurface_2;
  Geom_Surface: typeof Geom_Surface;
  Geom_ElementarySurface: typeof Geom_ElementarySurface;
  Geom_Curve: typeof Geom_Curve;
  Geom_BoundedSurface: typeof Geom_BoundedSurface;
  GProp_GProps: typeof GProp_GProps;
  GProp_GProps_1: typeof GProp_GProps_1;
  GProp_GProps_2: typeof GProp_GProps_2;
  Geom2d_BSplineCurve: typeof Geom2d_BSplineCurve;
  Geom2d_BSplineCurve_1: typeof Geom2d_BSplineCurve_1;
  Geom2d_BSplineCurve_2: typeof Geom2d_BSplineCurve_2;
  Geom2d_BSplineCurve_3: typeof Geom2d_BSplineCurve_3;
  Geom2d_BoundedCurve: typeof Geom2d_BoundedCurve;
  Geom2d_TrimmedCurve: typeof Geom2d_TrimmedCurve;
  Geom2d_Circle: typeof Geom2d_Circle;
  Geom2d_Circle_1: typeof Geom2d_Circle_1;
  Geom2d_Circle_2: typeof Geom2d_Circle_2;
  Geom2d_Circle_3: typeof Geom2d_Circle_3;
  Geom2d_Line: typeof Geom2d_Line;
  Geom2d_Line_1: typeof Geom2d_Line_1;
  Geom2d_Line_2: typeof Geom2d_Line_2;
  Geom2d_Line_3: typeof Geom2d_Line_3;
  Geom2d_Curve: typeof Geom2d_Curve;
  Geom2d_OffsetCurve: typeof Geom2d_OffsetCurve;
  Geom2d_OffsetCurve_1: typeof Geom2d_OffsetCurve_1;
  Geom2d_OffsetCurve_2: typeof Geom2d_OffsetCurve_2;
  Geom2d_BezierCurve: typeof Geom2d_BezierCurve;
  Geom2d_BezierCurve_1: typeof Geom2d_BezierCurve_1;
  Geom2d_BezierCurve_2: typeof Geom2d_BezierCurve_2;
  Geom2d_BezierCurve_3: typeof Geom2d_BezierCurve_3;
  Geom2d_Conic: typeof Geom2d_Conic;
  Geom2d_Geometry: typeof Geom2d_Geometry;
  Geom2d_Ellipse: typeof Geom2d_Ellipse;
  Geom2d_Ellipse_1: typeof Geom2d_Ellipse_1;
  Geom2d_Ellipse_2: typeof Geom2d_Ellipse_2;
  Geom2d_Ellipse_3: typeof Geom2d_Ellipse_3;
  Geom2dAdaptor_Curve: typeof Geom2dAdaptor_Curve;
  Geom2dAdaptor_Curve_1: typeof Geom2dAdaptor_Curve_1;
  Geom2dAdaptor_Curve_2: typeof Geom2dAdaptor_Curve_2;
  Geom2dAdaptor_Curve_3: typeof Geom2dAdaptor_Curve_3;
  Adaptor2d_Curve2d: typeof Adaptor2d_Curve2d;
  GeomTools: typeof GeomTools;
  Geom2dConvert: typeof Geom2dConvert;
  Geom2dConvert_BSplineCurveToBezierCurve: typeof Geom2dConvert_BSplineCurveToBezierCurve;
  Geom2dConvert_BSplineCurveToBezierCurve_1: typeof Geom2dConvert_BSplineCurveToBezierCurve_1;
  Geom2dConvert_BSplineCurveToBezierCurve_2: typeof Geom2dConvert_BSplineCurveToBezierCurve_2;
  GeomLib: typeof GeomLib;
  GCE2d_MakeArcOfEllipse: typeof GCE2d_MakeArcOfEllipse;
  GCE2d_MakeArcOfEllipse_1: typeof GCE2d_MakeArcOfEllipse_1;
  GCE2d_MakeArcOfEllipse_2: typeof GCE2d_MakeArcOfEllipse_2;
  GCE2d_MakeArcOfEllipse_3: typeof GCE2d_MakeArcOfEllipse_3;
  GCE2d_MakeEllipse: typeof GCE2d_MakeEllipse;
  GCE2d_MakeEllipse_1: typeof GCE2d_MakeEllipse_1;
  GCE2d_MakeEllipse_2: typeof GCE2d_MakeEllipse_2;
  GCE2d_MakeEllipse_3: typeof GCE2d_MakeEllipse_3;
  GCE2d_MakeEllipse_4: typeof GCE2d_MakeEllipse_4;
  GCE2d_MakeSegment: typeof GCE2d_MakeSegment;
  GCE2d_MakeSegment_1: typeof GCE2d_MakeSegment_1;
  GCE2d_MakeSegment_2: typeof GCE2d_MakeSegment_2;
  GCE2d_MakeSegment_3: typeof GCE2d_MakeSegment_3;
  GCE2d_MakeSegment_4: typeof GCE2d_MakeSegment_4;
  GCE2d_MakeSegment_5: typeof GCE2d_MakeSegment_5;
  GCE2d_MakeArcOfCircle: typeof GCE2d_MakeArcOfCircle;
  GCE2d_MakeArcOfCircle_1: typeof GCE2d_MakeArcOfCircle_1;
  GCE2d_MakeArcOfCircle_2: typeof GCE2d_MakeArcOfCircle_2;
  GCE2d_MakeArcOfCircle_3: typeof GCE2d_MakeArcOfCircle_3;
  GCE2d_MakeArcOfCircle_4: typeof GCE2d_MakeArcOfCircle_4;
  GCE2d_MakeArcOfCircle_5: typeof GCE2d_MakeArcOfCircle_5;
  GCE2d_MakeCircle: typeof GCE2d_MakeCircle;
  GCE2d_MakeCircle_1: typeof GCE2d_MakeCircle_1;
  GCE2d_MakeCircle_2: typeof GCE2d_MakeCircle_2;
  GCE2d_MakeCircle_3: typeof GCE2d_MakeCircle_3;
  GCE2d_MakeCircle_4: typeof GCE2d_MakeCircle_4;
  GCE2d_MakeCircle_5: typeof GCE2d_MakeCircle_5;
  GCE2d_MakeCircle_6: typeof GCE2d_MakeCircle_6;
  GCE2d_MakeCircle_7: typeof GCE2d_MakeCircle_7;
  GCE2d_MakeCircle_8: typeof GCE2d_MakeCircle_8;
  GCE2d_Root: typeof GCE2d_Root;
  Extrema_ExtAlgo: Extrema_ExtAlgo;
  GCPnts_TangentialDeflection: typeof GCPnts_TangentialDeflection;
  GCPnts_TangentialDeflection_1: typeof GCPnts_TangentialDeflection_1;
  GCPnts_TangentialDeflection_2: typeof GCPnts_TangentialDeflection_2;
  GCPnts_TangentialDeflection_3: typeof GCPnts_TangentialDeflection_3;
  GCPnts_TangentialDeflection_4: typeof GCPnts_TangentialDeflection_4;
  GCPnts_TangentialDeflection_5: typeof GCPnts_TangentialDeflection_5;
  GC_MakeArcOfCircle: typeof GC_MakeArcOfCircle;
  GC_MakeArcOfCircle_1: typeof GC_MakeArcOfCircle_1;
  GC_MakeArcOfCircle_2: typeof GC_MakeArcOfCircle_2;
  GC_MakeArcOfCircle_3: typeof GC_MakeArcOfCircle_3;
  GC_MakeArcOfCircle_4: typeof GC_MakeArcOfCircle_4;
  GC_MakeArcOfCircle_5: typeof GC_MakeArcOfCircle_5;
  GC_Root: typeof GC_Root;
  BndLib_Add2dCurve: typeof BndLib_Add2dCurve;
  GeomConvert: typeof GeomConvert;
  TopoDS_Vertex: typeof TopoDS_Vertex;
  TopoDS_Compound: typeof TopoDS_Compound;
  TopoDS_Face: typeof TopoDS_Face;
  TopoDS_Builder: typeof TopoDS_Builder;
  TopoDS_CompSolid: typeof TopoDS_CompSolid;
  TopoDS_Edge: typeof TopoDS_Edge;
  TopoDS_Solid: typeof TopoDS_Solid;
  TopoDS_Wire: typeof TopoDS_Wire;
  TopoDS_Shell: typeof TopoDS_Shell;
  TopoDS_Shape: typeof TopoDS_Shape;
  BRepTools: typeof BRepTools;
  BRep_Tool: typeof BRep_Tool;
  BRepAdaptor_Surface: typeof BRepAdaptor_Surface;
  BRepAdaptor_Surface_1: typeof BRepAdaptor_Surface_1;
  BRepAdaptor_Surface_2: typeof BRepAdaptor_Surface_2;
  BRepAdaptor_CompCurve: typeof BRepAdaptor_CompCurve;
  BRepAdaptor_CompCurve_1: typeof BRepAdaptor_CompCurve_1;
  BRepAdaptor_CompCurve_2: typeof BRepAdaptor_CompCurve_2;
  BRepAdaptor_CompCurve_3: typeof BRepAdaptor_CompCurve_3;
  BRepAdaptor_Curve: typeof BRepAdaptor_Curve;
  BRepAdaptor_Curve_1: typeof BRepAdaptor_Curve_1;
  BRepAdaptor_Curve_2: typeof BRepAdaptor_Curve_2;
  BRepAdaptor_Curve_3: typeof BRepAdaptor_Curve_3;
  BRepAdaptor_Curve2d: typeof BRepAdaptor_Curve2d;
  BRepAdaptor_Curve2d_1: typeof BRepAdaptor_Curve2d_1;
  BRepAdaptor_Curve2d_2: typeof BRepAdaptor_Curve2d_2;
  TopExp_Explorer: typeof TopExp_Explorer;
  TopExp_Explorer_1: typeof TopExp_Explorer_1;
  TopExp_Explorer_2: typeof TopExp_Explorer_2;
  StlAPI_Reader: typeof StlAPI_Reader;
  StlAPI: typeof StlAPI;
  Interface_Static: typeof Interface_Static;
  Interface_Static_1: typeof Interface_Static_1;
  Interface_Static_2: typeof Interface_Static_2;
  Interface_TypedValue: typeof Interface_TypedValue;
  MoniTool_TypedValue: typeof MoniTool_TypedValue;
  MoniTool_TypedValue_1: typeof MoniTool_TypedValue_1;
  MoniTool_TypedValue_2: typeof MoniTool_TypedValue_2;
  XSControl_WorkSession: typeof XSControl_WorkSession;
  XSControl_Reader: typeof XSControl_Reader;
  XSControl_Reader_1: typeof XSControl_Reader_1;
  XSControl_Reader_2: typeof XSControl_Reader_2;
  XSControl_Reader_3: typeof XSControl_Reader_3;
  IFSelect_WorkSession: typeof IFSelect_WorkSession;
  IFSelect_ReturnStatus: IFSelect_ReturnStatus;
  STEPCAFControl_Writer: typeof STEPCAFControl_Writer;
  STEPCAFControl_Writer_1: typeof STEPCAFControl_Writer_1;
  STEPCAFControl_Writer_2: typeof STEPCAFControl_Writer_2;
  STEPControl_Reader: typeof STEPControl_Reader;
  STEPControl_Reader_1: typeof STEPControl_Reader_1;
  STEPControl_Reader_2: typeof STEPControl_Reader_2;
  STEPControl_Writer: typeof STEPControl_Writer;
  STEPControl_Writer_1: typeof STEPControl_Writer_1;
  STEPControl_Writer_2: typeof STEPControl_Writer_2;
  STEPControl_StepModelType: STEPControl_StepModelType;
  XCAFDoc_LengthUnit: typeof XCAFDoc_LengthUnit;
  XCAFDoc_DocumentTool: typeof XCAFDoc_DocumentTool;
  XCAFDoc_ShapeTool: typeof XCAFDoc_ShapeTool;
  XCAFDoc_ColorTool: typeof XCAFDoc_ColorTool;
  XCAFDoc_ColorType: XCAFDoc_ColorType;
  Poly_Array1OfTriangle: typeof Poly_Array1OfTriangle;
  Poly_Array1OfTriangle_1: typeof Poly_Array1OfTriangle_1;
  Poly_Array1OfTriangle_2: typeof Poly_Array1OfTriangle_2;
  Poly_Array1OfTriangle_4: typeof Poly_Array1OfTriangle_4;
  Poly_Array1OfTriangle_5: typeof Poly_Array1OfTriangle_5;
  Poly_Array1OfTriangle_6: typeof Poly_Array1OfTriangle_6;
  TColgp_Array2OfPnt: typeof TColgp_Array2OfPnt;
  TColgp_Array2OfPnt_1: typeof TColgp_Array2OfPnt_1;
  TColgp_Array2OfPnt_2: typeof TColgp_Array2OfPnt_2;
  TColgp_Array2OfPnt_4: typeof TColgp_Array2OfPnt_4;
  TColgp_Array2OfPnt_5: typeof TColgp_Array2OfPnt_5;
  TColgp_Array2OfPnt_6: typeof TColgp_Array2OfPnt_6;
  TColgp_Array1OfPnt2d: typeof TColgp_Array1OfPnt2d;
  TColgp_Array1OfPnt2d_1: typeof TColgp_Array1OfPnt2d_1;
  TColgp_Array1OfPnt2d_2: typeof TColgp_Array1OfPnt2d_2;
  TColgp_Array1OfPnt2d_4: typeof TColgp_Array1OfPnt2d_4;
  TColgp_Array1OfPnt2d_5: typeof TColgp_Array1OfPnt2d_5;
  TColgp_Array1OfPnt2d_6: typeof TColgp_Array1OfPnt2d_6;
  TColStd_Array1OfInteger: typeof TColStd_Array1OfInteger;
  TColStd_Array1OfInteger_1: typeof TColStd_Array1OfInteger_1;
  TColStd_Array1OfInteger_2: typeof TColStd_Array1OfInteger_2;
  TColStd_Array1OfInteger_4: typeof TColStd_Array1OfInteger_4;
  TColStd_Array1OfInteger_5: typeof TColStd_Array1OfInteger_5;
  TColStd_Array1OfInteger_6: typeof TColStd_Array1OfInteger_6;
  TColStd_Array1OfBoolean: typeof TColStd_Array1OfBoolean;
  TColStd_Array1OfBoolean_1: typeof TColStd_Array1OfBoolean_1;
  TColStd_Array1OfBoolean_2: typeof TColStd_Array1OfBoolean_2;
  TColStd_Array1OfBoolean_4: typeof TColStd_Array1OfBoolean_4;
  TColStd_Array1OfBoolean_5: typeof TColStd_Array1OfBoolean_5;
  TColStd_Array1OfBoolean_6: typeof TColStd_Array1OfBoolean_6;
  TColgp_Array1OfDir: typeof TColgp_Array1OfDir;
  TColgp_Array1OfDir_1: typeof TColgp_Array1OfDir_1;
  TColgp_Array1OfDir_2: typeof TColgp_Array1OfDir_2;
  TColgp_Array1OfDir_4: typeof TColgp_Array1OfDir_4;
  TColgp_Array1OfDir_5: typeof TColgp_Array1OfDir_5;
  TColgp_Array1OfDir_6: typeof TColgp_Array1OfDir_6;
  TColgp_Array1OfPnt: typeof TColgp_Array1OfPnt;
  TColgp_Array1OfPnt_1: typeof TColgp_Array1OfPnt_1;
  TColgp_Array1OfPnt_2: typeof TColgp_Array1OfPnt_2;
  TColgp_Array1OfPnt_4: typeof TColgp_Array1OfPnt_4;
  TColgp_Array1OfPnt_5: typeof TColgp_Array1OfPnt_5;
  TColgp_Array1OfPnt_6: typeof TColgp_Array1OfPnt_6;
  TopTools_ListOfShape: typeof TopTools_ListOfShape;
  TopTools_ListOfShape_1: typeof TopTools_ListOfShape_1;
  TopTools_ListOfShape_2: typeof TopTools_ListOfShape_2;
  TopTools_ListOfShape_3: typeof TopTools_ListOfShape_3;
  TopTools_ListOfShape_4: typeof TopTools_ListOfShape_4;
  TopTools_ListOfShape_5: typeof TopTools_ListOfShape_5;
  TColgp_Array1OfVec: typeof TColgp_Array1OfVec;
  TColgp_Array1OfVec_1: typeof TColgp_Array1OfVec_1;
  TColgp_Array1OfVec_2: typeof TColgp_Array1OfVec_2;
  TColgp_Array1OfVec_4: typeof TColgp_Array1OfVec_4;
  TColgp_Array1OfVec_5: typeof TColgp_Array1OfVec_5;
  TColgp_Array1OfVec_6: typeof TColgp_Array1OfVec_6;
  TColStd_Array1OfReal: typeof TColStd_Array1OfReal;
  TColStd_Array1OfReal_1: typeof TColStd_Array1OfReal_1;
  TColStd_Array1OfReal_2: typeof TColStd_Array1OfReal_2;
  TColStd_Array1OfReal_4: typeof TColStd_Array1OfReal_4;
  TColStd_Array1OfReal_5: typeof TColStd_Array1OfReal_5;
  TColStd_Array1OfReal_6: typeof TColStd_Array1OfReal_6;
};

declare function init(): Promise<OpenCascadeInstance>;

export default init;
