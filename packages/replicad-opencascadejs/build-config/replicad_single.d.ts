export declare class Message_ProgressRange {
  UserBreak(): boolean;
  More(): boolean;
  IsActive(): boolean;
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
  SetValues_2(theC1: number, theC2: number, theC3: number, theType: Quantity_TypeOfColor): void;
  Red(): number;
  Green(): number;
  Blue(): number;
  Hue(): number;
  Light(): number;
  ChangeIntensity(theDelta: number): void;
  Saturation(): number;
  ChangeContrast(theDelta: number): void;
  IsDifferent(theOther: Quantity_Color): boolean;
  IsEqual(theOther: Quantity_Color): boolean;
  Distance(theColor: Quantity_Color): number;
  SquareDistance(theColor: Quantity_Color): number;
  Delta(theColor: Quantity_Color, DC: number, DI: number): void;
  DeltaE2000(theOther: Quantity_Color): number;
  static Name_2(theR: number, theG: number, theB: number): Quantity_NameOfColor;
  static StringName(theColor: Quantity_NameOfColor): string;
  static ColorFromHex(theHexColorString: string, theColor: Quantity_Color): boolean;
  static ColorToHex(theColor: Quantity_Color, theToPrefixHash: boolean): XCAFDoc_PartId;
  static Convert_sRGB_To_HLS(theRgb: any): any;
  static Convert_HLS_To_sRGB(theHls: any): any;
  static Convert_LinearRGB_To_HLS(theRgb: any): any;
  static Convert_HLS_To_LinearRGB(theHls: any): any;
  static Convert_LinearRGB_To_Lab(theRgb: any): any;
  static Convert_Lab_To_Lch(theLab: any): any;
  static Convert_Lab_To_LinearRGB(theLab: any): any;
  static Convert_Lch_To_Lab(theLch: any): any;
  static Color2argb(theColor: Quantity_Color, theARGB: number): void;
  static Argb2color(theARGB: number, theColor: Quantity_Color): void;
  static Convert_LinearRGB_To_sRGB_1(theLinearValue: number): number;
  static Convert_LinearRGB_To_sRGB_2(theLinearValue: number): number;
  static Convert_sRGB_To_LinearRGB_1(thesRGBValue: number): number;
  static Convert_sRGB_To_LinearRGB_2(thesRGBValue: number): number;
  static Convert_LinearRGB_To_sRGB_approx22_1(theLinearValue: number): number;
  static Convert_sRGB_To_LinearRGB_approx22_1(thesRGBValue: number): number;
  static Convert_LinearRGB_To_sRGB_approx22_2(theRGB: any): any;
  static Convert_sRGB_To_LinearRGB_approx22_2(theRGB: any): any;
  static HlsRgb(theH: number, theL: number, theS: number, theR: number, theG: number, theB: number): void;
  static RgbHls(theR: number, theG: number, theB: number, theH: number, theL: number, theS: number): void;
  static Epsilon(): number;
  static SetEpsilon(theEpsilon: number): void;
  InitFromJson(theSStream: any, theStreamPos: number): boolean;
  delete(): void;
}

  export declare class Quantity_Color_1 extends Quantity_Color {
    constructor();
  }

  export declare class Quantity_Color_2 extends Quantity_Color {
    constructor(theName: Quantity_NameOfColor);
  }

  export declare class Quantity_Color_3 extends Quantity_Color {
    constructor(theC1: number, theC2: number, theC3: number, theType: Quantity_TypeOfColor);
  }

  export declare class Quantity_Color_4 extends Quantity_Color {
    constructor(theRgb: any);
  }

export declare class Quantity_ColorRGBA {
  SetValues(theRed: number, theGreen: number, theBlue: number, theAlpha: number): void;
  GetRGB(): Quantity_Color;
  ChangeRGB(): Quantity_Color;
  SetRGB(theRgb: Quantity_Color): void;
  Alpha(): number;
  SetAlpha(theAlpha: number): void;
  IsDifferent(theOther: Quantity_ColorRGBA): boolean;
  IsEqual(theOther: Quantity_ColorRGBA): boolean;
  static ColorFromName(theColorNameString: string, theColor: Quantity_ColorRGBA): boolean;
  static ColorFromHex(theHexColorString: string, theColor: Quantity_ColorRGBA, theAlphaComponentIsOff: boolean): boolean;
  static ColorToHex(theColor: Quantity_ColorRGBA, theToPrefixHash: boolean): XCAFDoc_PartId;
  static Convert_LinearRGB_To_sRGB(theRGB: any): any;
  static Convert_sRGB_To_LinearRGB(theRGB: any): any;
  InitFromJson(theSStream: any, theStreamPos: number): boolean;
  delete(): void;
}

  export declare class Quantity_ColorRGBA_1 extends Quantity_ColorRGBA {
    constructor();
  }

  export declare class Quantity_ColorRGBA_2 extends Quantity_ColorRGBA {
    constructor(theRgb: Quantity_Color);
  }

  export declare class Quantity_ColorRGBA_3 extends Quantity_ColorRGBA {
    constructor(theRgb: Quantity_Color, theAlpha: number);
  }

  export declare class Quantity_ColorRGBA_4 extends Quantity_ColorRGBA {
    constructor(theRgba: any);
  }

  export declare class Quantity_ColorRGBA_5 extends Quantity_ColorRGBA {
    constructor(theRed: number, theGreen: number, theBlue: number, theAlpha: number);
  }

export declare class NCollection_BaseList {
  Extent(): number;
  IsEmpty(): boolean;
  Allocator(): NCollection_BaseAllocator;
  delete(): void;
}

export declare class Standard_Transient {
  static get_type_name(): string;
  static get_type_descriptor(): Standard_Type;
  DynamicType(): Standard_Type;
  IsInstance_1(theType: Standard_Type): boolean;
  IsInstance_2(theTypeName: string): boolean;
  IsKind_1(theType: Standard_Type): boolean;
  IsKind_2(theTypeName: string): boolean;
  This(): Standard_Transient;
  GetRefCount(): number;
  IncrementRefCounter(): void;
  DecrementRefCounter(): number;
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
  static Angular(): number;
  static Confusion(): number;
  static SquareConfusion(): number;
  static Computational(): number;
  static SquareComputational(): number;
  static Intersection(): number;
  static Approximation(): number;
  static Parametric_1(P: number, T: number): number;
  static PConfusion_1(T: number): number;
  static SquarePConfusion(): number;
  static PIntersection_1(T: number): number;
  static PApproximation_1(T: number): number;
  static Parametric_2(P: number): number;
  static PConfusion_2(): number;
  static PIntersection_2(): number;
  static PApproximation_2(): number;
  static IsInfinite(R: number): boolean;
  static IsPositiveInfinite(R: number): boolean;
  static IsNegativeInfinite(R: number): boolean;
  static Infinite(): number;
  delete(): void;
}

export declare class TCollection_ExtendedString {
  AssignCat_1(theOther: TCollection_ExtendedString): void;
  AssignCat_2(theChar: string): void;
  AssignCat_3(theString: string, theLength: number): void;
  AssignCat_4(theString: string): void;
  AssignCat_6(theStringView: any): void;
  Cat_1(theOther: string, theLength: number): TCollection_ExtendedString;
  Cat_2(theOther: string): TCollection_ExtendedString;
  Cat_3(theOther: TCollection_ExtendedString): TCollection_ExtendedString;
  ChangeAll(theChar: string, theNewChar: string): void;
  Clear(): void;
  Copy_1(theString: string, theLength: number): void;
  Copy_2(theString: string): void;
  Copy_3(theFromWhere: TCollection_ExtendedString): void;
  Move(theOther: TCollection_ExtendedString): void;
  Swap(theOther: TCollection_ExtendedString): void;
  Insert_1(theWhere: number, theWhat: string): void;
  Insert_2(theWhere: number, theWhat: string, theLength: number): void;
  Insert_3(theWhere: number, theWhat: string): void;
  Insert_4(theWhere: number, theWhat: TCollection_ExtendedString): void;
  IsEmpty(): boolean;
  IsEqual_1(theOther: string, theLength: number): boolean;
  IsEqual_2(theOther: string): boolean;
  IsEqual_3(theOther: TCollection_ExtendedString): boolean;
  IsDifferent_1(theOther: string, theLength: number): boolean;
  IsDifferent_2(theOther: string): boolean;
  IsDifferent_3(theOther: TCollection_ExtendedString): boolean;
  IsLess_1(theOther: string, theLength: number): boolean;
  IsLess_2(theOther: string): boolean;
  IsLess_3(theOther: TCollection_ExtendedString): boolean;
  IsGreater_1(theOther: string, theLength: number): boolean;
  IsGreater_2(theOther: string): boolean;
  IsGreater_3(theOther: TCollection_ExtendedString): boolean;
  StartsWith_1(theStartString: string, theLength: number): boolean;
  StartsWith_2(theStartString: string): boolean;
  StartsWith_3(theStartString: TCollection_ExtendedString): boolean;
  EndsWith_1(theEndString: string, theLength: number): boolean;
  EndsWith_2(theEndString: string): boolean;
  EndsWith_3(theEndString: TCollection_ExtendedString): boolean;
  IsAscii(): boolean;
  Length(): number;
  RemoveAll(theWhat: string): void;
  Remove(theWhere: number, theHowMany: number): void;
  Search_1(theWhat: string, theLength: number): number;
  Search_2(theWhat: string): number;
  Search_3(theWhat: TCollection_ExtendedString): number;
  SearchFromEnd_1(theWhat: string, theLength: number): number;
  SearchFromEnd_2(theWhat: string): number;
  SearchFromEnd_3(theWhat: TCollection_ExtendedString): number;
  SetValue_1(theWhere: number, theWhat: string): void;
  SetValue_2(theWhere: number, theWhat: string, theLength: number): void;
  SetValue_3(theWhere: number, theWhat: string): void;
  SetValue_4(theWhere: number, theWhat: TCollection_ExtendedString): void;
  SubString(theFromIndex: number, theToIndex: number): TCollection_ExtendedString;
  Split(theWhere: number): TCollection_ExtendedString;
  Token(theSeparators: string, theWhichOne: number): TCollection_ExtendedString;
  ToExtString(): string;
  Trunc(theHowMany: number): void;
  Value(theWhere: number): string;
  HashCode(): number;
  static EmptyString(): TCollection_ExtendedString;
  static IsEqual_4(theString1: TCollection_ExtendedString, theString2: TCollection_ExtendedString): boolean;
  LengthOfCString(): number;
  LeftAdjust(): void;
  RightAdjust(): void;
  LeftJustify(theWidth: number, theFiller: string): void;
  RightJustify(theWidth: number, theFiller: string): void;
  Center(theWidth: number, theFiller: string): void;
  Capitalize(): void;
  Prepend_1(theOther: string, theLength: number): void;
  Prepend_2(theOther: string): void;
  Prepend_3(theOther: TCollection_ExtendedString): void;
  FirstLocationInSet(theSet: TCollection_ExtendedString, theFromIndex: number, theToIndex: number): number;
  FirstLocationNotInSet(theSet: TCollection_ExtendedString, theFromIndex: number, theToIndex: number): number;
  IntegerValue(): number;
  IsIntegerValue(): boolean;
  RealValue(): number;
  IsRealValue(theToCheckFull: boolean): boolean;
  IsSameString(theOther: TCollection_ExtendedString, theIsCaseSensitive: boolean): boolean;
  delete(): void;
}

  export declare class TCollection_ExtendedString_1 extends TCollection_ExtendedString {
    constructor();
  }

  export declare class TCollection_ExtendedString_2 extends TCollection_ExtendedString {
    constructor(theString: string, theIsMultiByte: boolean);
  }

  export declare class TCollection_ExtendedString_3 extends TCollection_ExtendedString {
    constructor(theString: string);
  }

  export declare class TCollection_ExtendedString_4 extends TCollection_ExtendedString {
    constructor(theStringUtf: string);
  }

  export declare class TCollection_ExtendedString_5 extends TCollection_ExtendedString {
    constructor(theChar: string);
  }

  export declare class TCollection_ExtendedString_6 extends TCollection_ExtendedString {
    constructor(theChar: string);
  }

  export declare class TCollection_ExtendedString_7 extends TCollection_ExtendedString {
    constructor(theLength: number, theFiller: string);
  }

  export declare class TCollection_ExtendedString_8 extends TCollection_ExtendedString {
    constructor(theValue: number);
  }

  export declare class TCollection_ExtendedString_9 extends TCollection_ExtendedString {
    constructor(theValue: number);
  }

  export declare class TCollection_ExtendedString_10 extends TCollection_ExtendedString {
    constructor(theString: TCollection_ExtendedString);
  }

  export declare class TCollection_ExtendedString_11 extends TCollection_ExtendedString {
    constructor(theOther: TCollection_ExtendedString);
  }

  export declare class TCollection_ExtendedString_12 extends TCollection_ExtendedString {
    constructor(theString: XCAFDoc_PartId, theIsMultiByte: boolean);
  }

  export declare class TCollection_ExtendedString_13 extends TCollection_ExtendedString {
    constructor(theString: string, theLength: number);
  }

  export declare class TCollection_ExtendedString_15 extends TCollection_ExtendedString {
    constructor(theStringView: any);
  }

export declare class TopLoc_Location {
  IsIdentity(): boolean;
  Identity(): void;
  FirstDatum(): TopLoc_Datum3D;
  FirstPower(): number;
  NextLocation(): TopLoc_Location;
  Transformation(): gp_Trsf;
  Inverted(): TopLoc_Location;
  Multiplied(Other: TopLoc_Location): TopLoc_Location;
  Divided(Other: TopLoc_Location): TopLoc_Location;
  Predivided(Other: TopLoc_Location): TopLoc_Location;
  Powered(pwr: number): TopLoc_Location;
  HashCode(): number;
  IsEqual(theOther: TopLoc_Location): boolean;
  IsDifferent(theOther: TopLoc_Location): boolean;
  Clear(): void;
  static ScalePrec(): number;
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
    constructor(D: TopLoc_Datum3D);
  }

export declare class gp_Circ2d {
  SetLocation(theP: gp_Pnt2d): void;
  SetXAxis(theA: gp_Ax2d): void;
  SetAxis(theA: gp_Ax22d): void;
  SetYAxis(theA: gp_Ax2d): void;
  SetRadius(theRadius: number): void;
  Area(): number;
  Coefficients(theA: number, theB: number, theC: number, theD: number, theE: number, theF: number): void;
  Contains(theP: gp_Pnt2d, theLinearTolerance: number): boolean;
  Distance(theP: gp_Pnt2d): number;
  SquareDistance(theP: gp_Pnt2d): number;
  Length(): number;
  Location(): gp_Pnt2d;
  Radius(): number;
  Axis(): gp_Ax22d;
  Position(): gp_Ax22d;
  XAxis(): gp_Ax2d;
  YAxis(): gp_Ax2d;
  Reverse(): void;
  Reversed(): gp_Circ2d;
  IsDirect(): boolean;
  Mirror_1(theP: gp_Pnt2d): void;
  Mirrored_1(theP: gp_Pnt2d): gp_Circ2d;
  Mirror_2(theA: gp_Ax2d): void;
  Mirrored_2(theA: gp_Ax2d): gp_Circ2d;
  Rotate(theP: gp_Pnt2d, theAng: number): void;
  Rotated(theP: gp_Pnt2d, theAng: number): gp_Circ2d;
  Scale(theP: gp_Pnt2d, theS: number): void;
  Scaled(theP: gp_Pnt2d, theS: number): gp_Circ2d;
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
    constructor(theXAxis: gp_Ax2d, theRadius: number, theIsSense: boolean);
  }

  export declare class gp_Circ2d_3 extends gp_Circ2d {
    constructor(theAxis: gp_Ax22d, theRadius: number);
  }

export declare class gp_Vec {
  SetCoord_1(theIndex: number, theXi: number): void;
  SetCoord_2(theXv: number, theYv: number, theZv: number): void;
  SetX(theX: number): void;
  SetY(theY: number): void;
  SetZ(theZ: number): void;
  SetXYZ(theCoord: gp_XYZ): void;
  Coord_1(theIndex: number): number;
  Coord_2(theXv: number, theYv: number, theZv: number): void;
  X(): number;
  Y(): number;
  Z(): number;
  XYZ(): gp_XYZ;
  IsEqual(theOther: gp_Vec, theLinearTolerance: number, theAngularTolerance: number): boolean;
  IsNormal(theOther: gp_Vec, theAngularTolerance: number): boolean;
  IsOpposite(theOther: gp_Vec, theAngularTolerance: number): boolean;
  IsParallel(theOther: gp_Vec, theAngularTolerance: number): boolean;
  Angle(theOther: gp_Vec): number;
  AngleWithRef(theOther: gp_Vec, theVRef: gp_Vec): number;
  Magnitude(): number;
  SquareMagnitude(): number;
  Add(theOther: gp_Vec): void;
  Added(theOther: gp_Vec): gp_Vec;
  Subtract(theRight: gp_Vec): void;
  Subtracted(theRight: gp_Vec): gp_Vec;
  Multiply(theScalar: number): void;
  Multiplied(theScalar: number): gp_Vec;
  Divide(theScalar: number): void;
  Divided(theScalar: number): gp_Vec;
  Cross(theRight: gp_Vec): void;
  Crossed(theRight: gp_Vec): gp_Vec;
  CrossMagnitude(theRight: gp_Vec): number;
  CrossSquareMagnitude(theRight: gp_Vec): number;
  CrossCross(theV1: gp_Vec, theV2: gp_Vec): void;
  CrossCrossed(theV1: gp_Vec, theV2: gp_Vec): gp_Vec;
  Dot(theOther: gp_Vec): number;
  DotCross(theV1: gp_Vec, theV2: gp_Vec): number;
  Normalize(): void;
  Normalized(): gp_Vec;
  Reverse(): void;
  Reversed(): gp_Vec;
  SetLinearForm_1(theA1: number, theV1: gp_Vec, theA2: number, theV2: gp_Vec, theA3: number, theV3: gp_Vec, theV4: gp_Vec): void;
  SetLinearForm_2(theA1: number, theV1: gp_Vec, theA2: number, theV2: gp_Vec, theA3: number, theV3: gp_Vec): void;
  SetLinearForm_3(theA1: number, theV1: gp_Vec, theA2: number, theV2: gp_Vec, theV3: gp_Vec): void;
  SetLinearForm_4(theA1: number, theV1: gp_Vec, theA2: number, theV2: gp_Vec): void;
  SetLinearForm_5(theA1: number, theV1: gp_Vec, theV2: gp_Vec): void;
  SetLinearForm_6(theV1: gp_Vec, theV2: gp_Vec): void;
  Mirror_1(theV: gp_Vec): void;
  Mirrored_1(theV: gp_Vec): gp_Vec;
  Mirror_2(theA1: gp_Ax1): void;
  Mirrored_2(theA1: gp_Ax1): gp_Vec;
  Mirror_3(theA2: gp_Ax2): void;
  Mirrored_3(theA2: gp_Ax2): gp_Vec;
  Rotate(theA1: gp_Ax1, theAng: number): void;
  Rotated(theA1: gp_Ax1, theAng: number): gp_Vec;
  Scale(theS: number): void;
  Scaled(theS: number): gp_Vec;
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
    constructor(theXv: number, theYv: number, theZv: number);
  }

  export declare class gp_Vec_5 extends gp_Vec {
    constructor(theP1: gp_Pnt, theP2: gp_Pnt);
  }

export declare class gp_Elips2d {
  SetLocation(theP: gp_Pnt2d): void;
  SetMajorRadius(theMajorRadius: number): void;
  SetMinorRadius(theMinorRadius: number): void;
  SetAxis(theA: gp_Ax22d): void;
  SetXAxis(theA: gp_Ax2d): void;
  SetYAxis(theA: gp_Ax2d): void;
  Area(): number;
  Coefficients(theA: number, theB: number, theC: number, theD: number, theE: number, theF: number): void;
  Directrix1(): gp_Ax2d;
  Directrix2(): gp_Ax2d;
  Eccentricity(): number;
  Focal(): number;
  Focus1(): gp_Pnt2d;
  Focus2(): gp_Pnt2d;
  Location(): gp_Pnt2d;
  MajorRadius(): number;
  MinorRadius(): number;
  Parameter(): number;
  Axis(): gp_Ax22d;
  XAxis(): gp_Ax2d;
  YAxis(): gp_Ax2d;
  Reverse(): void;
  Reversed(): gp_Elips2d;
  IsDirect(): boolean;
  Mirror_1(theP: gp_Pnt2d): void;
  Mirrored_1(theP: gp_Pnt2d): gp_Elips2d;
  Mirror_2(theA: gp_Ax2d): void;
  Mirrored_2(theA: gp_Ax2d): gp_Elips2d;
  Rotate(theP: gp_Pnt2d, theAng: number): void;
  Rotated(theP: gp_Pnt2d, theAng: number): gp_Elips2d;
  Scale(theP: gp_Pnt2d, theS: number): void;
  Scaled(theP: gp_Pnt2d, theS: number): gp_Elips2d;
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
    constructor(theMajorAxis: gp_Ax2d, theMajorRadius: number, theMinorRadius: number, theIsSense: boolean);
  }

  export declare class gp_Elips2d_3 extends gp_Elips2d {
    constructor(theA: gp_Ax22d, theMajorRadius: number, theMinorRadius: number);
  }

export declare class gp_GTrsf2d {
  SetAffinity(theA: gp_Ax2d, theRatio: number): void;
  SetValue(theRow: number, theCol: number, theValue: number): void;
  SetTranslationPart(theCoord: gp_XY): void;
  SetTrsf2d(theT: gp_Trsf2d): void;
  SetVectorialPart(theMatrix: gp_Mat2d): void;
  IsNegative(): boolean;
  IsSingular(): boolean;
  Form(): gp_TrsfForm;
  TranslationPart(): gp_XY;
  VectorialPart(): gp_Mat2d;
  Value(theRow: number, theCol: number): number;
  Invert(): void;
  Inverted(): gp_GTrsf2d;
  Multiplied(theT: gp_GTrsf2d): gp_GTrsf2d;
  Multiply(theT: gp_GTrsf2d): void;
  PreMultiply(theT: gp_GTrsf2d): void;
  Power(theN: number): void;
  Powered(theN: number): gp_GTrsf2d;
  Transforms_1(theCoord: gp_XY): void;
  Transformed(theCoord: gp_XY): gp_XY;
  Transforms_2(theX: number, theY: number): void;
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
  IsCoaxial(Other: gp_Ax1, AngularTolerance: number, LinearTolerance: number): boolean;
  IsNormal(theOther: gp_Ax1, theAngularTolerance: number): boolean;
  IsOpposite(theOther: gp_Ax1, theAngularTolerance: number): boolean;
  IsParallel(theOther: gp_Ax1, theAngularTolerance: number): boolean;
  Angle(theOther: gp_Ax1): number;
  Reverse(): void;
  Reversed(): gp_Ax1;
  Mirror_1(P: gp_Pnt): void;
  Mirrored_1(P: gp_Pnt): gp_Ax1;
  Mirror_2(A1: gp_Ax1): void;
  Mirrored_2(A1: gp_Ax1): gp_Ax1;
  Mirror_3(A2: gp_Ax2): void;
  Mirrored_3(A2: gp_Ax2): gp_Ax1;
  Rotate(theA1: gp_Ax1, theAngRad: number): void;
  Rotated(theA1: gp_Ax1, theAngRad: number): gp_Ax1;
  Scale(theP: gp_Pnt, theS: number): void;
  Scaled(theP: gp_Pnt, theS: number): gp_Ax1;
  Transform(theT: gp_Trsf): void;
  Transformed(theT: gp_Trsf): gp_Ax1;
  Translate_1(theV: gp_Vec): void;
  Translated_1(theV: gp_Vec): gp_Ax1;
  Translate_2(theP1: gp_Pnt, theP2: gp_Pnt): void;
  Translated_2(theP1: gp_Pnt, theP2: gp_Pnt): gp_Ax1;
  InitFromJson(theSStream: any, theStreamPos: number): boolean;
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
  SetRotation_1(theA1: gp_Ax1, theAng: number): void;
  SetRotation_2(theR: gp_Quaternion): void;
  SetRotationPart(theR: gp_Quaternion): void;
  SetScale(theP: gp_Pnt, theS: number): void;
  SetDisplacement(theFromSystem1: gp_Ax3, theToSystem2: gp_Ax3): void;
  SetTransformation_1(theFromSystem1: gp_Ax3, theToSystem2: gp_Ax3): void;
  SetTransformation_2(theToSystem: gp_Ax3): void;
  SetTransformation_3(R: gp_Quaternion, theT: gp_Vec): void;
  SetTranslation_1(theV: gp_Vec): void;
  SetTranslation_2(theP1: gp_Pnt, theP2: gp_Pnt): void;
  SetTranslationPart(theV: gp_Vec): void;
  SetScaleFactor(theS: number): void;
  SetForm(theP: gp_TrsfForm): void;
  SetValues(a11: number, a12: number, a13: number, a14: number, a21: number, a22: number, a23: number, a24: number, a31: number, a32: number, a33: number, a34: number): void;
  IsNegative(): boolean;
  Form(): gp_TrsfForm;
  ScaleFactor(): number;
  TranslationPart(): gp_XYZ;
  GetRotation_1(theAxis: gp_XYZ, theAngle: number): boolean;
  GetRotation_2(): gp_Quaternion;
  VectorialPart(): gp_Mat;
  HVectorialPart(): gp_Mat;
  Value(theRow: number, theCol: number): number;
  Invert(): void;
  Inverted(): gp_Trsf;
  Multiplied(theT: gp_Trsf): gp_Trsf;
  Multiply(theT: gp_Trsf): void;
  PreMultiply(theT: gp_Trsf): void;
  Power(theN: number): void;
  Powered(theN: number): gp_Trsf;
  Transforms_1(theX: number, theY: number, theZ: number): void;
  Transforms_2(theCoord: gp_XYZ): void;
  InitFromJson(theSStream: any, theStreamPos: number): boolean;
  delete(): void;
}

  export declare class gp_Trsf_1 extends gp_Trsf {
    constructor();
  }

  export declare class gp_Trsf_2 extends gp_Trsf {
    constructor(theT: gp_Trsf2d);
  }

export declare class gp_Pnt {
  SetCoord_1(theIndex: number, theXi: number): void;
  SetCoord_2(theXp: number, theYp: number, theZp: number): void;
  SetX(theX: number): void;
  SetY(theY: number): void;
  SetZ(theZ: number): void;
  SetXYZ(theCoord: gp_XYZ): void;
  Coord_1(theIndex: number): number;
  Coord_2(theXp: number, theYp: number, theZp: number): void;
  X(): number;
  Y(): number;
  Z(): number;
  XYZ(): gp_XYZ;
  Coord_3(): gp_XYZ;
  ChangeCoord(): gp_XYZ;
  BaryCenter(theAlpha: number, theP: gp_Pnt, theBeta: number): void;
  IsEqual(theOther: gp_Pnt, theLinearTolerance: number): boolean;
  Distance(theOther: gp_Pnt): number;
  SquareDistance(theOther: gp_Pnt): number;
  Mirror_1(theP: gp_Pnt): void;
  Mirrored_1(theP: gp_Pnt): gp_Pnt;
  Mirror_2(theA1: gp_Ax1): void;
  Mirrored_2(theA1: gp_Ax1): gp_Pnt;
  Mirror_3(theA2: gp_Ax2): void;
  Mirrored_3(theA2: gp_Ax2): gp_Pnt;
  Rotate(theA1: gp_Ax1, theAng: number): void;
  Rotated(theA1: gp_Ax1, theAng: number): gp_Pnt;
  Scale(theP: gp_Pnt, theS: number): void;
  Scaled(theP: gp_Pnt, theS: number): gp_Pnt;
  Transform(theT: gp_Trsf): void;
  Transformed(theT: gp_Trsf): gp_Pnt;
  Translate_1(theV: gp_Vec): void;
  Translated_1(theV: gp_Vec): gp_Pnt;
  Translate_2(theP1: gp_Pnt, theP2: gp_Pnt): void;
  Translated_2(theP1: gp_Pnt, theP2: gp_Pnt): gp_Pnt;
  InitFromJson(theSStream: any, theStreamPos: number): boolean;
  delete(): void;
}

  export declare class gp_Pnt_1 extends gp_Pnt {
    constructor();
  }

  export declare class gp_Pnt_2 extends gp_Pnt {
    constructor(theCoord: gp_XYZ);
  }

  export declare class gp_Pnt_3 extends gp_Pnt {
    constructor(theXp: number, theYp: number, theZp: number);
  }

export declare class gp_Elips {
  SetAxis(theA1: gp_Ax1): void;
  SetLocation(theP: gp_Pnt): void;
  SetMajorRadius(theMajorRadius: number): void;
  SetMinorRadius(theMinorRadius: number): void;
  SetPosition(theA2: gp_Ax2): void;
  Area(): number;
  Axis(): gp_Ax1;
  Directrix1(): gp_Ax1;
  Directrix2(): gp_Ax1;
  Eccentricity(): number;
  Focal(): number;
  Focus1(): gp_Pnt;
  Focus2(): gp_Pnt;
  Location(): gp_Pnt;
  MajorRadius(): number;
  MinorRadius(): number;
  Parameter(): number;
  Position(): gp_Ax2;
  XAxis(): gp_Ax1;
  YAxis(): gp_Ax1;
  Mirror_1(theP: gp_Pnt): void;
  Mirrored_1(theP: gp_Pnt): gp_Elips;
  Mirror_2(theA1: gp_Ax1): void;
  Mirrored_2(theA1: gp_Ax1): gp_Elips;
  Mirror_3(theA2: gp_Ax2): void;
  Mirrored_3(theA2: gp_Ax2): gp_Elips;
  Rotate(theA1: gp_Ax1, theAng: number): void;
  Rotated(theA1: gp_Ax1, theAng: number): gp_Elips;
  Scale(theP: gp_Pnt, theS: number): void;
  Scaled(theP: gp_Pnt, theS: number): gp_Elips;
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
    constructor(theA2: gp_Ax2, theMajorRadius: number, theMinorRadius: number);
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
  Angle(theOther: gp_Ax3): number;
  Axis(): gp_Ax1;
  Ax2(): gp_Ax2;
  Direction(): gp_Dir;
  Location(): gp_Pnt;
  XDirection(): gp_Dir;
  YDirection(): gp_Dir;
  Direct(): boolean;
  IsCoplanar_1(theOther: gp_Ax3, theLinearTolerance: number, theAngularTolerance: number): boolean;
  IsCoplanar_2(theA1: gp_Ax1, theLinearTolerance: number, theAngularTolerance: number): boolean;
  Mirror_1(theP: gp_Pnt): void;
  Mirrored_1(theP: gp_Pnt): gp_Ax3;
  Mirror_2(theA1: gp_Ax1): void;
  Mirrored_2(theA1: gp_Ax1): gp_Ax3;
  Mirror_3(theA2: gp_Ax2): void;
  Mirrored_3(theA2: gp_Ax2): gp_Ax3;
  Rotate(theA1: gp_Ax1, theAng: number): void;
  Rotated(theA1: gp_Ax1, theAng: number): gp_Ax3;
  Scale(theP: gp_Pnt, theS: number): void;
  Scaled(theP: gp_Pnt, theS: number): gp_Ax3;
  Transform(theT: gp_Trsf): void;
  Transformed(theT: gp_Trsf): gp_Ax3;
  Translate_1(theV: gp_Vec): void;
  Translated_1(theV: gp_Vec): gp_Ax3;
  Translate_2(theP1: gp_Pnt, theP2: gp_Pnt): void;
  Translated_2(theP1: gp_Pnt, theP2: gp_Pnt): gp_Ax3;
  InitFromJson(theSStream: any, theStreamPos: number): boolean;
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
  Angle(theOther: gp_Ax2): number;
  Axis(): gp_Ax1;
  Direction(): gp_Dir;
  Location(): gp_Pnt;
  XDirection(): gp_Dir;
  YDirection(): gp_Dir;
  IsCoplanar_1(Other: gp_Ax2, LinearTolerance: number, AngularTolerance: number): boolean;
  IsCoplanar_2(A1: gp_Ax1, LinearTolerance: number, AngularTolerance: number): boolean;
  Mirror_1(P: gp_Pnt): void;
  Mirrored_1(P: gp_Pnt): gp_Ax2;
  Mirror_2(A1: gp_Ax1): void;
  Mirrored_2(A1: gp_Ax1): gp_Ax2;
  Mirror_3(A2: gp_Ax2): void;
  Mirrored_3(A2: gp_Ax2): gp_Ax2;
  Rotate(theA1: gp_Ax1, theAng: number): void;
  Rotated(theA1: gp_Ax1, theAng: number): gp_Ax2;
  Scale(theP: gp_Pnt, theS: number): void;
  Scaled(theP: gp_Pnt, theS: number): gp_Ax2;
  Transform(theT: gp_Trsf): void;
  Transformed(theT: gp_Trsf): gp_Ax2;
  Translate_1(theV: gp_Vec): void;
  Translated_1(theV: gp_Vec): gp_Ax2;
  Translate_2(theP1: gp_Pnt, theP2: gp_Pnt): void;
  Translated_2(theP1: gp_Pnt, theP2: gp_Pnt): gp_Ax2;
  InitFromJson(theSStream: any, theStreamPos: number): boolean;
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
  SetCoord_1(theIndex: number, theXi: number): void;
  SetCoord_2(theXp: number, theYp: number): void;
  SetX(theX: number): void;
  SetY(theY: number): void;
  SetXY(theCoord: gp_XY): void;
  Coord_1(theIndex: number): number;
  Coord_2(theXp: number, theYp: number): void;
  X(): number;
  Y(): number;
  XY(): gp_XY;
  Coord_3(): gp_XY;
  ChangeCoord(): gp_XY;
  IsEqual(theOther: gp_Pnt2d, theLinearTolerance: number): boolean;
  Distance(theOther: gp_Pnt2d): number;
  SquareDistance(theOther: gp_Pnt2d): number;
  Mirror_1(theP: gp_Pnt2d): void;
  Mirrored_1(theP: gp_Pnt2d): gp_Pnt2d;
  Mirror_2(theA: gp_Ax2d): void;
  Mirrored_2(theA: gp_Ax2d): gp_Pnt2d;
  Rotate(theP: gp_Pnt2d, theAng: number): void;
  Rotated(theP: gp_Pnt2d, theAng: number): gp_Pnt2d;
  Scale(theP: gp_Pnt2d, theS: number): void;
  Scaled(theP: gp_Pnt2d, theS: number): gp_Pnt2d;
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
    constructor(theXp: number, theYp: number);
  }

export declare class gp_XY {
  SetCoord_1(theIndex: number, theXi: number): void;
  SetCoord_2(theX: number, theY: number): void;
  SetX(theX: number): void;
  SetY(theY: number): void;
  Coord_1(theIndex: number): number;
  ChangeCoord(theIndex: number): number;
  Coord_2(theX: number, theY: number): void;
  X(): number;
  Y(): number;
  Modulus(): number;
  SquareModulus(): number;
  IsEqual(theOther: gp_XY, theTolerance: number): boolean;
  Add(theOther: gp_XY): void;
  Added(theOther: gp_XY): gp_XY;
  Crossed(theOther: gp_XY): number;
  CrossMagnitude(theRight: gp_XY): number;
  CrossSquareMagnitude(theRight: gp_XY): number;
  Divide(theScalar: number): void;
  Divided(theScalar: number): gp_XY;
  Dot(theOther: gp_XY): number;
  Multiply_1(theScalar: number): void;
  Multiply_2(theOther: gp_XY): void;
  Multiply_3(theMatrix: gp_Mat2d): void;
  Multiplied_1(theScalar: number): gp_XY;
  Multiplied_2(theOther: gp_XY): gp_XY;
  Multiplied_3(theMatrix: gp_Mat2d): gp_XY;
  Normalize(): void;
  Normalized(): gp_XY;
  Reverse(): void;
  Reversed(): gp_XY;
  SetLinearForm_1(theA1: number, theXY1: gp_XY, theA2: number, theXY2: gp_XY): void;
  SetLinearForm_2(theA1: number, theXY1: gp_XY, theA2: number, theXY2: gp_XY, theXY3: gp_XY): void;
  SetLinearForm_3(theA1: number, theXY1: gp_XY, theXY2: gp_XY): void;
  SetLinearForm_4(theXY1: gp_XY, theXY2: gp_XY): void;
  Subtract(theOther: gp_XY): void;
  Subtracted(theOther: gp_XY): gp_XY;
  delete(): void;
}

  export declare class gp_XY_1 extends gp_XY {
    constructor();
  }

  export declare class gp_XY_2 extends gp_XY {
    constructor(theX: number, theY: number);
  }

export declare class gp_Dir {
  SetCoord_1(theIndex: number, theXi: number): void;
  SetCoord_2(theXv: number, theYv: number, theZv: number): void;
  SetX(theX: number): void;
  SetY(theY: number): void;
  SetZ(theZ: number): void;
  SetXYZ(theCoord: gp_XYZ): void;
  Coord_1(theIndex: number): number;
  Coord_2(theXv: number, theYv: number, theZv: number): void;
  X(): number;
  Y(): number;
  Z(): number;
  XYZ(): gp_XYZ;
  IsEqual(theOther: gp_Dir, theAngularTolerance: number): boolean;
  IsNormal(theOther: gp_Dir, theAngularTolerance: number): boolean;
  IsOpposite(theOther: gp_Dir, theAngularTolerance: number): boolean;
  IsParallel(theOther: gp_Dir, theAngularTolerance: number): boolean;
  Angle(theOther: gp_Dir): number;
  AngleWithRef(theOther: gp_Dir, theVRef: gp_Dir): number;
  Cross(theRight: gp_Dir): void;
  Crossed(theRight: gp_Dir): gp_Dir;
  CrossCross(theV1: gp_Dir, theV2: gp_Dir): void;
  CrossCrossed(theV1: gp_Dir, theV2: gp_Dir): gp_Dir;
  Dot(theOther: gp_Dir): number;
  DotCross(theV1: gp_Dir, theV2: gp_Dir): number;
  Reverse(): void;
  Reversed(): gp_Dir;
  Mirror_1(theV: gp_Dir): void;
  Mirrored_1(theV: gp_Dir): gp_Dir;
  Mirror_2(theA1: gp_Ax1): void;
  Mirrored_2(theA1: gp_Ax1): gp_Dir;
  Mirror_3(theA2: gp_Ax2): void;
  Mirrored_3(theA2: gp_Ax2): gp_Dir;
  Rotate(theA1: gp_Ax1, theAng: number): void;
  Rotated(theA1: gp_Ax1, theAng: number): gp_Dir;
  Transform(theT: gp_Trsf): void;
  Transformed(theT: gp_Trsf): gp_Dir;
  InitFromJson(theSStream: any, theStreamPos: number): boolean;
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
    constructor(theXv: number, theYv: number, theZv: number);
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
  Rotate(theP: gp_Pnt2d, theAng: number): void;
  Rotated(theP: gp_Pnt2d, theAng: number): gp_Ax22d;
  Scale(theP: gp_Pnt2d, theS: number): void;
  Scaled(theP: gp_Pnt2d, theS: number): gp_Ax22d;
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
    constructor(theP: gp_Pnt2d, theV: gp_Dir2d, theIsSense: boolean);
  }

  export declare class gp_Ax22d_4 extends gp_Ax22d {
    constructor(theA: gp_Ax2d, theIsSense: boolean);
  }

export declare class gp_XYZ {
  SetCoord_1(theX: number, theY: number, theZ: number): void;
  SetCoord_2(theIndex: number, theXi: number): void;
  SetX(theX: number): void;
  SetY(theY: number): void;
  SetZ(theZ: number): void;
  Coord_1(theIndex: number): number;
  ChangeCoord(theIndex: number): number;
  Coord_2(theX: number, theY: number, theZ: number): void;
  GetData(): number;
  ChangeData(): number;
  X(): number;
  Y(): number;
  Z(): number;
  Modulus(): number;
  SquareModulus(): number;
  IsEqual(theOther: gp_XYZ, theTolerance: number): boolean;
  Add(theOther: gp_XYZ): void;
  Added(theOther: gp_XYZ): gp_XYZ;
  Cross(theOther: gp_XYZ): void;
  Crossed(theOther: gp_XYZ): gp_XYZ;
  CrossMagnitude(theRight: gp_XYZ): number;
  CrossSquareMagnitude(theRight: gp_XYZ): number;
  CrossCross(theCoord1: gp_XYZ, theCoord2: gp_XYZ): void;
  CrossCrossed(theCoord1: gp_XYZ, theCoord2: gp_XYZ): gp_XYZ;
  Divide(theScalar: number): void;
  Divided(theScalar: number): gp_XYZ;
  Dot(theOther: gp_XYZ): number;
  DotCross(theCoord1: gp_XYZ, theCoord2: gp_XYZ): number;
  Multiply_1(theScalar: number): void;
  Multiply_2(theOther: gp_XYZ): void;
  Multiply_3(theMatrix: gp_Mat): void;
  Multiplied_1(theScalar: number): gp_XYZ;
  Multiplied_2(theOther: gp_XYZ): gp_XYZ;
  Multiplied_3(theMatrix: gp_Mat): gp_XYZ;
  Normalize(): void;
  Normalized(): gp_XYZ;
  Reverse(): void;
  Reversed(): gp_XYZ;
  Subtract(theOther: gp_XYZ): void;
  Subtracted(theOther: gp_XYZ): gp_XYZ;
  SetLinearForm_1(theA1: number, theXYZ1: gp_XYZ, theA2: number, theXYZ2: gp_XYZ, theA3: number, theXYZ3: gp_XYZ, theXYZ4: gp_XYZ): void;
  SetLinearForm_2(theA1: number, theXYZ1: gp_XYZ, theA2: number, theXYZ2: gp_XYZ, theA3: number, theXYZ3: gp_XYZ): void;
  SetLinearForm_3(theA1: number, theXYZ1: gp_XYZ, theA2: number, theXYZ2: gp_XYZ, theXYZ3: gp_XYZ): void;
  SetLinearForm_4(theA1: number, theXYZ1: gp_XYZ, theA2: number, theXYZ2: gp_XYZ): void;
  SetLinearForm_5(theA1: number, theXYZ1: gp_XYZ, theXYZ2: gp_XYZ): void;
  SetLinearForm_6(theXYZ1: gp_XYZ, theXYZ2: gp_XYZ): void;
  InitFromJson(theSStream: any, theStreamPos: number): boolean;
  delete(): void;
}

  export declare class gp_XYZ_1 extends gp_XYZ {
    constructor();
  }

  export declare class gp_XYZ_2 extends gp_XYZ {
    constructor(theX: number, theY: number, theZ: number);
  }

export declare class gp_Cylinder {
  SetAxis(theA1: gp_Ax1): void;
  SetLocation(theLoc: gp_Pnt): void;
  SetPosition(theA3: gp_Ax3): void;
  SetRadius(theR: number): void;
  UReverse(): void;
  VReverse(): void;
  Direct(): boolean;
  Axis(): gp_Ax1;
  Coefficients(theA1: number, theA2: number, theA3: number, theB1: number, theB2: number, theB3: number, theC1: number, theC2: number, theC3: number, theD: number): void;
  Location(): gp_Pnt;
  Position(): gp_Ax3;
  Radius(): number;
  XAxis(): gp_Ax1;
  YAxis(): gp_Ax1;
  Mirror_1(theP: gp_Pnt): void;
  Mirrored_1(theP: gp_Pnt): gp_Cylinder;
  Mirror_2(theA1: gp_Ax1): void;
  Mirrored_2(theA1: gp_Ax1): gp_Cylinder;
  Mirror_3(theA2: gp_Ax2): void;
  Mirrored_3(theA2: gp_Ax2): gp_Cylinder;
  Rotate(theA1: gp_Ax1, theAng: number): void;
  Rotated(theA1: gp_Ax1, theAng: number): gp_Cylinder;
  Scale(theP: gp_Pnt, theS: number): void;
  Scaled(theP: gp_Pnt, theS: number): gp_Cylinder;
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
    constructor(theA3: gp_Ax3, theRadius: number);
  }

export declare class gp_Dir2d {
  SetCoord_1(theIndex: number, theXi: number): void;
  SetCoord_2(theXv: number, theYv: number): void;
  SetX(theX: number): void;
  SetY(theY: number): void;
  SetXY(theCoord: gp_XY): void;
  Coord_1(theIndex: number): number;
  Coord_2(theXv: number, theYv: number): void;
  X(): number;
  Y(): number;
  XY(): gp_XY;
  IsEqual(theOther: gp_Dir2d, theAngularTolerance: number): boolean;
  IsNormal(theOther: gp_Dir2d, theAngularTolerance: number): boolean;
  IsOpposite(theOther: gp_Dir2d, theAngularTolerance: number): boolean;
  IsParallel(theOther: gp_Dir2d, theAngularTolerance: number): boolean;
  Angle(theOther: gp_Dir2d): number;
  Crossed(theRight: gp_Dir2d): number;
  Dot(theOther: gp_Dir2d): number;
  Reverse(): void;
  Reversed(): gp_Dir2d;
  Mirror_1(theV: gp_Dir2d): void;
  Mirrored_1(theV: gp_Dir2d): gp_Dir2d;
  Mirror_2(theA: gp_Ax2d): void;
  Mirrored_2(theA: gp_Ax2d): gp_Dir2d;
  Rotate(Ang: number): void;
  Rotated(theAng: number): gp_Dir2d;
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
    constructor(theXv: number, theYv: number);
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
  SetRadius(theRadius: number): void;
  Area(): number;
  Axis(): gp_Ax1;
  Length(): number;
  Location(): gp_Pnt;
  Position(): gp_Ax2;
  Radius(): number;
  XAxis(): gp_Ax1;
  YAxis(): gp_Ax1;
  Distance(theP: gp_Pnt): number;
  SquareDistance(theP: gp_Pnt): number;
  Contains(theP: gp_Pnt, theLinearTolerance: number): boolean;
  Mirror_1(theP: gp_Pnt): void;
  Mirrored_1(theP: gp_Pnt): gp_Circ;
  Mirror_2(theA1: gp_Ax1): void;
  Mirrored_2(theA1: gp_Ax1): gp_Circ;
  Mirror_3(theA2: gp_Ax2): void;
  Mirrored_3(theA2: gp_Ax2): gp_Circ;
  Rotate(theA1: gp_Ax1, theAng: number): void;
  Rotated(theA1: gp_Ax1, theAng: number): gp_Circ;
  Scale(theP: gp_Pnt, theS: number): void;
  Scaled(theP: gp_Pnt, theS: number): gp_Circ;
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
    constructor(theA2: gp_Ax2, theRadius: number);
  }

export declare class gp_Ax2d {
  SetLocation(theP: gp_Pnt2d): void;
  SetDirection(theV: gp_Dir2d): void;
  Location(): gp_Pnt2d;
  Direction(): gp_Dir2d;
  IsCoaxial(Other: gp_Ax2d, AngularTolerance: number, LinearTolerance: number): boolean;
  IsNormal(theOther: gp_Ax2d, theAngularTolerance: number): boolean;
  IsOpposite(theOther: gp_Ax2d, theAngularTolerance: number): boolean;
  IsParallel(theOther: gp_Ax2d, theAngularTolerance: number): boolean;
  Angle(theOther: gp_Ax2d): number;
  Reverse(): void;
  Reversed(): gp_Ax2d;
  Mirror_1(P: gp_Pnt2d): void;
  Mirrored_1(P: gp_Pnt2d): gp_Ax2d;
  Mirror_2(A: gp_Ax2d): void;
  Mirrored_2(A: gp_Ax2d): gp_Ax2d;
  Rotate(theP: gp_Pnt2d, theAng: number): void;
  Rotated(theP: gp_Pnt2d, theAng: number): gp_Ax2d;
  Scale(P: gp_Pnt2d, S: number): void;
  Scaled(theP: gp_Pnt2d, theS: number): gp_Ax2d;
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
  SetRadius(theR: number): void;
  Area(): number;
  Coefficients(theA1: number, theA2: number, theA3: number, theB1: number, theB2: number, theB3: number, theC1: number, theC2: number, theC3: number, theD: number): void;
  UReverse(): void;
  VReverse(): void;
  Direct(): boolean;
  Location(): gp_Pnt;
  Position(): gp_Ax3;
  Radius(): number;
  Volume(): number;
  XAxis(): gp_Ax1;
  YAxis(): gp_Ax1;
  Mirror_1(theP: gp_Pnt): void;
  Mirrored_1(theP: gp_Pnt): gp_Sphere;
  Mirror_2(theA1: gp_Ax1): void;
  Mirrored_2(theA1: gp_Ax1): gp_Sphere;
  Mirror_3(theA2: gp_Ax2): void;
  Mirrored_3(theA2: gp_Ax2): gp_Sphere;
  Rotate(theA1: gp_Ax1, theAng: number): void;
  Rotated(theA1: gp_Ax1, theAng: number): gp_Sphere;
  Scale(theP: gp_Pnt, theS: number): void;
  Scaled(theP: gp_Pnt, theS: number): gp_Sphere;
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
    constructor(theA3: gp_Ax3, theRadius: number);
  }

export declare class gp_Vec2d {
  SetCoord_1(theIndex: number, theXi: number): void;
  SetCoord_2(theXv: number, theYv: number): void;
  SetX(theX: number): void;
  SetY(theY: number): void;
  SetXY(theCoord: gp_XY): void;
  Coord_1(theIndex: number): number;
  Coord_2(theXv: number, theYv: number): void;
  X(): number;
  Y(): number;
  XY(): gp_XY;
  IsEqual(theOther: gp_Vec2d, theLinearTolerance: number, theAngularTolerance: number): boolean;
  IsNormal(theOther: gp_Vec2d, theAngularTolerance: number): boolean;
  IsOpposite(theOther: gp_Vec2d, theAngularTolerance: number): boolean;
  IsParallel(theOther: gp_Vec2d, theAngularTolerance: number): boolean;
  Angle(theOther: gp_Vec2d): number;
  Magnitude(): number;
  SquareMagnitude(): number;
  Add(theOther: gp_Vec2d): void;
  Added(theOther: gp_Vec2d): gp_Vec2d;
  Crossed(theRight: gp_Vec2d): number;
  CrossMagnitude(theRight: gp_Vec2d): number;
  CrossSquareMagnitude(theRight: gp_Vec2d): number;
  Divide(theScalar: number): void;
  Divided(theScalar: number): gp_Vec2d;
  Dot(theOther: gp_Vec2d): number;
  GetNormal(): gp_Vec2d;
  Multiply(theScalar: number): void;
  Multiplied(theScalar: number): gp_Vec2d;
  Normalize(): void;
  Normalized(): gp_Vec2d;
  Reverse(): void;
  Reversed(): gp_Vec2d;
  Subtract(theRight: gp_Vec2d): void;
  Subtracted(theRight: gp_Vec2d): gp_Vec2d;
  SetLinearForm_1(theA1: number, theV1: gp_Vec2d, theA2: number, theV2: gp_Vec2d, theV3: gp_Vec2d): void;
  SetLinearForm_2(theA1: number, theV1: gp_Vec2d, theA2: number, theV2: gp_Vec2d): void;
  SetLinearForm_3(theA1: number, theV1: gp_Vec2d, theV2: gp_Vec2d): void;
  SetLinearForm_4(theV1: gp_Vec2d, theV2: gp_Vec2d): void;
  Mirror_1(theV: gp_Vec2d): void;
  Mirrored_1(theV: gp_Vec2d): gp_Vec2d;
  Mirror_2(theA1: gp_Ax2d): void;
  Mirrored_2(theA1: gp_Ax2d): gp_Vec2d;
  Rotate(theAng: number): void;
  Rotated(theAng: number): gp_Vec2d;
  Scale(theS: number): void;
  Scaled(theS: number): gp_Vec2d;
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
    constructor(theXv: number, theYv: number);
  }

  export declare class gp_Vec2d_5 extends gp_Vec2d {
    constructor(theP1: gp_Pnt2d, theP2: gp_Pnt2d);
  }

export declare class gp_Trsf2d {
  SetMirror_1(theP: gp_Pnt2d): void;
  SetMirror_2(theA: gp_Ax2d): void;
  SetRotation(theP: gp_Pnt2d, theAng: number): void;
  SetScale(theP: gp_Pnt2d, theS: number): void;
  SetTransformation_1(theFromSystem1: gp_Ax2d, theToSystem2: gp_Ax2d): void;
  SetTransformation_2(theToSystem: gp_Ax2d): void;
  SetTranslation_1(theV: gp_Vec2d): void;
  SetTranslation_2(theP1: gp_Pnt2d, theP2: gp_Pnt2d): void;
  SetTranslationPart(theV: gp_Vec2d): void;
  SetScaleFactor(theS: number): void;
  IsNegative(): boolean;
  Form(): gp_TrsfForm;
  ScaleFactor(): number;
  TranslationPart(): gp_XY;
  VectorialPart(): gp_Mat2d;
  HVectorialPart(): gp_Mat2d;
  RotationPart(): number;
  Value(theRow: number, theCol: number): number;
  Invert(): void;
  Inverted(): gp_Trsf2d;
  Multiplied(theT: gp_Trsf2d): gp_Trsf2d;
  Multiply(theT: gp_Trsf2d): void;
  PreMultiply(theT: gp_Trsf2d): void;
  Power(theN: number): void;
  Powered(theN: number): gp_Trsf2d;
  Transforms_1(theX: number, theY: number): void;
  Transforms_2(theCoord: gp_XY): void;
  SetValues(a11: number, a12: number, a13: number, a21: number, a22: number, a23: number): void;
  delete(): void;
}

  export declare class gp_Trsf2d_1 extends gp_Trsf2d {
    constructor();
  }

  export declare class gp_Trsf2d_2 extends gp_Trsf2d {
    constructor(theT: gp_Trsf);
  }

export declare class gp_GTrsf {
  SetAffinity_1(theA1: gp_Ax1, theRatio: number): void;
  SetAffinity_2(theA2: gp_Ax2, theRatio: number): void;
  SetValue(theRow: number, theCol: number, theValue: number): void;
  SetVectorialPart(theMatrix: gp_Mat): void;
  SetTranslationPart(theCoord: gp_XYZ): void;
  SetTrsf(theT: gp_Trsf): void;
  IsNegative(): boolean;
  IsSingular(): boolean;
  Form(): gp_TrsfForm;
  SetForm(): void;
  TranslationPart(): gp_XYZ;
  VectorialPart(): gp_Mat;
  Value(theRow: number, theCol: number): number;
  Invert(): void;
  Inverted(): gp_GTrsf;
  Multiplied(theT: gp_GTrsf): gp_GTrsf;
  Multiply(theT: gp_GTrsf): void;
  PreMultiply(theT: gp_GTrsf): void;
  Power(theN: number): void;
  Powered(theN: number): gp_GTrsf;
  Transforms_1(theCoord: gp_XYZ): void;
  Transforms_2(theX: number, theY: number, theZ: number): void;
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
  Update_1(aXmin: number, aYmin: number, aXmax: number, aYmax: number): void;
  Update_2(X: number, Y: number): void;
  SetGap(Tol: number): void;
  Enlarge(theTol: number): void;
  GetXMin(): number;
  GetXMax(): number;
  GetYMin(): number;
  GetYMax(): number;
  Center(): any;
  OpenXmin(): void;
  OpenXmax(): void;
  OpenYmin(): void;
  OpenYmax(): void;
  IsOpenXmin(): boolean;
  IsOpenXmax(): boolean;
  IsOpenYmin(): boolean;
  IsOpenYmax(): boolean;
  IsWhole(): boolean;
  IsVoid(): boolean;
  Transformed(T: gp_Trsf2d): Bnd_Box2d;
  Add_1(Other: Bnd_Box2d): void;
  Add_2(thePnt: gp_Pnt2d): void;
  Add_3(thePnt: gp_Pnt2d, theDir: gp_Dir2d): void;
  Add_4(D: gp_Dir2d): void;
  IsOut_1(P: gp_Pnt2d): boolean;
  IsOut_2(theL: gp_Lin2d): boolean;
  IsOut_3(theP0: gp_Pnt2d, theP1: gp_Pnt2d): boolean;
  IsOut_4(Other: Bnd_Box2d): boolean;
  Contains(theP: gp_Pnt2d): boolean;
  Intersects(theOther: Bnd_Box2d): boolean;
  Distance(theOther: Bnd_Box2d): number;
  IsOut_5(theOther: Bnd_Box2d, theTrsf: gp_Trsf2d): boolean;
  IsOut_6(T1: gp_Trsf2d, Other: Bnd_Box2d, T2: gp_Trsf2d): boolean;
  Dump(): void;
  SquareExtent(): number;
  delete(): void;
}

export declare class Bnd_Box {
  SetWhole(): void;
  SetVoid(): void;
  Set_1(P: gp_Pnt): void;
  Set_2(P: gp_Pnt, D: gp_Dir): void;
  Update_1(aXmin: number, aYmin: number, aZmin: number, aXmax: number, aYmax: number, aZmax: number): void;
  Update_2(X: number, Y: number, Z: number): void;
  SetGap(Tol: number): void;
  Enlarge(Tol: number): void;
  GetXMin(): number;
  GetXMax(): number;
  GetYMin(): number;
  GetYMax(): number;
  GetZMin(): number;
  GetZMax(): number;
  CornerMin(): gp_Pnt;
  CornerMax(): gp_Pnt;
  Center(): any;
  OpenXmin(): void;
  OpenXmax(): void;
  OpenYmin(): void;
  OpenYmax(): void;
  OpenZmin(): void;
  OpenZmax(): void;
  IsOpen(): boolean;
  IsOpenXmin(): boolean;
  IsOpenXmax(): boolean;
  IsOpenYmin(): boolean;
  IsOpenYmax(): boolean;
  IsOpenZmin(): boolean;
  IsOpenZmax(): boolean;
  IsWhole(): boolean;
  IsVoid(): boolean;
  IsXThin(tol: number): boolean;
  IsYThin(tol: number): boolean;
  IsZThin(tol: number): boolean;
  IsThin(tol: number): boolean;
  Transformed(T: gp_Trsf): Bnd_Box;
  Add_1(Other: Bnd_Box): void;
  Add_2(P: gp_Pnt): void;
  Add_3(P: gp_Pnt, D: gp_Dir): void;
  Add_4(D: gp_Dir): void;
  IsOut_1(P: gp_Pnt): boolean;
  IsOut_2(L: gp_Lin): boolean;
  IsOut_3(P: gp_Pln): boolean;
  IsOut_4(Other: Bnd_Box): boolean;
  IsOut_5(Other: Bnd_Box, T: gp_Trsf): boolean;
  IsOut_6(T1: gp_Trsf, Other: Bnd_Box, T2: gp_Trsf): boolean;
  IsOut_7(P1: gp_Pnt, P2: gp_Pnt, D: gp_Dir): boolean;
  Contains(theP: gp_Pnt): boolean;
  Intersects(theOther: Bnd_Box): boolean;
  Distance(Other: Bnd_Box): number;
  Dump(): void;
  SquareExtent(): number;
  FinitePart(): Bnd_Box;
  HasFinitePart(): boolean;
  InitFromJson(theSStream: any, theStreamPos: number): boolean;
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
  static get_type_name(): string;
  static get_type_descriptor(): Standard_Type;
  DynamicType(): Standard_Type;
  Copy(): Poly_PolygonOnTriangulation;
  Deflection_1(): number;
  Deflection_2(theDefl: number): void;
  NbNodes(): number;
  Node(theIndex: number): number;
  SetNode(theIndex: number, theNode: number): void;
  HasParameters(): boolean;
  Parameter(theIndex: number): number;
  SetParameter(theIndex: number, theValue: number): void;
  SetParameters(theParameters: NCollection_HArray1<double>): void;
  Nodes(): TColStd_Array1OfInteger;
  Parameters(): NCollection_HArray1<double>;
  ChangeNodes(): TColStd_Array1OfInteger;
  ChangeParameters(): TColStd_Array1OfReal;
  delete(): void;
}

  export declare class Poly_PolygonOnTriangulation_1 extends Poly_PolygonOnTriangulation {
    constructor(theNbNodes: number, theHasParams: boolean);
  }

  export declare class Poly_PolygonOnTriangulation_2 extends Poly_PolygonOnTriangulation {
    constructor(Nodes: TColStd_Array1OfInteger);
  }

  export declare class Poly_PolygonOnTriangulation_3 extends Poly_PolygonOnTriangulation {
    constructor(Nodes: TColStd_Array1OfInteger, Parameters: TColStd_Array1OfReal);
  }

export declare class Poly_Triangulation extends Standard_Transient {
  static get_type_name(): string;
  static get_type_descriptor(): Standard_Type;
  DynamicType(): Standard_Type;
  Copy(): Poly_Triangulation;
  Deflection_1(): number;
  Deflection_2(theDeflection: number): void;
  Parameters_1(): Poly_TriangulationParameters;
  Parameters_2(theParams: Poly_TriangulationParameters): void;
  Clear(): void;
  HasGeometry(): boolean;
  NbNodes(): number;
  NbTriangles(): number;
  HasUVNodes(): boolean;
  HasNormals(): boolean;
  Node(theIndex: number): gp_Pnt;
  SetNode(theIndex: number, thePnt: gp_Pnt): void;
  UVNode(theIndex: number): gp_Pnt2d;
  SetUVNode(theIndex: number, thePnt: gp_Pnt2d): void;
  Triangle(theIndex: number): Poly_Triangle;
  SetTriangle(theIndex: number, theTriangle: Poly_Triangle): void;
  Normal_1(theIndex: number): gp_Dir;
  Normal_2(theIndex: number, theVec3: any): void;
  SetNormal_1(theIndex: number, theNormal: any): void;
  SetNormal_2(theIndex: number, theNormal: gp_Dir): void;
  MeshPurpose(): Poly_MeshPurpose;
  SetMeshPurpose(thePurpose: Poly_MeshPurpose): void;
  CachedMinMax(): Bnd_Box;
  SetCachedMinMax(theBox: Bnd_Box): void;
  HasCachedMinMax(): boolean;
  UpdateCachedMinMax(): void;
  MinMax(theBox: Bnd_Box, theTrsf: gp_Trsf, theIsAccurate: boolean): boolean;
  IsDoublePrecision(): boolean;
  SetDoublePrecision(theIsDouble: boolean): void;
  ResizeNodes(theNbNodes: number, theToCopyOld: boolean): void;
  ResizeTriangles(theNbTriangles: number, theToCopyOld: boolean): void;
  AddUVNodes(): void;
  RemoveUVNodes(): void;
  AddNormals(): void;
  RemoveNormals(): void;
  ComputeNormals(): void;
  MapNodeArray(): NCollection_HArray1<gp_Pnt>;
  MapTriangleArray(): NCollection_HArray1<Poly_Triangle>;
  MapUVNodeArray(): NCollection_HArray1<gp_Pnt2d>;
  MapNormalArray(): NCollection_HArray1<float>;
  InternalTriangles(): Poly_Array1OfTriangle;
  InternalNodes(): Poly_ArrayOfNodes;
  InternalUVNodes(): Poly_ArrayOfUVNodes;
  InternalNormals(): any;
  SetNormals(theNormals: NCollection_HArray1<float>): void;
  Triangles(): Poly_Array1OfTriangle;
  ChangeTriangles(): Poly_Array1OfTriangle;
  ChangeTriangle(theIndex: number): Poly_Triangle;
  NbDeferredNodes(): number;
  NbDeferredTriangles(): number;
  HasDeferredData(): boolean;
  LoadDeferredData(theFileSystem: OSD_FileSystem): boolean;
  DetachedLoadDeferredData(theFileSystem: OSD_FileSystem): Poly_Triangulation;
  UnloadDeferredData(): boolean;
  delete(): void;
}

  export declare class Poly_Triangulation_1 extends Poly_Triangulation {
    constructor();
  }

  export declare class Poly_Triangulation_2 extends Poly_Triangulation {
    constructor(theNbNodes: number, theNbTriangles: number, theHasUVNodes: boolean, theHasNormals: boolean);
  }

  export declare class Poly_Triangulation_3 extends Poly_Triangulation {
    constructor(Nodes: TColgp_Array1OfPnt, Triangles: Poly_Array1OfTriangle);
  }

  export declare class Poly_Triangulation_4 extends Poly_Triangulation {
    constructor(Nodes: TColgp_Array1OfPnt, UVNodes: TColgp_Array1OfPnt2d, Triangles: Poly_Array1OfTriangle);
  }

  export declare class Poly_Triangulation_5 extends Poly_Triangulation {
    constructor(theTriangulation: Poly_Triangulation);
  }

export declare class Poly_Triangle {
  Set_1(theN1: number, theN2: number, theN3: number): void;
  Set_2(theIndex: number, theNode: number): void;
  Get(theN1: number, theN2: number, theN3: number): void;
  Value(theIndex: number): number;
  ChangeValue(theIndex: number): number;
  delete(): void;
}

  export declare class Poly_Triangle_1 extends Poly_Triangle {
    constructor();
  }

  export declare class Poly_Triangle_2 extends Poly_Triangle {
    constructor(theN1: number, theN2: number, theN3: number);
  }

export declare class TDF_Attribute extends Standard_Transient {
  ID(): Standard_GUID;
  SetID_1(a0: Standard_GUID): void;
  SetID_2(): void;
  Label(): TDF_Label;
  Transaction(): number;
  UntilTransaction(): number;
  IsValid(): boolean;
  IsNew(): boolean;
  IsForgotten(): boolean;
  IsAttribute(anID: Standard_GUID): boolean;
  FindAttribute_1(anID: Standard_GUID, anAttribute: TDF_Attribute): boolean;
  AddAttribute(other: TDF_Attribute): void;
  ForgetAttribute(aguid: Standard_GUID): boolean;
  ForgetAllAttributes(clearChildren: boolean): void;
  AfterAddition(): void;
  BeforeRemoval(): void;
  BeforeForget(): void;
  AfterResume(): void;
  AfterRetrieval(forceIt: boolean): boolean;
  BeforeUndo(anAttDelta: TDF_AttributeDelta, forceIt: boolean): boolean;
  AfterUndo(anAttDelta: TDF_AttributeDelta, forceIt: boolean): boolean;
  BeforeCommitTransaction(): void;
  Backup_1(): void;
  IsBackuped(): boolean;
  BackupCopy(): TDF_Attribute;
  Restore(anAttribute: TDF_Attribute): void;
  DeltaOnAddition(): TDF_DeltaOnAddition;
  DeltaOnForget(): TDF_DeltaOnForget;
  DeltaOnResume(): TDF_DeltaOnResume;
  DeltaOnModification_1(anOldAttribute: TDF_Attribute): TDF_DeltaOnModification;
  DeltaOnModification_2(aDelta: TDF_DeltaOnModification): void;
  DeltaOnRemoval(): TDF_DeltaOnRemoval;
  NewEmpty(): TDF_Attribute;
  Paste(intoAttribute: TDF_Attribute, aRelocationTable: TDF_RelocationTable): void;
  References(aDataSet: TDF_DataSet): void;
  Forget(aTransaction: number): void;
  static get_type_name(): string;
  static get_type_descriptor(): Standard_Type;
  DynamicType(): Standard_Type;
  delete(): void;
}

export declare class TDF_Label {
  constructor()
  Nullify(): void;
  Data(): TDF_Data;
  Tag(): number;
  Father(): TDF_Label;
  IsNull(): boolean;
  Imported(aStatus: boolean): void;
  IsImported(): boolean;
  IsEqual(aLabel: TDF_Label): boolean;
  IsDifferent(aLabel: TDF_Label): boolean;
  IsRoot(): boolean;
  IsAttribute(anID: Standard_GUID): boolean;
  AddAttribute(anAttribute: TDF_Attribute, append: boolean): void;
  ForgetAttribute_1(anAttribute: TDF_Attribute): void;
  ForgetAttribute_2(aguid: Standard_GUID): boolean;
  ForgetAllAttributes(clearChildren: boolean): void;
  ResumeAttribute(anAttribute: TDF_Attribute): void;
  FindAttribute_1(anID: Standard_GUID, anAttribute: TDF_Attribute): boolean;
  FindAttribute_3(anID: Standard_GUID, aTransaction: number, anAttribute: TDF_Attribute): boolean;
  MayBeModified(): boolean;
  AttributesModified(): boolean;
  HasAttribute(): boolean;
  NbAttributes(): number;
  Depth(): number;
  IsDescendant(aLabel: TDF_Label): boolean;
  Root(): TDF_Label;
  HasChild(): boolean;
  NbChildren(): number;
  FindChild(aTag: number, create: boolean): TDF_Label;
  NewChild(): TDF_Label;
  Transaction(): number;
  HasLowerNode(otherLabel: TDF_Label): boolean;
  HasGreaterNode(otherLabel: TDF_Label): boolean;
  delete(): void;
}

export declare class TDataStd_Name extends TDataStd_GenericExtString {
  constructor()
  static GetID(): Standard_GUID;
  static Set_1(label: TDF_Label, string: TCollection_ExtendedString): TDataStd_Name;
  static Set_2(label: TDF_Label, guid: Standard_GUID, string: TCollection_ExtendedString): TDataStd_Name;
  Set_3(S: TCollection_ExtendedString): void;
  SetID_1(guid: Standard_GUID): void;
  SetID_2(): void;
  static get_type_name(): string;
  static get_type_descriptor(): Standard_Type;
  DynamicType(): Standard_Type;
  NewEmpty(): TDF_Attribute;
  delete(): void;
}

export declare class TDataStd_GenericEmpty extends TDF_Attribute {
  Restore(a0: TDF_Attribute): void;
  Paste(a0: TDF_Attribute, a1: TDF_RelocationTable): void;
  static get_type_name(): string;
  static get_type_descriptor(): Standard_Type;
  DynamicType(): Standard_Type;
  delete(): void;
}

export declare class TDataStd_GenericExtString extends TDF_Attribute {
  Set(S: TCollection_ExtendedString): void;
  SetID(guid: Standard_GUID): void;
  Get(): TCollection_ExtendedString;
  ID(): Standard_GUID;
  Restore(with_: TDF_Attribute): void;
  Paste(into: TDF_Attribute, RT: TDF_RelocationTable): void;
  static get_type_name(): string;
  static get_type_descriptor(): Standard_Type;
  DynamicType(): Standard_Type;
  delete(): void;
}

export declare class TDocStd_Document extends CDM_Document {
  constructor(astorageformat: TCollection_ExtendedString)
  static Get(L: TDF_Label): TDocStd_Document;
  IsSaved(): boolean;
  IsChanged(): boolean;
  SetSaved(): void;
  SetSavedTime(theTime: number): void;
  GetSavedTime(): number;
  GetName(): TCollection_ExtendedString;
  GetPath(): TCollection_ExtendedString;
  SetData(data: TDF_Data): void;
  GetData(): TDF_Data;
  Main(): TDF_Label;
  IsEmpty(): boolean;
  IsValid(): boolean;
  SetModified(L: TDF_Label): void;
  PurgeModified(): void;
  GetModified(): any;
  NewCommand(): void;
  HasOpenCommand(): boolean;
  OpenCommand(): void;
  CommitCommand(): boolean;
  AbortCommand(): void;
  GetUndoLimit(): number;
  SetUndoLimit(L: number): void;
  ClearUndos(): void;
  ClearRedos(): void;
  GetAvailableUndos(): number;
  Undo(): boolean;
  GetAvailableRedos(): number;
  Redo(): boolean;
  GetUndos(): any;
  GetRedos(): any;
  RemoveFirstUndo(): void;
  InitDeltaCompaction(): boolean;
  PerformDeltaCompaction(): boolean;
  UpdateReferences(aDocEntry: XCAFDoc_PartId): void;
  Recompute(): void;
  StorageFormat(): TCollection_ExtendedString;
  SetEmptyLabelsSavingMode(isAllowed: boolean): void;
  EmptyLabelsSavingMode(): boolean;
  ChangeStorageFormat(newStorageFormat: TCollection_ExtendedString): void;
  SetNestedTransactionMode(isAllowed: boolean): void;
  IsNestedTransactionMode(): boolean;
  SetModificationMode(theTransactionOnly: boolean): void;
  ModificationMode(): boolean;
  BeforeClose(): void;
  StorageFormatVersion(): TDocStd_FormatVersion;
  ChangeStorageFormatVersion(theVersion: TDocStd_FormatVersion): void;
  static CurrentStorageFormatVersion(): TDocStd_FormatVersion;
  static get_type_name(): string;
  static get_type_descriptor(): Standard_Type;
  DynamicType(): Standard_Type;
  delete(): void;
}

export declare class CDM_Document extends Standard_Transient {
  Update_2(ErrorString: TCollection_ExtendedString): boolean;
  StorageFormat(): TCollection_ExtendedString;
  Extensions(Extensions: TColStd_SequenceOfExtendedString): void;
  GetAlternativeDocument(aFormat: TCollection_ExtendedString, anAlternativeDocument: CDM_Document): boolean;
  CreateReference_1(anOtherDocument: CDM_Document): number;
  RemoveReference(aReferenceIdentifier: number): void;
  RemoveAllReferences(): void;
  Document(aReferenceIdentifier: number): CDM_Document;
  IsInSession(aReferenceIdentifier: number): boolean;
  IsStored_1(aReferenceIdentifier: number): boolean;
  Name(aReferenceIdentifier: number): TCollection_ExtendedString;
  ToReferencesNumber(): number;
  FromReferencesNumber(): number;
  ShallowReferences(aDocument: CDM_Document): boolean;
  DeepReferences(aDocument: CDM_Document): boolean;
  CopyReference(aFromDocument: CDM_Document, aReferenceIdentifier: number): number;
  IsReadOnly_1(): boolean;
  IsReadOnly_2(aReferenceIdentifier: number): boolean;
  SetIsReadOnly(): void;
  UnsetIsReadOnly(): void;
  Modify(): void;
  Modifications(): number;
  UnModify(): void;
  IsUpToDate(aReferenceIdentifier: number): boolean;
  SetIsUpToDate(aReferenceIdentifier: number): void;
  SetComment(aComment: TCollection_ExtendedString): void;
  AddComment(aComment: TCollection_ExtendedString): void;
  SetComments(aComments: TColStd_SequenceOfExtendedString): void;
  Comments(aComments: TColStd_SequenceOfExtendedString): void;
  Comment(): string;
  IsStored_2(): boolean;
  StorageVersion(): number;
  SetMetaData(aMetaData: CDM_MetaData): void;
  UnsetIsStored(): void;
  MetaData(): CDM_MetaData;
  Folder(): TCollection_ExtendedString;
  SetRequestedFolder(aFolder: TCollection_ExtendedString): void;
  RequestedFolder(): TCollection_ExtendedString;
  HasRequestedFolder(): boolean;
  SetRequestedName(aName: TCollection_ExtendedString): void;
  RequestedName(): TCollection_ExtendedString;
  SetRequestedPreviousVersion(aPreviousVersion: TCollection_ExtendedString): void;
  UnsetRequestedPreviousVersion(): void;
  HasRequestedPreviousVersion(): boolean;
  RequestedPreviousVersion(): TCollection_ExtendedString;
  SetRequestedComment(aComment: TCollection_ExtendedString): void;
  RequestedComment(): TCollection_ExtendedString;
  LoadResources(): void;
  FindFileExtension(): boolean;
  FileExtension(): TCollection_ExtendedString;
  FindDescription(): boolean;
  Description(): TCollection_ExtendedString;
  IsModified(): boolean;
  IsOpened_1(): boolean;
  Open(anApplication: CDM_Application): void;
  CanClose(): CDM_CanCloseStatus;
  Close(): void;
  Application(): CDM_Application;
  CanCloseReference(aDocument: CDM_Document, aReferenceIdentifier: number): boolean;
  CloseReference(aDocument: CDM_Document, aReferenceIdentifier: number): void;
  IsOpened_2(aReferenceIdentifier: number): boolean;
  CreateReference_2(aMetaData: CDM_MetaData, aReferenceIdentifier: number, anApplication: CDM_Application, aToDocumentVersion: number, UseStorageConfiguration: boolean): void;
  CreateReference_3(aMetaData: CDM_MetaData, anApplication: CDM_Application, aDocumentVersion: number, UseStorageConfiguration: boolean): number;
  ReferenceCounter(): number;
  Update_3(): void;
  Reference(aReferenceIdentifier: number): CDM_Reference;
  SetModifications(Modifications: number): void;
  SetReferenceCounter(aReferenceCounter: number): void;
  static get_type_name(): string;
  static get_type_descriptor(): Standard_Type;
  DynamicType(): Standard_Type;
  delete(): void;
}

export declare class GeomToolsWrapper {
  constructor();
  static Write(geometry: Geom2d_Curve): string;
  static Read(data: string): Geom2d_Curve;
  delete(): void;
}

export declare class BRepMesh_IncrementalMeshWrapper {
  constructor(theShape: TopoDS_Shape, theLinDeflection: number, isRelative: boolean, theAngDeflection: number, isInParallel: boolean)
  delete(): void;
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

export declare class OCJS_ShapeHasher {
  constructor();
  static HashCode(shape: TopoDS_Shape, a1: number): number;
  delete(): void;
}

export declare class BRepToolsWrapper {
  constructor();
  static Write(shape: TopoDS_Shape): string;
  static Read(data: string): TopoDS_Shape;
  delete(): void;
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
  Allocator(): NCollection_BaseAllocator;
  Clear(): void;
  AddError(theAlert: Message_Alert): void;
  AddWarning(theAlert: Message_Alert): void;
  HasErrors(): boolean;
  HasError(theType: Standard_Type): boolean;
  HasWarnings(): boolean;
  HasWarning(theType: Standard_Type): boolean;
  GetReport(): Message_Report;
  ClearWarnings(): void;
  static GetParallelMode(): boolean;
  static SetParallelMode(theNewMode: boolean): void;
  SetRunParallel(theFlag: boolean): void;
  RunParallel(): boolean;
  SetFuzzyValue(theFuzz: number): void;
  FuzzyValue(): number;
  SetUseOBB(theUseOBB: boolean): void;
  UseOBB(): boolean;
  delete(): void;
}

  export declare class BOPAlgo_Options_1 extends BOPAlgo_Options {
    constructor();
  }

  export declare class BOPAlgo_Options_2 extends BOPAlgo_Options {
    constructor(theAllocator: NCollection_BaseAllocator);
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
    constructor(S1: TopoDS_Shape, S2: TopoDS_Shape, aDSF: BOPAlgo_PaveFiller, bFWD: boolean, theRange: Message_ProgressRange);
  }

export declare class BRepAlgoAPI_BuilderAlgo extends BRepAlgoAPI_Algo {
  SetArguments(theLS: TopTools_ListOfShape): void;
  Arguments(): TopTools_ListOfShape;
  SetNonDestructive(theFlag: boolean): void;
  NonDestructive(): boolean;
  SetGlue(theGlue: BOPAlgo_GlueEnum): void;
  Glue(): BOPAlgo_GlueEnum;
  SetCheckInverted(theCheck: boolean): void;
  CheckInverted(): boolean;
  Build(theRange: Message_ProgressRange): void;
  SimplifyResult(theUnifyEdges: boolean, theUnifyFaces: boolean, theAngularTol: number): void;
  Modified(theS: TopoDS_Shape): TopTools_ListOfShape;
  Generated(theS: TopoDS_Shape): TopTools_ListOfShape;
  IsDeleted(aS: TopoDS_Shape): boolean;
  HasModified(): boolean;
  HasGenerated(): boolean;
  HasDeleted(): boolean;
  SetToFillHistory(theHistFlag: boolean): void;
  HasHistory(): boolean;
  SectionEdges(): TopTools_ListOfShape;
  DSFiller(): BOPAlgo_PPaveFiller;
  Builder(): BOPAlgo_PBuilder;
  History(): BRepTools_History;
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
  Init1_3(Sf: Geom_Surface): void;
  Init2_1(S2: TopoDS_Shape): void;
  Init2_2(Pl: gp_Pln): void;
  Init2_3(Sf: Geom_Surface): void;
  Approximation(B: boolean): void;
  ComputePCurveOn1(B: boolean): void;
  ComputePCurveOn2(B: boolean): void;
  Build(theRange: Message_ProgressRange): void;
  HasAncestorFaceOn1(E: TopoDS_Shape, F: TopoDS_Shape): boolean;
  HasAncestorFaceOn2(E: TopoDS_Shape, F: TopoDS_Shape): boolean;
  delete(): void;
}

  export declare class BRepAlgoAPI_Section_1 extends BRepAlgoAPI_Section {
    constructor();
  }

  export declare class BRepAlgoAPI_Section_2 extends BRepAlgoAPI_Section {
    constructor(PF: BOPAlgo_PaveFiller);
  }

  export declare class BRepAlgoAPI_Section_3 extends BRepAlgoAPI_Section {
    constructor(S1: TopoDS_Shape, S2: TopoDS_Shape, PerformNow: boolean);
  }

  export declare class BRepAlgoAPI_Section_4 extends BRepAlgoAPI_Section {
    constructor(S1: TopoDS_Shape, S2: TopoDS_Shape, aDSF: BOPAlgo_PaveFiller, PerformNow: boolean);
  }

  export declare class BRepAlgoAPI_Section_5 extends BRepAlgoAPI_Section {
    constructor(S1: TopoDS_Shape, Pl: gp_Pln, PerformNow: boolean);
  }

  export declare class BRepAlgoAPI_Section_6 extends BRepAlgoAPI_Section {
    constructor(S1: TopoDS_Shape, Sf: Geom_Surface, PerformNow: boolean);
  }

  export declare class BRepAlgoAPI_Section_7 extends BRepAlgoAPI_Section {
    constructor(Sf: Geom_Surface, S2: TopoDS_Shape, PerformNow: boolean);
  }

  export declare class BRepAlgoAPI_Section_8 extends BRepAlgoAPI_Section {
    constructor(Sf1: Geom_Surface, Sf2: Geom_Surface, PerformNow: boolean);
  }

export declare class BRepAlgoAPI_Algo extends BRepBuilderAPI_MakeShape {
  Shape(): TopoDS_Shape;
  Clear(): void;
  ClearWarnings(): void;
  FuzzyValue(): number;
  GetReport(): Message_Report;
  HasError(theType: Standard_Type): boolean;
  HasErrors(): boolean;
  HasWarning(theType: Standard_Type): boolean;
  HasWarnings(): boolean;
  RunParallel(): boolean;
  SetFuzzyValue(theFuzz: number): void;
  SetRunParallel(theFlag: boolean): void;
  SetUseOBB(theUseOBB: boolean): void;
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
  NbIntervals(S: GeomAbs_Shape): number;
  Intervals(T: TColStd_Array1OfReal, S: GeomAbs_Shape): void;
  Value(X: number): number;
  D1(X: number, F: number, D: number): void;
  D2(X: number, F: number, D: number, D2: number): void;
  Trim(PFirst: number, PLast: number, Tol: number): Law_Function;
  Bounds(PFirst: number, PLast: number): void;
  ChangeElementaryLaw(W: number): Law_Function;
  ChangeLaws(): any;
  IsPeriodic(): boolean;
  SetPeriodic(): void;
  static get_type_name(): string;
  static get_type_descriptor(): Standard_Type;
  DynamicType(): Standard_Type;
  delete(): void;
}

  export declare class Law_Composite_1 extends Law_Composite {
    constructor();
  }

  export declare class Law_Composite_2 extends Law_Composite {
    constructor(First: number, Last: number, Tol: number);
  }

export declare class Law_Interpol extends Law_BSpFunc {
  constructor()
  Set_1(ParAndRad: TColgp_Array1OfPnt2d, Periodic: boolean): void;
  SetInRelative_1(ParAndRad: TColgp_Array1OfPnt2d, Ud: number, Uf: number, Periodic: boolean): void;
  Set_2(ParAndRad: TColgp_Array1OfPnt2d, Dd: number, Df: number, Periodic: boolean): void;
  SetInRelative_2(ParAndRad: TColgp_Array1OfPnt2d, Ud: number, Uf: number, Dd: number, Df: number, Periodic: boolean): void;
  static get_type_name(): string;
  static get_type_descriptor(): Standard_Type;
  DynamicType(): Standard_Type;
  delete(): void;
}

export declare class Law_BSpFunc extends Law_Function {
  Continuity(): GeomAbs_Shape;
  NbIntervals(S: GeomAbs_Shape): number;
  Intervals(T: TColStd_Array1OfReal, S: GeomAbs_Shape): void;
  Value(X: number): number;
  D1(X: number, F: number, D: number): void;
  D2(X: number, F: number, D: number, D2: number): void;
  Trim(PFirst: number, PLast: number, Tol: number): Law_Function;
  Bounds(PFirst: number, PLast: number): void;
  Curve(): Law_BSpline;
  SetCurve(C: Law_BSpline): void;
  static get_type_name(): string;
  static get_type_descriptor(): Standard_Type;
  DynamicType(): Standard_Type;
  delete(): void;
}

  export declare class Law_BSpFunc_1 extends Law_BSpFunc {
    constructor();
  }

  export declare class Law_BSpFunc_2 extends Law_BSpFunc {
    constructor(C: Law_BSpline, First: number, Last: number);
  }

export declare class Law_S extends Law_BSpFunc {
  constructor()
  Set_1(Pdeb: number, Valdeb: number, Pfin: number, Valfin: number): void;
  Set_2(Pdeb: number, Valdeb: number, Ddeb: number, Pfin: number, Valfin: number, Dfin: number): void;
  static get_type_name(): string;
  static get_type_descriptor(): Standard_Type;
  DynamicType(): Standard_Type;
  delete(): void;
}

export declare class Law_Linear extends Law_Function {
  constructor()
  Set(Pdeb: number, Valdeb: number, Pfin: number, Valfin: number): void;
  Continuity(): GeomAbs_Shape;
  NbIntervals(S: GeomAbs_Shape): number;
  Intervals(T: TColStd_Array1OfReal, S: GeomAbs_Shape): void;
  Value(X: number): number;
  D1(X: number, F: number, D: number): void;
  D2(X: number, F: number, D: number, D2: number): void;
  Trim(PFirst: number, PLast: number, Tol: number): Law_Function;
  Bounds(PFirst: number, PLast: number): void;
  static get_type_name(): string;
  static get_type_descriptor(): Standard_Type;
  DynamicType(): Standard_Type;
  delete(): void;
}

export declare class Law_Function extends Standard_Transient {
  Continuity(): GeomAbs_Shape;
  NbIntervals(S: GeomAbs_Shape): number;
  Intervals(T: TColStd_Array1OfReal, S: GeomAbs_Shape): void;
  Value(X: number): number;
  D1(X: number, F: number, D: number): void;
  D2(X: number, F: number, D: number, D2: number): void;
  Trim(PFirst: number, PLast: number, Tol: number): Law_Function;
  Bounds(PFirst: number, PLast: number): void;
  static get_type_name(): string;
  static get_type_descriptor(): Standard_Type;
  DynamicType(): Standard_Type;
  delete(): void;
}

export declare class Geom2dAPI_InterCurveCurve {
  Init_1(C1: Geom2d_Curve, C2: Geom2d_Curve, Tol: number): void;
  Init_2(C1: Geom2d_Curve, Tol: number): void;
  NbPoints(): number;
  Point(Index: number): gp_Pnt2d;
  NbSegments(): number;
  Segment(Index: number, Curve1: Geom2d_Curve, Curve2: Geom2d_Curve): void;
  Intersector(): Geom2dInt_GInter;
  delete(): void;
}

  export declare class Geom2dAPI_InterCurveCurve_1 extends Geom2dAPI_InterCurveCurve {
    constructor();
  }

  export declare class Geom2dAPI_InterCurveCurve_2 extends Geom2dAPI_InterCurveCurve {
    constructor(C1: Geom2d_Curve, C2: Geom2d_Curve, Tol: number);
  }

  export declare class Geom2dAPI_InterCurveCurve_3 extends Geom2dAPI_InterCurveCurve {
    constructor(C1: Geom2d_Curve, Tol: number);
  }

export declare class Geom2dAPI_ProjectPointOnCurve {
  Init_1(P: gp_Pnt2d, Curve: Geom2d_Curve): void;
  Init_2(P: gp_Pnt2d, Curve: Geom2d_Curve, Umin: number, Usup: number): void;
  NbPoints(): number;
  Point(Index: number): gp_Pnt2d;
  Parameter_1(Index: number): number;
  Parameter_2(Index: number, U: number): void;
  Distance(Index: number): number;
  NearestPoint(): gp_Pnt2d;
  LowerDistanceParameter(): number;
  LowerDistance(): number;
  Extrema(): Extrema_ExtPC2d;
  delete(): void;
}

  export declare class Geom2dAPI_ProjectPointOnCurve_1 extends Geom2dAPI_ProjectPointOnCurve {
    constructor();
  }

  export declare class Geom2dAPI_ProjectPointOnCurve_2 extends Geom2dAPI_ProjectPointOnCurve {
    constructor(P: gp_Pnt2d, Curve: Geom2d_Curve);
  }

  export declare class Geom2dAPI_ProjectPointOnCurve_3 extends Geom2dAPI_ProjectPointOnCurve {
    constructor(P: gp_Pnt2d, Curve: Geom2d_Curve, Umin: number, Usup: number);
  }

export declare class Geom2dAPI_ExtremaCurveCurve {
  constructor(C1: Geom2d_Curve, C2: Geom2d_Curve, U1min: number, U1max: number, U2min: number, U2max: number)
  NbExtrema(): number;
  Points(Index: number, P1: gp_Pnt2d, P2: gp_Pnt2d): void;
  Parameters(Index: number, U1: number, U2: number): void;
  Distance(Index: number): number;
  NearestPoints(P1: gp_Pnt2d, P2: gp_Pnt2d): void;
  LowerDistanceParameters(U1: number, U2: number): void;
  LowerDistance(): number;
  Extrema(): Extrema_ExtCC2d;
  delete(): void;
}

export declare class Geom2dAPI_PointsToBSpline {
  Init_1(Points: TColgp_Array1OfPnt2d, DegMin: number, DegMax: number, Continuity: GeomAbs_Shape, Tol2D: number): void;
  Init_2(YValues: TColStd_Array1OfReal, X0: number, DX: number, DegMin: number, DegMax: number, Continuity: GeomAbs_Shape, Tol2D: number): void;
  Init_3(Points: TColgp_Array1OfPnt2d, ParType: Approx_ParametrizationType, DegMin: number, DegMax: number, Continuity: GeomAbs_Shape, Tol2D: number): void;
  Init_4(Points: TColgp_Array1OfPnt2d, Parameters: TColStd_Array1OfReal, DegMin: number, DegMax: number, Continuity: GeomAbs_Shape, Tol2D: number): void;
  Init_5(Points: TColgp_Array1OfPnt2d, Weight1: number, Weight2: number, Weight3: number, DegMax: number, Continuity: GeomAbs_Shape, Tol2D: number): void;
  Curve(): Geom2d_BSplineCurve;
  IsDone(): boolean;
  delete(): void;
}

  export declare class Geom2dAPI_PointsToBSpline_1 extends Geom2dAPI_PointsToBSpline {
    constructor();
  }

  export declare class Geom2dAPI_PointsToBSpline_2 extends Geom2dAPI_PointsToBSpline {
    constructor(Points: TColgp_Array1OfPnt2d, DegMin: number, DegMax: number, Continuity: GeomAbs_Shape, Tol2D: number);
  }

  export declare class Geom2dAPI_PointsToBSpline_3 extends Geom2dAPI_PointsToBSpline {
    constructor(YValues: TColStd_Array1OfReal, X0: number, DX: number, DegMin: number, DegMax: number, Continuity: GeomAbs_Shape, Tol2D: number);
  }

  export declare class Geom2dAPI_PointsToBSpline_4 extends Geom2dAPI_PointsToBSpline {
    constructor(Points: TColgp_Array1OfPnt2d, ParType: Approx_ParametrizationType, DegMin: number, DegMax: number, Continuity: GeomAbs_Shape, Tol2D: number);
  }

  export declare class Geom2dAPI_PointsToBSpline_5 extends Geom2dAPI_PointsToBSpline {
    constructor(Points: TColgp_Array1OfPnt2d, Parameters: TColStd_Array1OfReal, DegMin: number, DegMax: number, Continuity: GeomAbs_Shape, Tol2D: number);
  }

  export declare class Geom2dAPI_PointsToBSpline_6 extends Geom2dAPI_PointsToBSpline {
    constructor(Points: TColgp_Array1OfPnt2d, Weight1: number, Weight2: number, Weight3: number, DegMax: number, Continuity: GeomAbs_Shape, Tol3D: number);
  }

export declare class GeomAPI_PointsToBSpline {
  Init_1(Points: TColgp_Array1OfPnt, DegMin: number, DegMax: number, Continuity: GeomAbs_Shape, Tol3D: number): void;
  Init_2(Points: TColgp_Array1OfPnt, ParType: Approx_ParametrizationType, DegMin: number, DegMax: number, Continuity: GeomAbs_Shape, Tol3D: number): void;
  Init_3(Points: TColgp_Array1OfPnt, Parameters: TColStd_Array1OfReal, DegMin: number, DegMax: number, Continuity: GeomAbs_Shape, Tol3D: number): void;
  Init_4(Points: TColgp_Array1OfPnt, Weight1: number, Weight2: number, Weight3: number, DegMax: number, Continuity: GeomAbs_Shape, Tol3D: number): void;
  Curve(): Geom_BSplineCurve;
  IsDone(): boolean;
  delete(): void;
}

  export declare class GeomAPI_PointsToBSpline_1 extends GeomAPI_PointsToBSpline {
    constructor();
  }

  export declare class GeomAPI_PointsToBSpline_2 extends GeomAPI_PointsToBSpline {
    constructor(Points: TColgp_Array1OfPnt, DegMin: number, DegMax: number, Continuity: GeomAbs_Shape, Tol3D: number);
  }

  export declare class GeomAPI_PointsToBSpline_3 extends GeomAPI_PointsToBSpline {
    constructor(Points: TColgp_Array1OfPnt, ParType: Approx_ParametrizationType, DegMin: number, DegMax: number, Continuity: GeomAbs_Shape, Tol3D: number);
  }

  export declare class GeomAPI_PointsToBSpline_4 extends GeomAPI_PointsToBSpline {
    constructor(Points: TColgp_Array1OfPnt, Parameters: TColStd_Array1OfReal, DegMin: number, DegMax: number, Continuity: GeomAbs_Shape, Tol3D: number);
  }

  export declare class GeomAPI_PointsToBSpline_5 extends GeomAPI_PointsToBSpline {
    constructor(Points: TColgp_Array1OfPnt, Weight1: number, Weight2: number, Weight3: number, DegMax: number, Continuity: GeomAbs_Shape, Tol3D: number);
  }

export declare class GeomAPI_ProjectPointOnSurf {
  Init_1(P: gp_Pnt, Surface: Geom_Surface, Tolerance: number, Algo: Extrema_ExtAlgo): void;
  Init_2(P: gp_Pnt, Surface: Geom_Surface, Algo: Extrema_ExtAlgo): void;
  Init_3(P: gp_Pnt, Surface: Geom_Surface, Umin: number, Usup: number, Vmin: number, Vsup: number, Tolerance: number, Algo: Extrema_ExtAlgo): void;
  Init_4(P: gp_Pnt, Surface: Geom_Surface, Umin: number, Usup: number, Vmin: number, Vsup: number, Algo: Extrema_ExtAlgo): void;
  Init_5(Surface: Geom_Surface, Umin: number, Usup: number, Vmin: number, Vsup: number, Tolerance: number, Algo: Extrema_ExtAlgo): void;
  Init_6(Surface: Geom_Surface, Umin: number, Usup: number, Vmin: number, Vsup: number, Algo: Extrema_ExtAlgo): void;
  SetExtremaAlgo(theAlgo: Extrema_ExtAlgo): void;
  SetExtremaFlag(theExtFlag: Extrema_ExtFlag): void;
  Perform(P: gp_Pnt): void;
  IsDone(): boolean;
  NbPoints(): number;
  Point(Index: number): gp_Pnt;
  Parameters(Index: number, U: number, V: number): void;
  Distance(Index: number): number;
  NearestPoint(): gp_Pnt;
  LowerDistanceParameters(U: number, V: number): void;
  LowerDistance(): number;
  delete(): void;
}

  export declare class GeomAPI_ProjectPointOnSurf_1 extends GeomAPI_ProjectPointOnSurf {
    constructor();
  }

  export declare class GeomAPI_ProjectPointOnSurf_2 extends GeomAPI_ProjectPointOnSurf {
    constructor(P: gp_Pnt, Surface: Geom_Surface, Algo: Extrema_ExtAlgo);
  }

  export declare class GeomAPI_ProjectPointOnSurf_3 extends GeomAPI_ProjectPointOnSurf {
    constructor(P: gp_Pnt, Surface: Geom_Surface, Tolerance: number, Algo: Extrema_ExtAlgo);
  }

  export declare class GeomAPI_ProjectPointOnSurf_4 extends GeomAPI_ProjectPointOnSurf {
    constructor(P: gp_Pnt, Surface: Geom_Surface, Umin: number, Usup: number, Vmin: number, Vsup: number, Tolerance: number, Algo: Extrema_ExtAlgo);
  }

  export declare class GeomAPI_ProjectPointOnSurf_5 extends GeomAPI_ProjectPointOnSurf {
    constructor(P: gp_Pnt, Surface: Geom_Surface, Umin: number, Usup: number, Vmin: number, Vsup: number, Algo: Extrema_ExtAlgo);
  }

export declare class BRepPrimAPI_MakePrism extends BRepPrimAPI_MakeSweep {
  Prism(): BRepSweep_Prism;
  Build(theRange: Message_ProgressRange): void;
  FirstShape_1(): TopoDS_Shape;
  LastShape_1(): TopoDS_Shape;
  Generated(S: TopoDS_Shape): TopTools_ListOfShape;
  IsDeleted(S: TopoDS_Shape): boolean;
  FirstShape_2(theShape: TopoDS_Shape): TopoDS_Shape;
  LastShape_2(theShape: TopoDS_Shape): TopoDS_Shape;
  delete(): void;
}

  export declare class BRepPrimAPI_MakePrism_1 extends BRepPrimAPI_MakePrism {
    constructor(S: TopoDS_Shape, V: gp_Vec, Copy: boolean, Canonize: boolean);
  }

  export declare class BRepPrimAPI_MakePrism_2 extends BRepPrimAPI_MakePrism {
    constructor(S: TopoDS_Shape, D: gp_Dir, Inf: boolean, Copy: boolean, Canonize: boolean);
  }

export declare class BRepPrimAPI_MakeSphere extends BRepPrimAPI_MakeOneAxis {
  Sphere(): BRepPrim_Sphere;
  delete(): void;
}

  export declare class BRepPrimAPI_MakeSphere_1 extends BRepPrimAPI_MakeSphere {
    constructor(R: number);
  }

  export declare class BRepPrimAPI_MakeSphere_2 extends BRepPrimAPI_MakeSphere {
    constructor(R: number, angle: number);
  }

  export declare class BRepPrimAPI_MakeSphere_3 extends BRepPrimAPI_MakeSphere {
    constructor(R: number, angle1: number, angle2: number);
  }

  export declare class BRepPrimAPI_MakeSphere_4 extends BRepPrimAPI_MakeSphere {
    constructor(R: number, angle1: number, angle2: number, angle3: number);
  }

  export declare class BRepPrimAPI_MakeSphere_5 extends BRepPrimAPI_MakeSphere {
    constructor(Center: gp_Pnt, R: number);
  }

  export declare class BRepPrimAPI_MakeSphere_6 extends BRepPrimAPI_MakeSphere {
    constructor(Center: gp_Pnt, R: number, angle: number);
  }

  export declare class BRepPrimAPI_MakeSphere_7 extends BRepPrimAPI_MakeSphere {
    constructor(Center: gp_Pnt, R: number, angle1: number, angle2: number);
  }

  export declare class BRepPrimAPI_MakeSphere_8 extends BRepPrimAPI_MakeSphere {
    constructor(Center: gp_Pnt, R: number, angle1: number, angle2: number, angle3: number);
  }

  export declare class BRepPrimAPI_MakeSphere_9 extends BRepPrimAPI_MakeSphere {
    constructor(Axis: gp_Ax2, R: number);
  }

  export declare class BRepPrimAPI_MakeSphere_10 extends BRepPrimAPI_MakeSphere {
    constructor(Axis: gp_Ax2, R: number, angle: number);
  }

  export declare class BRepPrimAPI_MakeSphere_11 extends BRepPrimAPI_MakeSphere {
    constructor(Axis: gp_Ax2, R: number, angle1: number, angle2: number);
  }

  export declare class BRepPrimAPI_MakeSphere_12 extends BRepPrimAPI_MakeSphere {
    constructor(Axis: gp_Ax2, R: number, angle1: number, angle2: number, angle3: number);
  }

export declare class BRepPrimAPI_MakeRevol extends BRepPrimAPI_MakeSweep {
  Revol(): BRepSweep_Revol;
  Build(theRange: Message_ProgressRange): void;
  FirstShape_1(): TopoDS_Shape;
  LastShape_1(): TopoDS_Shape;
  Generated(S: TopoDS_Shape): TopTools_ListOfShape;
  IsDeleted(S: TopoDS_Shape): boolean;
  FirstShape_2(theShape: TopoDS_Shape): TopoDS_Shape;
  LastShape_2(theShape: TopoDS_Shape): TopoDS_Shape;
  HasDegenerated(): boolean;
  Degenerated(): TopTools_ListOfShape;
  delete(): void;
}

  export declare class BRepPrimAPI_MakeRevol_1 extends BRepPrimAPI_MakeRevol {
    constructor(S: TopoDS_Shape, A: gp_Ax1, D: number, Copy: boolean);
  }

  export declare class BRepPrimAPI_MakeRevol_2 extends BRepPrimAPI_MakeRevol {
    constructor(S: TopoDS_Shape, A: gp_Ax1, Copy: boolean);
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
    constructor(R: number, H: number);
  }

  export declare class BRepPrimAPI_MakeCylinder_2 extends BRepPrimAPI_MakeCylinder {
    constructor(R: number, H: number, Angle: number);
  }

  export declare class BRepPrimAPI_MakeCylinder_3 extends BRepPrimAPI_MakeCylinder {
    constructor(Axes: gp_Ax2, R: number, H: number);
  }

  export declare class BRepPrimAPI_MakeCylinder_4 extends BRepPrimAPI_MakeCylinder {
    constructor(Axes: gp_Ax2, R: number, H: number, Angle: number);
  }

export declare class BRepPrimAPI_MakeOneAxis extends BRepBuilderAPI_MakeShape {
  Build(theRange: Message_ProgressRange): void;
  Face(): TopoDS_Face;
  Shell(): TopoDS_Shell;
  Solid(): TopoDS_Solid;
  delete(): void;
}

export declare class BRepPrimAPI_MakeBox extends BRepBuilderAPI_MakeShape {
  Init_1(theDX: number, theDY: number, theDZ: number): void;
  Init_2(thePnt: gp_Pnt, theDX: number, theDY: number, theDZ: number): void;
  Init_3(thePnt1: gp_Pnt, thePnt2: gp_Pnt): void;
  Init_4(theAxes: gp_Ax2, theDX: number, theDY: number, theDZ: number): void;
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
    constructor(dx: number, dy: number, dz: number);
  }

  export declare class BRepPrimAPI_MakeBox_3 extends BRepPrimAPI_MakeBox {
    constructor(P: gp_Pnt, dx: number, dy: number, dz: number);
  }

  export declare class BRepPrimAPI_MakeBox_4 extends BRepPrimAPI_MakeBox {
    constructor(P1: gp_Pnt, P2: gp_Pnt);
  }

  export declare class BRepPrimAPI_MakeBox_5 extends BRepPrimAPI_MakeBox {
    constructor(Axes: gp_Ax2, dx: number, dy: number, dz: number);
  }

export declare class HLRBRep_InternalAlgo extends Standard_Transient {
  Projector_1(P: HLRAlgo_Projector): void;
  Projector_2(): HLRAlgo_Projector;
  Update(): void;
  Load_1(S: HLRTopoBRep_OutLiner, SData: Standard_Transient, nbIso: number): void;
  Load_2(S: HLRTopoBRep_OutLiner, nbIso: number): void;
  Index(S: HLRTopoBRep_OutLiner): number;
  Remove(I: number): void;
  ShapeData(I: number, SData: Standard_Transient): void;
  SeqOfShapeBounds(): any;
  NbShapes(): number;
  ShapeBounds(I: number): HLRBRep_ShapeBounds;
  InitEdgeStatus(): void;
  Select_1(): void;
  Select_2(I: number): void;
  SelectEdge(I: number): void;
  SelectFace(I: number): void;
  ShowAll_1(): void;
  ShowAll_2(I: number): void;
  HideAll_1(): void;
  HideAll_2(I: number): void;
  PartialHide(): void;
  Hide_1(): void;
  Hide_2(I: number): void;
  Hide_3(I: number, J: number): void;
  Debug_1(deb: boolean): void;
  Debug_2(): boolean;
  DataStructure(): HLRBRep_Data;
  static get_type_name(): string;
  static get_type_descriptor(): Standard_Type;
  DynamicType(): Standard_Type;
  delete(): void;
}

  export declare class HLRBRep_InternalAlgo_1 extends HLRBRep_InternalAlgo {
    constructor();
  }

  export declare class HLRBRep_InternalAlgo_2 extends HLRBRep_InternalAlgo {
    constructor(A: HLRBRep_InternalAlgo);
  }

export declare class HLRBRep_Algo extends HLRBRep_InternalAlgo {
  Add_1(S: TopoDS_Shape, SData: Standard_Transient, nbIso: number): void;
  Add_2(S: TopoDS_Shape, nbIso: number): void;
  Index(S: TopoDS_Shape): number;
  OutLinedShapeNullify(): void;
  static get_type_name(): string;
  static get_type_descriptor(): Standard_Type;
  DynamicType(): Standard_Type;
  delete(): void;
}

  export declare class HLRBRep_Algo_1 extends HLRBRep_Algo {
    constructor();
  }

  export declare class HLRBRep_Algo_2 extends HLRBRep_Algo {
    constructor(A: HLRBRep_Algo);
  }

export declare class HLRBRep_HLRToShape {
  constructor(A: HLRBRep_Algo)
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
  CompoundOfEdges_1(type: HLRBRep_TypeOfResultingEdge, visible: boolean, In3d: boolean): TopoDS_Shape;
  CompoundOfEdges_2(S: TopoDS_Shape, type: HLRBRep_TypeOfResultingEdge, visible: boolean, In3d: boolean): TopoDS_Shape;
  delete(): void;
}

export declare class HLRAlgo_Projector {
  Set(T: gp_Trsf, Persp: boolean, Focus: number): void;
  Directions(D1: gp_Vec2d, D2: gp_Vec2d, D3: gp_Vec2d): void;
  Scaled(On: boolean): void;
  Perspective(): boolean;
  Transformation(): gp_Trsf;
  InvertedTransformation(): gp_Trsf;
  FullTransformation(): gp_Trsf;
  Focus(): number;
  Transform_1(D: gp_Vec): void;
  Transform_2(Pnt: gp_Pnt): void;
  Project_1(P: gp_Pnt, Pout: gp_Pnt2d): void;
  Project_2(P: gp_Pnt, X: number, Y: number, Z: number): void;
  Project_3(P: gp_Pnt, D1: gp_Vec, Pout: gp_Pnt2d, D1out: gp_Vec2d): void;
  Shoot(X: number, Y: number): gp_Lin;
  delete(): void;
}

  export declare class HLRAlgo_Projector_1 extends HLRAlgo_Projector {
    constructor();
  }

  export declare class HLRAlgo_Projector_2 extends HLRAlgo_Projector {
    constructor(CS: gp_Ax2);
  }

  export declare class HLRAlgo_Projector_3 extends HLRAlgo_Projector {
    constructor(CS: gp_Ax2, Focus: number);
  }

  export declare class HLRAlgo_Projector_4 extends HLRAlgo_Projector {
    constructor(T: gp_Trsf, Persp: boolean, Focus: number);
  }

  export declare class HLRAlgo_Projector_5 extends HLRAlgo_Projector {
    constructor(T: gp_Trsf, Persp: boolean, Focus: number, v1: gp_Vec2d, v2: gp_Vec2d, v3: gp_Vec2d);
  }

export declare type BRepOffset_Mode = {
  BRepOffset_Skin: {};
  BRepOffset_Pipe: {};
  BRepOffset_RectoVerso: {};
}

export declare class BRepOffsetAPI_MakeThickSolid extends BRepOffsetAPI_MakeOffsetShape {
  constructor()
  MakeThickSolidBySimple(theS: TopoDS_Shape, theOffsetValue: number): void;
  MakeThickSolidByJoin(S: TopoDS_Shape, ClosingFaces: TopTools_ListOfShape, Offset: number, Tol: number, Mode: BRepOffset_Mode, Intersection: boolean, SelfInter: boolean, Join: GeomAbs_JoinType, RemoveIntEdges: boolean, theRange: Message_ProgressRange): void;
  Build(theRange: Message_ProgressRange): void;
  Modified(S: TopoDS_Shape): TopTools_ListOfShape;
  delete(): void;
}

export declare class BRepOffsetAPI_MakeFilling extends BRepBuilderAPI_MakeShape {
  constructor(Degree: number, NbPtsOnCur: number, NbIter: number, Anisotropie: boolean, Tol2d: number, Tol3d: number, TolAng: number, TolCurv: number, MaxDeg: number, MaxSegments: number)
  SetConstrParam(Tol2d: number, Tol3d: number, TolAng: number, TolCurv: number): void;
  SetResolParam(Degree: number, NbPtsOnCur: number, NbIter: number, Anisotropie: boolean): void;
  SetApproxParam(MaxDeg: number, MaxSegments: number): void;
  LoadInitSurface(Surf: TopoDS_Face): void;
  Add_1(Constr: TopoDS_Edge, Order: GeomAbs_Shape, IsBound: boolean): number;
  Add_2(Constr: TopoDS_Edge, Support: TopoDS_Face, Order: GeomAbs_Shape, IsBound: boolean): number;
  Add_3(Support: TopoDS_Face, Order: GeomAbs_Shape): number;
  Add_4(Point: gp_Pnt): number;
  Add_5(U: number, V: number, Support: TopoDS_Face, Order: GeomAbs_Shape): number;
  Build(theRange: Message_ProgressRange): void;
  IsDone(): boolean;
  Generated(S: TopoDS_Shape): TopTools_ListOfShape;
  G0Error_1(): number;
  G1Error_1(): number;
  G2Error_1(): number;
  G0Error_2(Index: number): number;
  G1Error_2(Index: number): number;
  G2Error_2(Index: number): number;
  delete(): void;
}

export declare class BRepOffsetAPI_MakeOffsetShape extends BRepBuilderAPI_MakeShape {
  constructor()
  PerformBySimple(theS: TopoDS_Shape, theOffsetValue: number): void;
  PerformByJoin(S: TopoDS_Shape, Offset: number, Tol: number, Mode: BRepOffset_Mode, Intersection: boolean, SelfInter: boolean, Join: GeomAbs_JoinType, RemoveIntEdges: boolean, theRange: Message_ProgressRange): void;
  MakeOffset(): BRepOffset_MakeOffset;
  Build(theRange: Message_ProgressRange): void;
  Generated(S: TopoDS_Shape): TopTools_ListOfShape;
  Modified(S: TopoDS_Shape): TopTools_ListOfShape;
  IsDeleted(S: TopoDS_Shape): boolean;
  GetJoinType(): GeomAbs_JoinType;
  delete(): void;
}

export declare class BRepOffsetAPI_ThruSections extends BRepBuilderAPI_MakeShape {
  constructor(isSolid: boolean, ruled: boolean, pres3d: number)
  Init(isSolid: boolean, ruled: boolean, pres3d: number): void;
  AddWire(wire: TopoDS_Wire): void;
  AddVertex(aVertex: TopoDS_Vertex): void;
  CheckCompatibility(check: boolean): void;
  SetSmoothing(UseSmoothing: boolean): void;
  SetParType(ParType: Approx_ParametrizationType): void;
  SetContinuity(C: GeomAbs_Shape): void;
  SetCriteriumWeight(W1: number, W2: number, W3: number): void;
  SetMaxDegree(MaxDeg: number): void;
  ParType(): Approx_ParametrizationType;
  Continuity(): GeomAbs_Shape;
  MaxDegree(): number;
  UseSmoothing(): boolean;
  CriteriumWeight(W1: number, W2: number, W3: number): void;
  Build(theRange: Message_ProgressRange): void;
  FirstShape(): TopoDS_Shape;
  LastShape(): TopoDS_Shape;
  GeneratedFace(Edge: TopoDS_Shape): TopoDS_Shape;
  SetMutableInput(theIsMutableInput: boolean): void;
  Generated(S: TopoDS_Shape): TopTools_ListOfShape;
  Wires(): TopTools_ListOfShape;
  IsMutableInput(): boolean;
  GetStatus(): BRepFill_ThruSectionErrorStatus;
  delete(): void;
}

export declare class BRepOffsetAPI_MakeOffset extends BRepBuilderAPI_MakeShape {
  Init_1(Spine: TopoDS_Face, Join: GeomAbs_JoinType, IsOpenResult: boolean): void;
  Init_2(Join: GeomAbs_JoinType, IsOpenResult: boolean): void;
  SetApprox(ToApprox: boolean): void;
  AddWire(Spine: TopoDS_Wire): void;
  Perform(Offset: number, Alt: number): void;
  Build(theRange: Message_ProgressRange): void;
  Generated(S: TopoDS_Shape): TopTools_ListOfShape;
  static ConvertFace(theFace: TopoDS_Face, theAngleTolerance: number): TopoDS_Face;
  delete(): void;
}

  export declare class BRepOffsetAPI_MakeOffset_1 extends BRepOffsetAPI_MakeOffset {
    constructor();
  }

  export declare class BRepOffsetAPI_MakeOffset_2 extends BRepOffsetAPI_MakeOffset {
    constructor(Spine: TopoDS_Face, Join: GeomAbs_JoinType, IsOpenResult: boolean);
  }

  export declare class BRepOffsetAPI_MakeOffset_3 extends BRepOffsetAPI_MakeOffset {
    constructor(Spine: TopoDS_Wire, Join: GeomAbs_JoinType, IsOpenResult: boolean);
  }

export declare class BRepOffsetAPI_MakePipeShell extends BRepPrimAPI_MakeSweep {
  constructor(Spine: TopoDS_Wire)
  SetMode_1(IsFrenet: boolean): void;
  SetDiscreteMode(): void;
  SetMode_2(Axe: gp_Ax2): void;
  SetMode_3(BiNormal: gp_Dir): void;
  SetMode_4(SpineSupport: TopoDS_Shape): boolean;
  SetMode_5(AuxiliarySpine: TopoDS_Wire, CurvilinearEquivalence: boolean, KeepContact: BRepFill_TypeOfContact): void;
  Add_1(Profile: TopoDS_Shape, WithContact: boolean, WithCorrection: boolean): void;
  Add_2(Profile: TopoDS_Shape, Location: TopoDS_Vertex, WithContact: boolean, WithCorrection: boolean): void;
  SetLaw_1(Profile: TopoDS_Shape, L: Law_Function, WithContact: boolean, WithCorrection: boolean): void;
  SetLaw_2(Profile: TopoDS_Shape, L: Law_Function, Location: TopoDS_Vertex, WithContact: boolean, WithCorrection: boolean): void;
  Delete(Profile: TopoDS_Shape): void;
  IsReady(): boolean;
  GetStatus(): BRepBuilderAPI_PipeError;
  SetTolerance(Tol3d: number, BoundTol: number, TolAngular: number): void;
  SetMaxDegree(NewMaxDegree: number): void;
  SetMaxSegments(NewMaxSegments: number): void;
  SetForceApproxC1(ForceApproxC1: boolean): void;
  SetTransitionMode(Mode: BRepBuilderAPI_TransitionMode): void;
  Simulate(NumberOfSection: number, Result: TopTools_ListOfShape): void;
  Build(theRange: Message_ProgressRange): void;
  MakeSolid(): boolean;
  FirstShape(): TopoDS_Shape;
  LastShape(): TopoDS_Shape;
  Generated(S: TopoDS_Shape): TopTools_ListOfShape;
  ErrorOnSurface(): number;
  SetIsBuildHistory(theIsBuildHistory: boolean): void;
  IsBuildHistory(): boolean;
  Profiles(theProfiles: TopTools_ListOfShape): void;
  Spine(): TopoDS_Wire;
  delete(): void;
}

export declare class BRepExtrema_DistShapeShape {
  SetDeflection(theDeflection: number): void;
  LoadS1(Shape1: TopoDS_Shape): void;
  LoadS2(Shape1: TopoDS_Shape): void;
  Perform(theRange: Message_ProgressRange): boolean;
  IsDone(): boolean;
  NbSolution(): number;
  Value(): number;
  InnerSolution(): boolean;
  PointOnShape1(N: number): gp_Pnt;
  PointOnShape2(N: number): gp_Pnt;
  SupportTypeShape1(N: number): BRepExtrema_SupportType;
  SupportTypeShape2(N: number): BRepExtrema_SupportType;
  SupportOnShape1(N: number): TopoDS_Shape;
  SupportOnShape2(N: number): TopoDS_Shape;
  ParOnEdgeS1(N: number, t: number): void;
  ParOnEdgeS2(N: number, t: number): void;
  ParOnFaceS1(N: number, u: number, v: number): void;
  ParOnFaceS2(N: number, u: number, v: number): void;
  SetFlag(F: Extrema_ExtFlag): void;
  SetAlgo(A: Extrema_ExtAlgo): void;
  SetMultiThread(theIsMultiThread: boolean): void;
  IsMultiThread(): boolean;
  delete(): void;
}

  export declare class BRepExtrema_DistShapeShape_1 extends BRepExtrema_DistShapeShape {
    constructor();
  }

  export declare class BRepExtrema_DistShapeShape_2 extends BRepExtrema_DistShapeShape {
    constructor(Shape1: TopoDS_Shape, Shape2: TopoDS_Shape, F: Extrema_ExtFlag, A: Extrema_ExtAlgo, theRange: Message_ProgressRange);
  }

  export declare class BRepExtrema_DistShapeShape_3 extends BRepExtrema_DistShapeShape {
    constructor(Shape1: TopoDS_Shape, Shape2: TopoDS_Shape, theDeflection: number, F: Extrema_ExtFlag, A: Extrema_ExtAlgo, theRange: Message_ProgressRange);
  }

export declare class BRepBndLib {
  constructor();
  static Add(S: TopoDS_Shape, B: Bnd_Box, useTriangulation: boolean): void;
  static AddClose(S: TopoDS_Shape, B: Bnd_Box): void;
  static AddOptimal(S: TopoDS_Shape, B: Bnd_Box, useTriangulation: boolean, useShapeTolerance: boolean): void;
  static AddOBB(theS: TopoDS_Shape, theOBB: Bnd_OBB, theIsTriangulationUsed: boolean, theIsOptimal: boolean, theIsShapeToleranceUsed: boolean): void;
  delete(): void;
}

export declare type BRepBuilderAPI_WireError = {
  BRepBuilderAPI_WireDone: {};
  BRepBuilderAPI_EmptyWire: {};
  BRepBuilderAPI_DisconnectedWire: {};
  BRepBuilderAPI_NonManifoldWire: {};
}

export declare class BRepBuilderAPI_MakeEdge extends BRepBuilderAPI_MakeShape {
  Init_1(C: Geom_Curve): void;
  Init_2(C: Geom_Curve, p1: number, p2: number): void;
  Init_3(C: Geom_Curve, P1: gp_Pnt, P2: gp_Pnt): void;
  Init_4(C: Geom_Curve, V1: TopoDS_Vertex, V2: TopoDS_Vertex): void;
  Init_5(C: Geom_Curve, P1: gp_Pnt, P2: gp_Pnt, p1: number, p2: number): void;
  Init_6(C: Geom_Curve, V1: TopoDS_Vertex, V2: TopoDS_Vertex, p1: number, p2: number): void;
  Init_7(C: Geom2d_Curve, S: Geom_Surface): void;
  Init_8(C: Geom2d_Curve, S: Geom_Surface, p1: number, p2: number): void;
  Init_9(C: Geom2d_Curve, S: Geom_Surface, P1: gp_Pnt, P2: gp_Pnt): void;
  Init_10(C: Geom2d_Curve, S: Geom_Surface, V1: TopoDS_Vertex, V2: TopoDS_Vertex): void;
  Init_11(C: Geom2d_Curve, S: Geom_Surface, P1: gp_Pnt, P2: gp_Pnt, p1: number, p2: number): void;
  Init_12(C: Geom2d_Curve, S: Geom_Surface, V1: TopoDS_Vertex, V2: TopoDS_Vertex, p1: number, p2: number): void;
  IsDone(): boolean;
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
    constructor(L: gp_Lin, p1: number, p2: number);
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
    constructor(L: gp_Circ, p1: number, p2: number);
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
    constructor(L: gp_Elips, p1: number, p2: number);
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
    constructor(L: gp_Hypr, p1: number, p2: number);
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
    constructor(L: gp_Parab, p1: number, p2: number);
  }

  export declare class BRepBuilderAPI_MakeEdge_22 extends BRepBuilderAPI_MakeEdge {
    constructor(L: gp_Parab, P1: gp_Pnt, P2: gp_Pnt);
  }

  export declare class BRepBuilderAPI_MakeEdge_23 extends BRepBuilderAPI_MakeEdge {
    constructor(L: gp_Parab, V1: TopoDS_Vertex, V2: TopoDS_Vertex);
  }

  export declare class BRepBuilderAPI_MakeEdge_24 extends BRepBuilderAPI_MakeEdge {
    constructor(L: Geom_Curve);
  }

  export declare class BRepBuilderAPI_MakeEdge_25 extends BRepBuilderAPI_MakeEdge {
    constructor(L: Geom_Curve, p1: number, p2: number);
  }

  export declare class BRepBuilderAPI_MakeEdge_26 extends BRepBuilderAPI_MakeEdge {
    constructor(L: Geom_Curve, P1: gp_Pnt, P2: gp_Pnt);
  }

  export declare class BRepBuilderAPI_MakeEdge_27 extends BRepBuilderAPI_MakeEdge {
    constructor(L: Geom_Curve, V1: TopoDS_Vertex, V2: TopoDS_Vertex);
  }

  export declare class BRepBuilderAPI_MakeEdge_28 extends BRepBuilderAPI_MakeEdge {
    constructor(L: Geom_Curve, P1: gp_Pnt, P2: gp_Pnt, p1: number, p2: number);
  }

  export declare class BRepBuilderAPI_MakeEdge_29 extends BRepBuilderAPI_MakeEdge {
    constructor(L: Geom_Curve, V1: TopoDS_Vertex, V2: TopoDS_Vertex, p1: number, p2: number);
  }

  export declare class BRepBuilderAPI_MakeEdge_30 extends BRepBuilderAPI_MakeEdge {
    constructor(L: Geom2d_Curve, S: Geom_Surface);
  }

  export declare class BRepBuilderAPI_MakeEdge_31 extends BRepBuilderAPI_MakeEdge {
    constructor(L: Geom2d_Curve, S: Geom_Surface, p1: number, p2: number);
  }

  export declare class BRepBuilderAPI_MakeEdge_32 extends BRepBuilderAPI_MakeEdge {
    constructor(L: Geom2d_Curve, S: Geom_Surface, P1: gp_Pnt, P2: gp_Pnt);
  }

  export declare class BRepBuilderAPI_MakeEdge_33 extends BRepBuilderAPI_MakeEdge {
    constructor(L: Geom2d_Curve, S: Geom_Surface, V1: TopoDS_Vertex, V2: TopoDS_Vertex);
  }

  export declare class BRepBuilderAPI_MakeEdge_34 extends BRepBuilderAPI_MakeEdge {
    constructor(L: Geom2d_Curve, S: Geom_Surface, P1: gp_Pnt, P2: gp_Pnt, p1: number, p2: number);
  }

  export declare class BRepBuilderAPI_MakeEdge_35 extends BRepBuilderAPI_MakeEdge {
    constructor(L: Geom2d_Curve, S: Geom_Surface, V1: TopoDS_Vertex, V2: TopoDS_Vertex, p1: number, p2: number);
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
  constructor(tolerance: number, option1: boolean, option2: boolean, option3: boolean, option4: boolean)
  Init(tolerance: number, option1: boolean, option2: boolean, option3: boolean, option4: boolean): void;
  Load(shape: TopoDS_Shape): void;
  Add(shape: TopoDS_Shape): void;
  Perform(theProgress: Message_ProgressRange): void;
  SewedShape(): TopoDS_Shape;
  SetContext(theContext: BRepTools_ReShape): void;
  GetContext(): BRepTools_ReShape;
  NbFreeEdges(): number;
  FreeEdge(index: number): TopoDS_Edge;
  NbMultipleEdges(): number;
  MultipleEdge(index: number): TopoDS_Edge;
  NbContigousEdges(): number;
  ContigousEdge(index: number): TopoDS_Edge;
  ContigousEdgeCouple(index: number): TopTools_ListOfShape;
  IsSectionBound(section: TopoDS_Edge): boolean;
  SectionToBoundary(section: TopoDS_Edge): TopoDS_Edge;
  NbDegeneratedShapes(): number;
  DegeneratedShape(index: number): TopoDS_Shape;
  IsDegenerated(shape: TopoDS_Shape): boolean;
  IsModified(shape: TopoDS_Shape): boolean;
  Modified(shape: TopoDS_Shape): TopoDS_Shape;
  IsModifiedSubShape(shape: TopoDS_Shape): boolean;
  ModifiedSubShape(shape: TopoDS_Shape): TopoDS_Shape;
  Dump(): void;
  NbDeletedFaces(): number;
  DeletedFace(index: number): TopoDS_Face;
  WhichFace(theEdg: TopoDS_Edge, index: number): TopoDS_Face;
  SameParameterMode(): boolean;
  SetSameParameterMode(SameParameterMode: boolean): void;
  Tolerance(): number;
  SetTolerance(theToler: number): void;
  MinTolerance(): number;
  SetMinTolerance(theMinToler: number): void;
  MaxTolerance(): number;
  SetMaxTolerance(theMaxToler: number): void;
  FaceMode(): boolean;
  SetFaceMode(theFaceMode: boolean): void;
  FloatingEdgesMode(): boolean;
  SetFloatingEdgesMode(theFloatingEdgesMode: boolean): void;
  LocalTolerancesMode(): boolean;
  SetLocalTolerancesMode(theLocalTolerancesMode: boolean): void;
  SetNonManifoldMode(theNonManifoldMode: boolean): void;
  NonManifoldMode(): boolean;
  static get_type_name(): string;
  static get_type_descriptor(): Standard_Type;
  DynamicType(): Standard_Type;
  delete(): void;
}

export declare class BRepBuilderAPI_MakeFace extends BRepBuilderAPI_MakeShape {
  Init_1(F: TopoDS_Face): void;
  Init_2(S: Geom_Surface, Bound: boolean, TolDegen: number): void;
  Init_3(S: Geom_Surface, UMin: number, UMax: number, VMin: number, VMax: number, TolDegen: number): void;
  Add(W: TopoDS_Wire): void;
  IsDone(): boolean;
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
    constructor(S: Geom_Surface, TolDegen: number);
  }

  export declare class BRepBuilderAPI_MakeFace_9 extends BRepBuilderAPI_MakeFace {
    constructor(P: gp_Pln, UMin: number, UMax: number, VMin: number, VMax: number);
  }

  export declare class BRepBuilderAPI_MakeFace_10 extends BRepBuilderAPI_MakeFace {
    constructor(C: gp_Cylinder, UMin: number, UMax: number, VMin: number, VMax: number);
  }

  export declare class BRepBuilderAPI_MakeFace_11 extends BRepBuilderAPI_MakeFace {
    constructor(C: gp_Cone, UMin: number, UMax: number, VMin: number, VMax: number);
  }

  export declare class BRepBuilderAPI_MakeFace_12 extends BRepBuilderAPI_MakeFace {
    constructor(S: gp_Sphere, UMin: number, UMax: number, VMin: number, VMax: number);
  }

  export declare class BRepBuilderAPI_MakeFace_13 extends BRepBuilderAPI_MakeFace {
    constructor(C: gp_Torus, UMin: number, UMax: number, VMin: number, VMax: number);
  }

  export declare class BRepBuilderAPI_MakeFace_14 extends BRepBuilderAPI_MakeFace {
    constructor(S: Geom_Surface, UMin: number, UMax: number, VMin: number, VMax: number, TolDegen: number);
  }

  export declare class BRepBuilderAPI_MakeFace_15 extends BRepBuilderAPI_MakeFace {
    constructor(W: TopoDS_Wire, OnlyPlane: boolean);
  }

  export declare class BRepBuilderAPI_MakeFace_16 extends BRepBuilderAPI_MakeFace {
    constructor(P: gp_Pln, W: TopoDS_Wire, Inside: boolean);
  }

  export declare class BRepBuilderAPI_MakeFace_17 extends BRepBuilderAPI_MakeFace {
    constructor(C: gp_Cylinder, W: TopoDS_Wire, Inside: boolean);
  }

  export declare class BRepBuilderAPI_MakeFace_18 extends BRepBuilderAPI_MakeFace {
    constructor(C: gp_Cone, W: TopoDS_Wire, Inside: boolean);
  }

  export declare class BRepBuilderAPI_MakeFace_19 extends BRepBuilderAPI_MakeFace {
    constructor(S: gp_Sphere, W: TopoDS_Wire, Inside: boolean);
  }

  export declare class BRepBuilderAPI_MakeFace_20 extends BRepBuilderAPI_MakeFace {
    constructor(C: gp_Torus, W: TopoDS_Wire, Inside: boolean);
  }

  export declare class BRepBuilderAPI_MakeFace_21 extends BRepBuilderAPI_MakeFace {
    constructor(S: Geom_Surface, W: TopoDS_Wire, Inside: boolean);
  }

  export declare class BRepBuilderAPI_MakeFace_22 extends BRepBuilderAPI_MakeFace {
    constructor(F: TopoDS_Face, W: TopoDS_Wire);
  }

export declare class BRepBuilderAPI_Transform extends BRepBuilderAPI_ModifyShape {
  Perform(theShape: TopoDS_Shape, theCopyGeom: boolean, theCopyMesh: boolean): void;
  ModifiedShape(S: TopoDS_Shape): TopoDS_Shape;
  Modified(S: TopoDS_Shape): TopTools_ListOfShape;
  delete(): void;
}

  export declare class BRepBuilderAPI_Transform_1 extends BRepBuilderAPI_Transform {
    constructor(T: gp_Trsf);
  }

  export declare class BRepBuilderAPI_Transform_2 extends BRepBuilderAPI_Transform {
    constructor(theShape: TopoDS_Shape, theTrsf: gp_Trsf, theCopyGeom: boolean, theCopyMesh: boolean);
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
  IsDeleted(S: TopoDS_Shape): boolean;
  delete(): void;
}

export declare class BRepBuilderAPI_MakeWire extends BRepBuilderAPI_MakeShape {
  Add_1(E: TopoDS_Edge): void;
  Add_2(W: TopoDS_Wire): void;
  Add_3(L: TopTools_ListOfShape): void;
  IsDone(): boolean;
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
  Init(S: Geom_Surface, UMin: number, UMax: number, VMin: number, VMax: number, Segment: boolean): void;
  IsDone(): boolean;
  Error(): BRepBuilderAPI_ShellError;
  Shell(): TopoDS_Shell;
  delete(): void;
}

  export declare class BRepBuilderAPI_MakeShell_1 extends BRepBuilderAPI_MakeShell {
    constructor();
  }

  export declare class BRepBuilderAPI_MakeShell_2 extends BRepBuilderAPI_MakeShell {
    constructor(S: Geom_Surface, Segment: boolean);
  }

  export declare class BRepBuilderAPI_MakeShell_3 extends BRepBuilderAPI_MakeShell {
    constructor(S: Geom_Surface, UMin: number, UMax: number, VMin: number, VMax: number, Segment: boolean);
  }

export declare class BRepBuilderAPI_MakeSolid extends BRepBuilderAPI_MakeShape {
  Add(S: TopoDS_Shell): void;
  IsDone(): boolean;
  Solid(): TopoDS_Solid;
  IsDeleted(S: TopoDS_Shape): boolean;
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
  IsDone(): boolean;
  Check(): void;
  delete(): void;
}

export declare class BRepLib {
  constructor();
  static Precision_1(P: number): void;
  static Precision_2(): number;
  static Plane_1(P: Geom_Plane): void;
  static Plane_2(): Geom_Plane;
  static CheckSameRange(E: TopoDS_Edge, Confusion: number): boolean;
  static SameRange(E: TopoDS_Edge, Tolerance: number): void;
  static BuildCurve3d(E: TopoDS_Edge, Tolerance: number, Continuity: GeomAbs_Shape, MaxDegree: number, MaxSegment: number): boolean;
  static BuildCurves3d_1(S: TopoDS_Shape, Tolerance: number, Continuity: GeomAbs_Shape, MaxDegree: number, MaxSegment: number): boolean;
  static BuildCurves3d_2(S: TopoDS_Shape): boolean;
  static BuildPCurveForEdgeOnPlane_1(theE: TopoDS_Edge, theF: TopoDS_Face): void;
  static BuildPCurveForEdgeOnPlane_2(theE: TopoDS_Edge, theF: TopoDS_Face, aC2D: Geom2d_Curve, bToUpdate: boolean): void;
  static UpdateEdgeTol(E: TopoDS_Edge, MinToleranceRequest: number, MaxToleranceToCheck: number): boolean;
  static UpdateEdgeTolerance(S: TopoDS_Shape, MinToleranceRequest: number, MaxToleranceToCheck: number): boolean;
  static SameParameter_1(theEdge: TopoDS_Edge, Tolerance: number): void;
  static SameParameter_2(theEdge: TopoDS_Edge, theTolerance: number, theNewTol: number, IsUseOldEdge: boolean): TopoDS_Edge;
  static SameParameter_3(S: TopoDS_Shape, Tolerance: number, forced: boolean): void;
  static SameParameter_4(S: TopoDS_Shape, theReshaper: BRepTools_ReShape, Tolerance: number, forced: boolean): void;
  static UpdateTolerances_1(S: TopoDS_Shape, verifyFaceTolerance: boolean): void;
  static UpdateTolerances_2(S: TopoDS_Shape, theReshaper: BRepTools_ReShape, verifyFaceTolerance: boolean): void;
  static UpdateInnerTolerances(S: TopoDS_Shape): void;
  static OrientClosedSolid(solid: TopoDS_Solid): boolean;
  static ContinuityOfFaces(theEdge: TopoDS_Edge, theFace1: TopoDS_Face, theFace2: TopoDS_Face, theAngleTol: number): GeomAbs_Shape;
  static EncodeRegularity_1(S: TopoDS_Shape, TolAng: number): void;
  static EncodeRegularity_2(S: TopoDS_Shape, LE: TopTools_ListOfShape, TolAng: number): void;
  static EncodeRegularity_3(E: TopoDS_Edge, F1: TopoDS_Face, F2: TopoDS_Face, TolAng: number): void;
  static SortFaces(S: TopoDS_Shape, LF: TopTools_ListOfShape): void;
  static ReverseSortFaces(S: TopoDS_Shape, LF: TopTools_ListOfShape): void;
  static EnsureNormalConsistency(S: TopoDS_Shape, theAngTol: number, ForceComputeNormals: boolean): boolean;
  static UpdateDeflection(S: TopoDS_Shape): void;
  static BoundingVertex(theLV: TopTools_ListOfShape, theNewCenter: gp_Pnt, theNewTol: number): void;
  static FindValidRange_1(theCurve: Adaptor3d_Curve, theTolE: number, theParV1: number, thePntV1: gp_Pnt, theTolV1: number, theParV2: number, thePntV2: gp_Pnt, theTolV2: number, theFirst: number, theLast: number): boolean;
  static FindValidRange_2(theEdge: TopoDS_Edge, theFirst: number, theLast: number): boolean;
  static ExtendFace(theF: TopoDS_Face, theExtVal: number, theExtUMin: boolean, theExtUMax: boolean, theExtVMin: boolean, theExtVMax: boolean, theFExtended: TopoDS_Face): void;
  delete(): void;
}

export declare class BRepGProp {
  constructor();
  static LinearProperties(S: TopoDS_Shape, LProps: GProp_GProps, SkipShared: boolean, UseTriangulation: boolean): void;
  static SurfaceProperties_1(S: TopoDS_Shape, SProps: GProp_GProps, SkipShared: boolean, UseTriangulation: boolean): void;
  static SurfaceProperties_2(S: TopoDS_Shape, SProps: GProp_GProps, Eps: number, SkipShared: boolean): number;
  static VolumeProperties_1(S: TopoDS_Shape, VProps: GProp_GProps, OnlyClosed: boolean, SkipShared: boolean, UseTriangulation: boolean): void;
  static VolumeProperties_2(S: TopoDS_Shape, VProps: GProp_GProps, Eps: number, OnlyClosed: boolean, SkipShared: boolean): number;
  static VolumePropertiesGK_1(S: TopoDS_Shape, VProps: GProp_GProps, Eps: number, OnlyClosed: boolean, IsUseSpan: boolean, CGFlag: boolean, IFlag: boolean, SkipShared: boolean): number;
  static VolumePropertiesGK_2(S: TopoDS_Shape, VProps: GProp_GProps, thePln: gp_Pln, Eps: number, OnlyClosed: boolean, IsUseSpan: boolean, CGFlag: boolean, IFlag: boolean, SkipShared: boolean): number;
  delete(): void;
}

export declare class BRepGProp_Face {
  Load_1(F: TopoDS_Face): void;
  VIntegrationOrder(): number;
  NaturalRestriction(): boolean;
  GetFace(): TopoDS_Face;
  Value2d(U: number): gp_Pnt2d;
  SIntOrder(Eps: number): number;
  SVIntSubs(): number;
  SUIntSubs(): number;
  UKnots(Knots: TColStd_Array1OfReal): void;
  VKnots(Knots: TColStd_Array1OfReal): void;
  LIntOrder(Eps: number): number;
  LIntSubs(): number;
  LKnots(Knots: TColStd_Array1OfReal): void;
  UIntegrationOrder(): number;
  Bounds(U1: number, U2: number, V1: number, V2: number): void;
  Normal(U: number, V: number, P: gp_Pnt, VNor: gp_Vec): void;
  Load_2(E: TopoDS_Edge): boolean;
  FirstParameter(): number;
  LastParameter(): number;
  IntegrationOrder(): number;
  D12d(U: number, P: gp_Pnt2d, V1: gp_Vec2d): void;
  Load_3(IsFirstParam: boolean, theIsoType: GeomAbs_IsoType): void;
  GetUKnots(theUMin: number, theUMax: number, theUKnots: NCollection_HArray1<double>): void;
  GetTKnots(theTMin: number, theTMax: number, theTKnots: NCollection_HArray1<double>): void;
  delete(): void;
}

  export declare class BRepGProp_Face_1 extends BRepGProp_Face {
    constructor(IsUseSpan: boolean);
  }

  export declare class BRepGProp_Face_2 extends BRepGProp_Face {
    constructor(F: TopoDS_Face, IsUseSpan: boolean);
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
  Add_2(Dis: number, E: TopoDS_Edge): void;
  SetDist(Dis: number, IC: number, F: TopoDS_Face): void;
  GetDist(IC: number, Dis: number): void;
  Add_3(Dis1: number, Dis2: number, E: TopoDS_Edge, F: TopoDS_Face): void;
  SetDists(Dis1: number, Dis2: number, IC: number, F: TopoDS_Face): void;
  Dists(IC: number, Dis1: number, Dis2: number): void;
  AddDA(Dis: number, Angle: number, E: TopoDS_Edge, F: TopoDS_Face): void;
  SetDistAngle(Dis: number, Angle: number, IC: number, F: TopoDS_Face): void;
  GetDistAngle(IC: number, Dis: number, Angle: number): void;
  SetMode(theMode: ChFiDS_ChamfMode): void;
  IsSymetric(IC: number): boolean;
  IsTwoDistances(IC: number): boolean;
  IsDistanceAngle(IC: number): boolean;
  ResetContour(IC: number): void;
  NbContours(): number;
  Contour(E: TopoDS_Edge): number;
  NbEdges(I: number): number;
  Edge(I: number, J: number): TopoDS_Edge;
  Remove(E: TopoDS_Edge): void;
  Length(IC: number): number;
  FirstVertex(IC: number): TopoDS_Vertex;
  LastVertex(IC: number): TopoDS_Vertex;
  Abscissa(IC: number, V: TopoDS_Vertex): number;
  RelativeAbscissa(IC: number, V: TopoDS_Vertex): number;
  ClosedAndTangent(IC: number): boolean;
  Closed(IC: number): boolean;
  Build(theRange: Message_ProgressRange): void;
  Reset(): void;
  Builder(): TopOpeBRepBuild_HBuilder;
  Generated(EorV: TopoDS_Shape): TopTools_ListOfShape;
  Modified(F: TopoDS_Shape): TopTools_ListOfShape;
  IsDeleted(F: TopoDS_Shape): boolean;
  Simulate(IC: number): void;
  NbSurf(IC: number): number;
  Sect(IC: number, IS: number): NCollection_HArray1<ChFiDS_CircSection>;
  delete(): void;
}

export declare class BRepFilletAPI_MakeFillet extends BRepFilletAPI_LocalOperation {
  constructor(S: TopoDS_Shape, FShape: ChFi3d_FilletShape)
  SetParams(Tang: number, Tesp: number, T2d: number, TApp3d: number, TolApp2d: number, Fleche: number): void;
  SetContinuity(InternalContinuity: GeomAbs_Shape, AngularTolerance: number): void;
  Add_1(E: TopoDS_Edge): void;
  Add_2(Radius: number, E: TopoDS_Edge): void;
  Add_3(R1: number, R2: number, E: TopoDS_Edge): void;
  Add_4(L: Law_Function, E: TopoDS_Edge): void;
  Add_5(UandR: TColgp_Array1OfPnt2d, E: TopoDS_Edge): void;
  SetRadius_1(Radius: number, IC: number, IinC: number): void;
  SetRadius_2(R1: number, R2: number, IC: number, IinC: number): void;
  SetRadius_3(L: Law_Function, IC: number, IinC: number): void;
  SetRadius_4(UandR: TColgp_Array1OfPnt2d, IC: number, IinC: number): void;
  ResetContour(IC: number): void;
  IsConstant_1(IC: number): boolean;
  Radius_1(IC: number): number;
  IsConstant_2(IC: number, E: TopoDS_Edge): boolean;
  Radius_2(IC: number, E: TopoDS_Edge): number;
  SetRadius_5(Radius: number, IC: number, E: TopoDS_Edge): void;
  SetRadius_6(Radius: number, IC: number, V: TopoDS_Vertex): void;
  GetBounds(IC: number, E: TopoDS_Edge, F: number, L: number): boolean;
  GetLaw(IC: number, E: TopoDS_Edge): Law_Function;
  SetLaw(IC: number, E: TopoDS_Edge, L: Law_Function): void;
  SetFilletShape(FShape: ChFi3d_FilletShape): void;
  GetFilletShape(): ChFi3d_FilletShape;
  NbContours(): number;
  Contour(E: TopoDS_Edge): number;
  NbEdges(I: number): number;
  Edge(I: number, J: number): TopoDS_Edge;
  Remove(E: TopoDS_Edge): void;
  Length(IC: number): number;
  FirstVertex(IC: number): TopoDS_Vertex;
  LastVertex(IC: number): TopoDS_Vertex;
  Abscissa(IC: number, V: TopoDS_Vertex): number;
  RelativeAbscissa(IC: number, V: TopoDS_Vertex): number;
  ClosedAndTangent(IC: number): boolean;
  Closed(IC: number): boolean;
  Build(theRange: Message_ProgressRange): void;
  Reset(): void;
  Builder(): TopOpeBRepBuild_HBuilder;
  Generated(EorV: TopoDS_Shape): TopTools_ListOfShape;
  Modified(F: TopoDS_Shape): TopTools_ListOfShape;
  IsDeleted(F: TopoDS_Shape): boolean;
  NbSurfaces(): number;
  NewFaces(I: number): TopTools_ListOfShape;
  Simulate(IC: number): void;
  NbSurf(IC: number): number;
  Sect(IC: number, IS: number): NCollection_HArray1<ChFiDS_CircSection>;
  NbFaultyContours(): number;
  FaultyContour(I: number): number;
  NbComputedSurfaces(IC: number): number;
  ComputedSurface(IC: number, IS: number): Geom_Surface;
  NbFaultyVertices(): number;
  FaultyVertex(IV: number): TopoDS_Vertex;
  HasResult(): boolean;
  BadShape(): TopoDS_Shape;
  StripeStatus(IC: number): ChFiDS_ErrorStatus;
  delete(): void;
}

export declare class BRepFilletAPI_LocalOperation extends BRepBuilderAPI_MakeShape {
  Add(E: TopoDS_Edge): void;
  ResetContour(IC: number): void;
  NbContours(): number;
  Contour(E: TopoDS_Edge): number;
  NbEdges(I: number): number;
  Edge(I: number, J: number): TopoDS_Edge;
  Remove(E: TopoDS_Edge): void;
  Length(IC: number): number;
  FirstVertex(IC: number): TopoDS_Vertex;
  LastVertex(IC: number): TopoDS_Vertex;
  Abscissa(IC: number, V: TopoDS_Vertex): number;
  RelativeAbscissa(IC: number, V: TopoDS_Vertex): number;
  ClosedAndTangent(IC: number): boolean;
  Closed(IC: number): boolean;
  Reset(): void;
  Simulate(IC: number): void;
  NbSurf(IC: number): number;
  Sect(IC: number, IS: number): NCollection_HArray1<ChFiDS_CircSection>;
  delete(): void;
}

export declare class ShapeFix_Wire extends ShapeFix_Root {
  ClearModes(): void;
  ClearStatuses(): void;
  Init_1(wire: TopoDS_Wire, face: TopoDS_Face, prec: number): void;
  Init_2(saw: ShapeAnalysis_Wire): void;
  Load_1(wire: TopoDS_Wire): void;
  Load_2(sbwd: ShapeExtend_WireData): void;
  SetFace_1(face: TopoDS_Face): void;
  SetFace_2(theFace: TopoDS_Face, theSurfaceAnalysis: ShapeAnalysis_Surface): void;
  SetSurface_1(theSurfaceAnalysis: ShapeAnalysis_Surface): void;
  SetSurface_2(surf: Geom_Surface): void;
  SetSurface_3(surf: Geom_Surface, loc: TopLoc_Location): void;
  SetPrecision(prec: number): void;
  SetMaxTailAngle(theMaxTailAngle: number): void;
  SetMaxTailWidth(theMaxTailWidth: number): void;
  IsLoaded(): boolean;
  IsReady(): boolean;
  NbEdges(): number;
  Wire(): TopoDS_Wire;
  WireAPIMake(): TopoDS_Wire;
  Analyzer(): ShapeAnalysis_Wire;
  WireData(): ShapeExtend_WireData;
  Face(): TopoDS_Face;
  ModifyTopologyMode(): boolean;
  ModifyGeometryMode(): boolean;
  ModifyRemoveLoopMode(): number;
  ClosedWireMode(): boolean;
  PreferencePCurveMode(): boolean;
  FixGapsByRangesMode(): boolean;
  FixReorderMode(): number;
  FixSmallMode(): number;
  FixConnectedMode(): number;
  FixEdgeCurvesMode(): number;
  FixDegeneratedMode(): number;
  FixSelfIntersectionMode(): number;
  FixLackingMode(): number;
  FixGaps3dMode(): number;
  FixGaps2dMode(): number;
  FixReversed2dMode(): number;
  FixRemovePCurveMode(): number;
  FixAddPCurveMode(): number;
  FixRemoveCurve3dMode(): number;
  FixAddCurve3dMode(): number;
  FixSeamMode(): number;
  FixShiftedMode(): number;
  FixSameParameterMode(): number;
  FixVertexToleranceMode(): number;
  FixNotchedEdgesMode(): number;
  FixSelfIntersectingEdgeMode(): number;
  FixIntersectingEdgesMode(): number;
  FixNonAdjacentIntersectingEdgesMode(): number;
  FixTailMode(): number;
  Perform(): boolean;
  FixReorder_1(theModeBoth: boolean): boolean;
  FixSmall_1(lockvtx: boolean, precsmall: number): number;
  FixConnected_1(prec: number): boolean;
  FixEdgeCurves(): boolean;
  FixDegenerated_1(): boolean;
  FixSelfIntersection(): boolean;
  FixLacking_1(force: boolean): boolean;
  FixClosed(prec: number): boolean;
  FixGaps3d(): boolean;
  FixGaps2d(): boolean;
  FixReorder_2(wi: ShapeAnalysis_WireOrder): boolean;
  FixSmall_2(num: number, lockvtx: boolean, precsmall: number): boolean;
  FixConnected_2(num: number, prec: number): boolean;
  FixSeam(num: number): boolean;
  FixShifted(): boolean;
  FixDegenerated_2(num: number): boolean;
  FixLacking_2(num: number, force: boolean): boolean;
  FixNotchedEdges(): boolean;
  FixGap3d(num: number, convert: boolean): boolean;
  FixGap2d(num: number, convert: boolean): boolean;
  FixTails(): boolean;
  StatusReorder(status: ShapeExtend_Status): boolean;
  StatusSmall(status: ShapeExtend_Status): boolean;
  StatusConnected(status: ShapeExtend_Status): boolean;
  StatusEdgeCurves(status: ShapeExtend_Status): boolean;
  StatusDegenerated(status: ShapeExtend_Status): boolean;
  StatusSelfIntersection(status: ShapeExtend_Status): boolean;
  StatusLacking(status: ShapeExtend_Status): boolean;
  StatusClosed(status: ShapeExtend_Status): boolean;
  StatusGaps3d(status: ShapeExtend_Status): boolean;
  StatusGaps2d(status: ShapeExtend_Status): boolean;
  StatusNotches(status: ShapeExtend_Status): boolean;
  StatusRemovedSegment(): boolean;
  StatusFixTails(status: ShapeExtend_Status): boolean;
  LastFixStatus(status: ShapeExtend_Status): boolean;
  FixEdgeTool(): ShapeFix_Edge;
  static get_type_name(): string;
  static get_type_descriptor(): Standard_Type;
  DynamicType(): Standard_Type;
  delete(): void;
}

  export declare class ShapeFix_Wire_1 extends ShapeFix_Wire {
    constructor();
  }

  export declare class ShapeFix_Wire_2 extends ShapeFix_Wire {
    constructor(wire: TopoDS_Wire, face: TopoDS_Face, prec: number);
  }

export declare class ShapeFix_Solid extends ShapeFix_Root {
  Init(solid: TopoDS_Solid): void;
  Perform(theProgress: Message_ProgressRange): boolean;
  SolidFromShell(shell: TopoDS_Shell): TopoDS_Solid;
  Status(status: ShapeExtend_Status): boolean;
  Solid(): TopoDS_Shape;
  FixShellTool(): ShapeFix_Shell;
  SetMsgRegistrator(msgreg: ShapeExtend_BasicMsgRegistrator): void;
  SetPrecision(preci: number): void;
  SetMinTolerance(mintol: number): void;
  SetMaxTolerance(maxtol: number): void;
  FixShellMode(): number;
  FixShellOrientationMode(): number;
  CreateOpenSolidMode(): boolean;
  Shape(): TopoDS_Shape;
  static get_type_name(): string;
  static get_type_descriptor(): Standard_Type;
  DynamicType(): Standard_Type;
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
  Set(Root: ShapeFix_Root): void;
  SetContext(context: ShapeBuild_ReShape): void;
  Context(): ShapeBuild_ReShape;
  SetMsgRegistrator(msgreg: ShapeExtend_BasicMsgRegistrator): void;
  MsgRegistrator(): ShapeExtend_BasicMsgRegistrator;
  SetPrecision(preci: number): void;
  Precision(): number;
  SetMinTolerance(mintol: number): void;
  MinTolerance(): number;
  SetMaxTolerance(maxtol: number): void;
  MaxTolerance(): number;
  LimitTolerance(toler: number): number;
  SendMsg_1(shape: TopoDS_Shape, message: Message_Msg, gravity: Message_Gravity): void;
  SendMsg_2(message: Message_Msg, gravity: Message_Gravity): void;
  SendWarning_1(shape: TopoDS_Shape, message: Message_Msg): void;
  SendWarning_2(message: Message_Msg): void;
  SendFail_1(shape: TopoDS_Shape, message: Message_Msg): void;
  SendFail_2(message: Message_Msg): void;
  static get_type_name(): string;
  static get_type_descriptor(): Standard_Type;
  DynamicType(): Standard_Type;
  delete(): void;
}

export declare class ShapeFix_Face extends ShapeFix_Root {
  ClearModes(): void;
  Init_1(face: TopoDS_Face): void;
  Init_2(surf: Geom_Surface, preci: number, fwd: boolean): void;
  Init_3(surf: ShapeAnalysis_Surface, preci: number, fwd: boolean): void;
  SetMsgRegistrator(msgreg: ShapeExtend_BasicMsgRegistrator): void;
  SetPrecision(preci: number): void;
  SetMinTolerance(mintol: number): void;
  SetMaxTolerance(maxtol: number): void;
  FixWireMode(): number;
  FixOrientationMode(): number;
  FixAddNaturalBoundMode(): number;
  FixMissingSeamMode(): number;
  FixSmallAreaWireMode(): number;
  RemoveSmallAreaFaceMode(): number;
  FixIntersectingWiresMode(): number;
  FixLoopWiresMode(): number;
  FixSplitFaceMode(): number;
  AutoCorrectPrecisionMode(): number;
  FixPeriodicDegeneratedMode(): number;
  Face(): TopoDS_Face;
  Result(): TopoDS_Shape;
  Add(wire: TopoDS_Wire): void;
  Perform(): boolean;
  FixOrientation_1(): boolean;
  FixOrientation_2(MapWires: any): boolean;
  FixAddNaturalBound(): boolean;
  FixMissingSeam(): boolean;
  FixSmallAreaWire(theIsRemoveSmallFace: boolean): boolean;
  FixLoopWire(aResWires: TopTools_SequenceOfShape): boolean;
  FixIntersectingWires(): boolean;
  FixWiresTwoCoincEdges(): boolean;
  FixSplitFace(MapWires: any): boolean;
  FixPeriodicDegenerated(): boolean;
  Status(status: ShapeExtend_Status): boolean;
  FixWireTool(): ShapeFix_Wire;
  static get_type_name(): string;
  static get_type_descriptor(): Standard_Type;
  DynamicType(): Standard_Type;
  delete(): void;
}

  export declare class ShapeFix_Face_1 extends ShapeFix_Face {
    constructor();
  }

  export declare class ShapeFix_Face_2 extends ShapeFix_Face {
    constructor(face: TopoDS_Face);
  }

export declare class ShapeUpgrade_UnifySameDomain extends Standard_Transient {
  Initialize(aShape: TopoDS_Shape, UnifyEdges: boolean, UnifyFaces: boolean, ConcatBSplines: boolean): void;
  AllowInternalEdges(theValue: boolean): void;
  KeepShape(theShape: TopoDS_Shape): void;
  KeepShapes(theShapes: TopTools_MapOfShape): void;
  SetSafeInputMode(theValue: boolean): void;
  SetLinearTolerance(theValue: number): void;
  SetAngularTolerance(theValue: number): void;
  Build(): void;
  Shape(): TopoDS_Shape;
  History_1(): BRepTools_History;
  History_2(): BRepTools_History;
  static get_type_name(): string;
  static get_type_descriptor(): Standard_Type;
  DynamicType(): Standard_Type;
  delete(): void;
}

  export declare class ShapeUpgrade_UnifySameDomain_1 extends ShapeUpgrade_UnifySameDomain {
    constructor();
  }

  export declare class ShapeUpgrade_UnifySameDomain_2 extends ShapeUpgrade_UnifySameDomain {
    constructor(aShape: TopoDS_Shape, UnifyEdges: boolean, UnifyFaces: boolean, ConcatBSplines: boolean);
  }

export declare class BRepFeat_Form extends BRepBuilderAPI_MakeShape {
  Modified(F: TopoDS_Shape): TopTools_ListOfShape;
  Generated(S: TopoDS_Shape): TopTools_ListOfShape;
  IsDeleted(S: TopoDS_Shape): boolean;
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
  BarycCurve(): Geom_Curve;
  CurrentStatusError(): BRepFeat_StatusError;
  delete(): void;
}

export declare class BRepFeat_MakeDPrism extends BRepFeat_Form {
  Init(Sbase: TopoDS_Shape, Pbase: TopoDS_Face, Skface: TopoDS_Face, Angle: number, Fuse: number, Modify: boolean): void;
  Add(E: TopoDS_Edge, OnFace: TopoDS_Face): void;
  Perform_1(Height: number): void;
  Perform_2(Until: TopoDS_Shape): void;
  Perform_3(From: TopoDS_Shape, Until: TopoDS_Shape): void;
  PerformUntilEnd(): void;
  PerformFromEnd(FUntil: TopoDS_Shape): void;
  PerformThruAll(): void;
  PerformUntilHeight(Until: TopoDS_Shape, Height: number): void;
  Curves(S: any): void;
  BarycCurve(): Geom_Curve;
  BossEdges(sig: number): void;
  TopEdges(): TopTools_ListOfShape;
  LatEdges(): TopTools_ListOfShape;
  delete(): void;
}

  export declare class BRepFeat_MakeDPrism_1 extends BRepFeat_MakeDPrism {
    constructor(Sbase: TopoDS_Shape, Pbase: TopoDS_Face, Skface: TopoDS_Face, Angle: number, Fuse: number, Modify: boolean);
  }

  export declare class BRepFeat_MakeDPrism_2 extends BRepFeat_MakeDPrism {
    constructor();
  }

export declare class Adaptor3d_Curve extends Standard_Transient {
  constructor();
  static get_type_name(): string;
  static get_type_descriptor(): Standard_Type;
  DynamicType(): Standard_Type;
  ShallowCopy(): Adaptor3d_Curve;
  FirstParameter(): number;
  LastParameter(): number;
  Continuity(): GeomAbs_Shape;
  NbIntervals(S: GeomAbs_Shape): number;
  Intervals(T: TColStd_Array1OfReal, S: GeomAbs_Shape): void;
  Trim(First: number, Last: number, Tol: number): Adaptor3d_Curve;
  IsClosed(): boolean;
  IsPeriodic(): boolean;
  Period(): number;
  Value(U: number): gp_Pnt;
  D0(U: number, P: gp_Pnt): void;
  D1(U: number, P: gp_Pnt, V: gp_Vec): void;
  D2(U: number, P: gp_Pnt, V1: gp_Vec, V2: gp_Vec): void;
  D3(U: number, P: gp_Pnt, V1: gp_Vec, V2: gp_Vec, V3: gp_Vec): void;
  DN(U: number, N: number): gp_Vec;
  Resolution(R3d: number): number;
  GetType(): GeomAbs_CurveType;
  Line(): gp_Lin;
  Circle(): gp_Circ;
  Ellipse(): gp_Elips;
  Hyperbola(): gp_Hypr;
  Parabola(): gp_Parab;
  Degree(): number;
  IsRational(): boolean;
  NbPoles(): number;
  NbKnots(): number;
  Bezier(): Geom_BezierCurve;
  BSpline(): Geom_BSplineCurve;
  OffsetCurve(): Geom_OffsetCurve;
  EvalD0(U: number): gp_Pnt;
  EvalD1(U: number): any;
  EvalD2(U: number): any;
  EvalD3(U: number): any;
  EvalDN(U: number, N: number): gp_Vec;
  delete(): void;
}

export declare class Adaptor3d_Surface extends Standard_Transient {
  constructor();
  static get_type_name(): string;
  static get_type_descriptor(): Standard_Type;
  DynamicType(): Standard_Type;
  ShallowCopy(): Adaptor3d_Surface;
  FirstUParameter(): number;
  LastUParameter(): number;
  FirstVParameter(): number;
  LastVParameter(): number;
  UContinuity(): GeomAbs_Shape;
  VContinuity(): GeomAbs_Shape;
  NbUIntervals(S: GeomAbs_Shape): number;
  NbVIntervals(S: GeomAbs_Shape): number;
  UIntervals(T: TColStd_Array1OfReal, S: GeomAbs_Shape): void;
  VIntervals(T: TColStd_Array1OfReal, S: GeomAbs_Shape): void;
  UTrim(First: number, Last: number, Tol: number): Adaptor3d_Surface;
  VTrim(First: number, Last: number, Tol: number): Adaptor3d_Surface;
  IsUClosed(): boolean;
  IsVClosed(): boolean;
  IsUPeriodic(): boolean;
  UPeriod(): number;
  IsVPeriodic(): boolean;
  VPeriod(): number;
  Value(U: number, V: number): gp_Pnt;
  D0(U: number, V: number, P: gp_Pnt): void;
  D1(U: number, V: number, P: gp_Pnt, D1U: gp_Vec, D1V: gp_Vec): void;
  D2(U: number, V: number, P: gp_Pnt, D1U: gp_Vec, D1V: gp_Vec, D2U: gp_Vec, D2V: gp_Vec, D2UV: gp_Vec): void;
  D3(U: number, V: number, P: gp_Pnt, D1U: gp_Vec, D1V: gp_Vec, D2U: gp_Vec, D2V: gp_Vec, D2UV: gp_Vec, D3U: gp_Vec, D3V: gp_Vec, D3UUV: gp_Vec, D3UVV: gp_Vec): void;
  DN(U: number, V: number, Nu: number, Nv: number): gp_Vec;
  UResolution(R3d: number): number;
  VResolution(R3d: number): number;
  GetType(): GeomAbs_SurfaceType;
  Plane(): gp_Pln;
  Cylinder(): gp_Cylinder;
  Cone(): gp_Cone;
  Sphere(): gp_Sphere;
  Torus(): gp_Torus;
  UDegree(): number;
  NbUPoles(): number;
  VDegree(): number;
  NbVPoles(): number;
  NbUKnots(): number;
  NbVKnots(): number;
  IsURational(): boolean;
  IsVRational(): boolean;
  Bezier(): Geom_BezierSurface;
  BSpline(): Geom_BSplineSurface;
  AxeOfRevolution(): gp_Ax1;
  Direction(): gp_Dir;
  BasisCurve(): Adaptor3d_Curve;
  BasisSurface(): Adaptor3d_Surface;
  OffsetValue(): number;
  EvalD0(U: number, V: number): gp_Pnt;
  EvalD1(U: number, V: number): any;
  EvalD2(U: number, V: number): any;
  EvalD3(U: number, V: number): any;
  EvalDN(U: number, V: number, Nu: number, Nv: number): gp_Vec;
  delete(): void;
}

export declare class GeomAdaptor_TransformedSurface extends Adaptor3d_Surface {
  static get_type_name(): string;
  static get_type_descriptor(): Standard_Type;
  DynamicType(): Standard_Type;
  ShallowCopy(): Adaptor3d_Surface;
  Load_1(theSurface: Geom_Surface): void;
  Load_2(theSurface: Geom_Surface, theUFirst: number, theULast: number, theVFirst: number, theVLast: number, theTolU: number, theTolV: number): void;
  SetTrsf(theTrsf: gp_Trsf): void;
  Trsf(): gp_Trsf;
  Surface(): GeomAdaptor_Surface;
  ChangeSurface(): GeomAdaptor_Surface;
  GeomSurface(): Geom_Surface;
  FirstUParameter(): number;
  LastUParameter(): number;
  FirstVParameter(): number;
  LastVParameter(): number;
  UContinuity(): GeomAbs_Shape;
  VContinuity(): GeomAbs_Shape;
  NbUIntervals(theS: GeomAbs_Shape): number;
  NbVIntervals(theS: GeomAbs_Shape): number;
  UIntervals(theT: TColStd_Array1OfReal, theS: GeomAbs_Shape): void;
  VIntervals(theT: TColStd_Array1OfReal, theS: GeomAbs_Shape): void;
  UTrim(theFirst: number, theLast: number, theTol: number): Adaptor3d_Surface;
  VTrim(theFirst: number, theLast: number, theTol: number): Adaptor3d_Surface;
  IsUClosed(): boolean;
  IsVClosed(): boolean;
  IsUPeriodic(): boolean;
  UPeriod(): number;
  IsVPeriodic(): boolean;
  VPeriod(): number;
  Value(theU: number, theV: number): gp_Pnt;
  D0(theU: number, theV: number, theP: gp_Pnt): void;
  D1(theU: number, theV: number, theP: gp_Pnt, theD1U: gp_Vec, theD1V: gp_Vec): void;
  D2(theU: number, theV: number, theP: gp_Pnt, theD1U: gp_Vec, theD1V: gp_Vec, theD2U: gp_Vec, theD2V: gp_Vec, theD2UV: gp_Vec): void;
  D3(theU: number, theV: number, theP: gp_Pnt, theD1U: gp_Vec, theD1V: gp_Vec, theD2U: gp_Vec, theD2V: gp_Vec, theD2UV: gp_Vec, theD3U: gp_Vec, theD3V: gp_Vec, theD3UUV: gp_Vec, theD3UVV: gp_Vec): void;
  DN(theU: number, theV: number, theNu: number, theNv: number): gp_Vec;
  UResolution(theR3d: number): number;
  VResolution(theR3d: number): number;
  GetType(): GeomAbs_SurfaceType;
  Plane(): gp_Pln;
  Cylinder(): gp_Cylinder;
  Cone(): gp_Cone;
  Sphere(): gp_Sphere;
  Torus(): gp_Torus;
  UDegree(): number;
  NbUPoles(): number;
  VDegree(): number;
  NbVPoles(): number;
  NbUKnots(): number;
  NbVKnots(): number;
  IsURational(): boolean;
  IsVRational(): boolean;
  Bezier(): Geom_BezierSurface;
  BSpline(): Geom_BSplineSurface;
  AxeOfRevolution(): gp_Ax1;
  Direction(): gp_Dir;
  BasisCurve(): Adaptor3d_Curve;
  BasisSurface(): Adaptor3d_Surface;
  OffsetValue(): number;
  delete(): void;
}

  export declare class GeomAdaptor_TransformedSurface_1 extends GeomAdaptor_TransformedSurface {
    constructor();
  }

  export declare class GeomAdaptor_TransformedSurface_2 extends GeomAdaptor_TransformedSurface {
    constructor(theSurface: Geom_Surface, theTrsf: gp_Trsf);
  }

  export declare class GeomAdaptor_TransformedSurface_3 extends GeomAdaptor_TransformedSurface {
    constructor(theSurface: Geom_Surface, theUFirst: number, theULast: number, theVFirst: number, theVLast: number, theTrsf: gp_Trsf, theTolU: number, theTolV: number);
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
  constructor(C: Geom_Curve, U1: number, U2: number, Sense: boolean, theAdjustPeriodic: boolean)
  Reverse(): void;
  ReversedParameter(U: number): number;
  SetTrim(U1: number, U2: number, Sense: boolean, theAdjustPeriodic: boolean): void;
  BasisCurve(): Geom_Curve;
  Continuity(): GeomAbs_Shape;
  IsCN(N: number): boolean;
  EndPoint(): gp_Pnt;
  FirstParameter(): number;
  IsClosed(): boolean;
  IsPeriodic(): boolean;
  Period(): number;
  LastParameter(): number;
  StartPoint(): gp_Pnt;
  EvalD0(U: number): gp_Pnt;
  EvalD1(U: number): any;
  EvalD2(U: number): any;
  EvalD3(U: number): any;
  EvalDN(U: number, N: number): gp_Vec;
  Transform(T: gp_Trsf): void;
  TransformedParameter(U: number, T: gp_Trsf): number;
  ParametricTransformation(T: gp_Trsf): number;
  Copy(): Geom_Geometry;
  static get_type_name(): string;
  static get_type_descriptor(): Standard_Type;
  DynamicType(): Standard_Type;
  delete(): void;
}

export declare class Geom_BoundedCurve extends Geom_Curve {
  EndPoint(): gp_Pnt;
  StartPoint(): gp_Pnt;
  static get_type_name(): string;
  static get_type_descriptor(): Standard_Type;
  DynamicType(): Standard_Type;
  delete(): void;
}

export declare class Geom_BSplineSurface extends Geom_BoundedSurface {
  HasEvalRepresentation(): boolean;
  EvalRepresentation(): Geom_EvalRepSurfaceDesc::Base;
  SetEvalRepresentation(theDesc: Geom_EvalRepSurfaceDesc::Base): void;
  ClearEvalRepresentation(): void;
  ExchangeUV(): void;
  SetUPeriodic(): void;
  SetVPeriodic(): void;
  PeriodicNormalization(U: number, V: number): void;
  SetUOrigin(Index: number): void;
  SetVOrigin(Index: number): void;
  SetUNotPeriodic(): void;
  SetVNotPeriodic(): void;
  UReverse(): void;
  VReverse(): void;
  UReversedParameter(U: number): number;
  VReversedParameter(V: number): number;
  IncreaseDegree(UDegree: number, VDegree: number): void;
  InsertUKnots(Knots: TColStd_Array1OfReal, Mults: TColStd_Array1OfInteger, ParametricTolerance: number, Add: boolean): void;
  InsertVKnots(Knots: TColStd_Array1OfReal, Mults: TColStd_Array1OfInteger, ParametricTolerance: number, Add: boolean): void;
  RemoveUKnot(Index: number, M: number, Tolerance: number): boolean;
  RemoveVKnot(Index: number, M: number, Tolerance: number): boolean;
  IncreaseUMultiplicity_1(UIndex: number, M: number): void;
  IncreaseUMultiplicity_2(FromI1: number, ToI2: number, M: number): void;
  IncrementUMultiplicity(FromI1: number, ToI2: number, Step: number): void;
  IncreaseVMultiplicity_1(VIndex: number, M: number): void;
  IncreaseVMultiplicity_2(FromI1: number, ToI2: number, M: number): void;
  IncrementVMultiplicity(FromI1: number, ToI2: number, Step: number): void;
  InsertUKnot(U: number, M: number, ParametricTolerance: number, Add: boolean): void;
  InsertVKnot(V: number, M: number, ParametricTolerance: number, Add: boolean): void;
  Segment(U1: number, U2: number, V1: number, V2: number, theUTolerance: number, theVTolerance: number): void;
  CheckAndSegment(U1: number, U2: number, V1: number, V2: number, theUTolerance: number, theVTolerance: number): void;
  SetUKnot_1(UIndex: number, K: number): void;
  SetUKnots(UK: TColStd_Array1OfReal): void;
  SetUKnot_2(UIndex: number, K: number, M: number): void;
  SetVKnot_1(VIndex: number, K: number): void;
  SetVKnots(VK: TColStd_Array1OfReal): void;
  SetVKnot_2(VIndex: number, K: number, M: number): void;
  LocateU(U: number, ParametricTolerance: number, I1: number, I2: number, WithKnotRepetition: boolean): void;
  LocateV(V: number, ParametricTolerance: number, I1: number, I2: number, WithKnotRepetition: boolean): void;
  SetPole_1(UIndex: number, VIndex: number, P: gp_Pnt): void;
  SetPole_2(UIndex: number, VIndex: number, P: gp_Pnt, Weight: number): void;
  SetPoleCol_1(VIndex: number, CPoles: TColgp_Array1OfPnt): void;
  SetPoleCol_2(VIndex: number, CPoles: TColgp_Array1OfPnt, CPoleWeights: TColStd_Array1OfReal): void;
  SetPoleRow_1(UIndex: number, CPoles: TColgp_Array1OfPnt, CPoleWeights: TColStd_Array1OfReal): void;
  SetPoleRow_2(UIndex: number, CPoles: TColgp_Array1OfPnt): void;
  SetWeight(UIndex: number, VIndex: number, Weight: number): void;
  SetWeightCol(VIndex: number, CPoleWeights: TColStd_Array1OfReal): void;
  SetWeightRow(UIndex: number, CPoleWeights: TColStd_Array1OfReal): void;
  MovePoint(U: number, V: number, P: gp_Pnt, UIndex1: number, UIndex2: number, VIndex1: number, VIndex2: number, UFirstIndex: number, ULastIndex: number, VFirstIndex: number, VLastIndex: number): void;
  IsUClosed(): boolean;
  IsVClosed(): boolean;
  IsCNu(N: number): boolean;
  IsCNv(N: number): boolean;
  IsUPeriodic(): boolean;
  IsURational(): boolean;
  IsVPeriodic(): boolean;
  IsVRational(): boolean;
  Bounds(U1: number, U2: number, V1: number, V2: number): void;
  Continuity(): GeomAbs_Shape;
  FirstUKnotIndex(): number;
  FirstVKnotIndex(): number;
  LastUKnotIndex(): number;
  LastVKnotIndex(): number;
  NbUKnots(): number;
  NbUPoles(): number;
  NbVKnots(): number;
  NbVPoles(): number;
  Pole(UIndex: number, VIndex: number): gp_Pnt;
  Poles_1(P: TColgp_Array2OfPnt): void;
  Poles_2(): TColgp_Array2OfPnt;
  UDegree(): number;
  UKnot(UIndex: number): number;
  UKnotDistribution(): GeomAbs_BSplKnotDistribution;
  UKnots_1(Ku: TColStd_Array1OfReal): void;
  UKnots_2(): TColStd_Array1OfReal;
  UKnotSequence_1(Ku: TColStd_Array1OfReal): void;
  UKnotSequence_2(): TColStd_Array1OfReal;
  UMultiplicity(UIndex: number): number;
  UMultiplicities_1(Mu: TColStd_Array1OfInteger): void;
  UMultiplicities_2(): TColStd_Array1OfInteger;
  VDegree(): number;
  VKnot(VIndex: number): number;
  VKnotDistribution(): GeomAbs_BSplKnotDistribution;
  VKnots_1(Kv: TColStd_Array1OfReal): void;
  VKnots_2(): TColStd_Array1OfReal;
  VKnotSequence_1(Kv: TColStd_Array1OfReal): void;
  VKnotSequence_2(): TColStd_Array1OfReal;
  VMultiplicity(VIndex: number): number;
  VMultiplicities_1(Mv: TColStd_Array1OfInteger): void;
  VMultiplicities_2(): TColStd_Array1OfInteger;
  Weight(UIndex: number, VIndex: number): number;
  Weights_1(W: TColStd_Array2OfReal): void;
  WeightsArray(): TColStd_Array2OfReal;
  Weights_2(): TColStd_Array2OfReal;
  EvalD0(U: number, V: number): gp_Pnt;
  EvalD1(U: number, V: number): any;
  EvalD2(U: number, V: number): any;
  EvalD3(U: number, V: number): any;
  EvalDN(U: number, V: number, Nu: number, Nv: number): gp_Vec;
  LocalD0(U: number, V: number, FromUK1: number, ToUK2: number, FromVK1: number, ToVK2: number, P: gp_Pnt): void;
  LocalD1(U: number, V: number, FromUK1: number, ToUK2: number, FromVK1: number, ToVK2: number, P: gp_Pnt, D1U: gp_Vec, D1V: gp_Vec): void;
  LocalD2(U: number, V: number, FromUK1: number, ToUK2: number, FromVK1: number, ToVK2: number, P: gp_Pnt, D1U: gp_Vec, D1V: gp_Vec, D2U: gp_Vec, D2V: gp_Vec, D2UV: gp_Vec): void;
  LocalD3(U: number, V: number, FromUK1: number, ToUK2: number, FromVK1: number, ToVK2: number, P: gp_Pnt, D1U: gp_Vec, D1V: gp_Vec, D2U: gp_Vec, D2V: gp_Vec, D2UV: gp_Vec, D3U: gp_Vec, D3V: gp_Vec, D3UUV: gp_Vec, D3UVV: gp_Vec): void;
  LocalDN(U: number, V: number, FromUK1: number, ToUK2: number, FromVK1: number, ToVK2: number, Nu: number, Nv: number): gp_Vec;
  LocalValue(U: number, V: number, FromUK1: number, ToUK2: number, FromVK1: number, ToVK2: number): gp_Pnt;
  UIso_1(U: number): Geom_Curve;
  VIso_1(V: number): Geom_Curve;
  UIso_2(U: number, CheckRational: boolean): Geom_Curve;
  VIso_2(V: number, CheckRational: boolean): Geom_Curve;
  Transform(T: gp_Trsf): void;
  static MaxDegree(): number;
  Resolution(Tolerance3D: number, UTolerance: number, VTolerance: number): void;
  Copy(): Geom_Geometry;
  static get_type_name(): string;
  static get_type_descriptor(): Standard_Type;
  DynamicType(): Standard_Type;
  delete(): void;
}

  export declare class Geom_BSplineSurface_1 extends Geom_BSplineSurface {
    constructor(Poles: TColgp_Array2OfPnt, UKnots: TColStd_Array1OfReal, VKnots: TColStd_Array1OfReal, UMults: TColStd_Array1OfInteger, VMults: TColStd_Array1OfInteger, UDegree: number, VDegree: number, UPeriodic: boolean, VPeriodic: boolean);
  }

  export declare class Geom_BSplineSurface_2 extends Geom_BSplineSurface {
    constructor(Poles: TColgp_Array2OfPnt, Weights: TColStd_Array2OfReal, UKnots: TColStd_Array1OfReal, VKnots: TColStd_Array1OfReal, UMults: TColStd_Array1OfInteger, VMults: TColStd_Array1OfInteger, UDegree: number, VDegree: number, UPeriodic: boolean, VPeriodic: boolean);
  }

  export declare class Geom_BSplineSurface_3 extends Geom_BSplineSurface {
    constructor(theOther: Geom_BSplineSurface);
  }

export declare class Geom_BSplineCurve extends Geom_BoundedCurve {
  HasEvalRepresentation(): boolean;
  EvalRepresentation(): Geom_EvalRepCurveDesc::Base;
  SetEvalRepresentation(theDesc: Geom_EvalRepCurveDesc::Base): void;
  ClearEvalRepresentation(): void;
  IncreaseDegree(Degree: number): void;
  IncreaseMultiplicity_1(Index: number, M: number): void;
  IncreaseMultiplicity_2(I1: number, I2: number, M: number): void;
  IncrementMultiplicity(I1: number, I2: number, M: number): void;
  InsertKnot(U: number, M: number, ParametricTolerance: number, Add: boolean): void;
  InsertKnots(Knots: TColStd_Array1OfReal, Mults: TColStd_Array1OfInteger, ParametricTolerance: number, Add: boolean): void;
  RemoveKnot(Index: number, M: number, Tolerance: number): boolean;
  Reverse(): void;
  ReversedParameter(U: number): number;
  Segment(U1: number, U2: number, theTolerance: number): void;
  SetKnot_1(Index: number, K: number): void;
  SetKnots(K: TColStd_Array1OfReal): void;
  SetKnot_2(Index: number, K: number, M: number): void;
  PeriodicNormalization(U: number): void;
  SetPeriodic(): void;
  SetOrigin_1(Index: number): void;
  SetOrigin_2(U: number, Tol: number): void;
  SetNotPeriodic(): void;
  SetPole_1(Index: number, P: gp_Pnt): void;
  SetPole_2(Index: number, P: gp_Pnt, Weight: number): void;
  SetWeight(Index: number, Weight: number): void;
  MovePoint(U: number, P: gp_Pnt, Index1: number, Index2: number, FirstModifiedPole: number, LastModifiedPole: number): void;
  MovePointAndTangent(U: number, P: gp_Pnt, Tangent: gp_Vec, Tolerance: number, StartingCondition: number, EndingCondition: number, ErrorStatus: number): void;
  IsCN(N: number): boolean;
  IsG1(theTf: number, theTl: number, theAngTol: number): boolean;
  IsClosed(): boolean;
  IsPeriodic(): boolean;
  IsRational(): boolean;
  Continuity(): GeomAbs_Shape;
  Degree(): number;
  EvalD0(U: number): gp_Pnt;
  EvalD1(U: number): any;
  EvalD2(U: number): any;
  EvalD3(U: number): any;
  EvalDN(U: number, N: number): gp_Vec;
  LocalValue(U: number, FromK1: number, ToK2: number): gp_Pnt;
  LocalD0(U: number, FromK1: number, ToK2: number, P: gp_Pnt): void;
  LocalD1(U: number, FromK1: number, ToK2: number, P: gp_Pnt, V1: gp_Vec): void;
  LocalD2(U: number, FromK1: number, ToK2: number, P: gp_Pnt, V1: gp_Vec, V2: gp_Vec): void;
  LocalD3(U: number, FromK1: number, ToK2: number, P: gp_Pnt, V1: gp_Vec, V2: gp_Vec, V3: gp_Vec): void;
  LocalDN(U: number, FromK1: number, ToK2: number, N: number): gp_Vec;
  EndPoint(): gp_Pnt;
  FirstUKnotIndex(): number;
  FirstParameter(): number;
  Knot(Index: number): number;
  Knots_1(K: TColStd_Array1OfReal): void;
  Knots_2(): TColStd_Array1OfReal;
  KnotSequence_1(K: TColStd_Array1OfReal): void;
  KnotSequence_2(): TColStd_Array1OfReal;
  KnotDistribution(): GeomAbs_BSplKnotDistribution;
  LastUKnotIndex(): number;
  LastParameter(): number;
  LocateU(U: number, ParametricTolerance: number, I1: number, I2: number, WithKnotRepetition: boolean): void;
  Multiplicity(Index: number): number;
  Multiplicities_1(M: TColStd_Array1OfInteger): void;
  Multiplicities_2(): TColStd_Array1OfInteger;
  NbKnots(): number;
  NbPoles(): number;
  Pole(Index: number): gp_Pnt;
  Poles_1(P: TColgp_Array1OfPnt): void;
  Poles_2(): TColgp_Array1OfPnt;
  StartPoint(): gp_Pnt;
  Weight(Index: number): number;
  Weights_1(W: TColStd_Array1OfReal): void;
  Weights_2(): TColStd_Array1OfReal;
  WeightsArray(): TColStd_Array1OfReal;
  Transform(T: gp_Trsf): void;
  static MaxDegree(): number;
  Resolution(Tolerance3D: number, UTolerance: number): void;
  Copy(): Geom_Geometry;
  IsEqual(theOther: Geom_BSplineCurve, thePreci: number): boolean;
  static get_type_name(): string;
  static get_type_descriptor(): Standard_Type;
  DynamicType(): Standard_Type;
  delete(): void;
}

  export declare class Geom_BSplineCurve_1 extends Geom_BSplineCurve {
    constructor(Poles: TColgp_Array1OfPnt, Knots: TColStd_Array1OfReal, Multiplicities: TColStd_Array1OfInteger, Degree: number, Periodic: boolean);
  }

  export declare class Geom_BSplineCurve_2 extends Geom_BSplineCurve {
    constructor(Poles: TColgp_Array1OfPnt, Weights: TColStd_Array1OfReal, Knots: TColStd_Array1OfReal, Multiplicities: TColStd_Array1OfInteger, Degree: number, Periodic: boolean, CheckRational: boolean);
  }

  export declare class Geom_BSplineCurve_3 extends Geom_BSplineCurve {
    constructor(theOther: Geom_BSplineCurve);
  }

export declare class Geom_SphericalSurface extends Geom_ElementarySurface {
  SetRadius(R: number): void;
  SetSphere(S: gp_Sphere): void;
  Sphere(): gp_Sphere;
  UReversedParameter(U: number): number;
  VReversedParameter(V: number): number;
  Area(): number;
  Bounds(U1: number, U2: number, V1: number, V2: number): void;
  Coefficients(A1: number, A2: number, A3: number, B1: number, B2: number, B3: number, C1: number, C2: number, C3: number, D: number): void;
  Radius(): number;
  Volume(): number;
  IsUClosed(): boolean;
  IsVClosed(): boolean;
  IsUPeriodic(): boolean;
  IsVPeriodic(): boolean;
  UIso(U: number): Geom_Curve;
  VIso(V: number): Geom_Curve;
  EvalD0(U: number, V: number): gp_Pnt;
  EvalD1(U: number, V: number): any;
  EvalD2(U: number, V: number): any;
  EvalD3(U: number, V: number): any;
  EvalDN(U: number, V: number, Nu: number, Nv: number): gp_Vec;
  Transform(T: gp_Trsf): void;
  Copy(): Geom_Geometry;
  static get_type_name(): string;
  static get_type_descriptor(): Standard_Type;
  DynamicType(): Standard_Type;
  delete(): void;
}

  export declare class Geom_SphericalSurface_1 extends Geom_SphericalSurface {
    constructor(A3: gp_Ax3, Radius: number);
  }

  export declare class Geom_SphericalSurface_2 extends Geom_SphericalSurface {
    constructor(S: gp_Sphere);
  }

export declare class Geom_BezierCurve extends Geom_BoundedCurve {
  HasEvalRepresentation(): boolean;
  EvalRepresentation(): Geom_EvalRepCurveDesc::Base;
  SetEvalRepresentation(theDesc: Geom_EvalRepCurveDesc::Base): void;
  ClearEvalRepresentation(): void;
  Increase(Degree: number): void;
  InsertPoleAfter_1(Index: number, P: gp_Pnt): void;
  InsertPoleAfter_2(Index: number, P: gp_Pnt, Weight: number): void;
  InsertPoleBefore_1(Index: number, P: gp_Pnt): void;
  InsertPoleBefore_2(Index: number, P: gp_Pnt, Weight: number): void;
  RemovePole(Index: number): void;
  Reverse(): void;
  ReversedParameter(U: number): number;
  Segment(U1: number, U2: number): void;
  SetPole_1(Index: number, P: gp_Pnt): void;
  SetPole_2(Index: number, P: gp_Pnt, Weight: number): void;
  SetWeight(Index: number, Weight: number): void;
  IsClosed(): boolean;
  IsCN(N: number): boolean;
  IsPeriodic(): boolean;
  IsRational(): boolean;
  Continuity(): GeomAbs_Shape;
  Degree(): number;
  EvalD0(U: number): gp_Pnt;
  EvalD1(U: number): any;
  EvalD2(U: number): any;
  EvalD3(U: number): any;
  EvalDN(U: number, N: number): gp_Vec;
  StartPoint(): gp_Pnt;
  EndPoint(): gp_Pnt;
  FirstParameter(): number;
  LastParameter(): number;
  NbPoles(): number;
  Pole(Index: number): gp_Pnt;
  Poles_1(P: TColgp_Array1OfPnt): void;
  Poles_2(): TColgp_Array1OfPnt;
  Weight(Index: number): number;
  Weights_1(W: TColStd_Array1OfReal): void;
  Weights_2(): TColStd_Array1OfReal;
  WeightsArray(): TColStd_Array1OfReal;
  Transform(T: gp_Trsf): void;
  static MaxDegree(): number;
  Resolution(Tolerance3D: number, UTolerance: number): void;
  Copy(): Geom_Geometry;
  Knots(): TColStd_Array1OfReal;
  Multiplicities(): TColStd_Array1OfInteger;
  KnotSequence(): TColStd_Array1OfReal;
  static get_type_name(): string;
  static get_type_descriptor(): Standard_Type;
  DynamicType(): Standard_Type;
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
  Rotate(A1: gp_Ax1, Ang: number): void;
  Scale(P: gp_Pnt, S: number): void;
  Translate_1(V: gp_Vec): void;
  Translate_2(P1: gp_Pnt, P2: gp_Pnt): void;
  Transform(T: gp_Trsf): void;
  Mirrored_1(P: gp_Pnt): Geom_Geometry;
  Mirrored_2(A1: gp_Ax1): Geom_Geometry;
  Mirrored_3(A2: gp_Ax2): Geom_Geometry;
  Rotated(A1: gp_Ax1, Ang: number): Geom_Geometry;
  Scaled(P: gp_Pnt, S: number): Geom_Geometry;
  Transformed(T: gp_Trsf): Geom_Geometry;
  Translated_1(V: gp_Vec): Geom_Geometry;
  Translated_2(P1: gp_Pnt, P2: gp_Pnt): Geom_Geometry;
  Copy(): Geom_Geometry;
  static get_type_name(): string;
  static get_type_descriptor(): Standard_Type;
  DynamicType(): Standard_Type;
  delete(): void;
}

export declare class Geom_CylindricalSurface extends Geom_ElementarySurface {
  SetCylinder(C: gp_Cylinder): void;
  SetRadius(R: number): void;
  Cylinder(): gp_Cylinder;
  UReversedParameter(U: number): number;
  VReversedParameter(V: number): number;
  TransformParameters(U: number, V: number, T: gp_Trsf): void;
  ParametricTransformation(T: gp_Trsf): gp_GTrsf2d;
  Bounds(U1: number, U2: number, V1: number, V2: number): void;
  Coefficients(A1: number, A2: number, A3: number, B1: number, B2: number, B3: number, C1: number, C2: number, C3: number, D: number): void;
  Radius(): number;
  IsUClosed(): boolean;
  IsVClosed(): boolean;
  IsUPeriodic(): boolean;
  IsVPeriodic(): boolean;
  UIso(U: number): Geom_Curve;
  VIso(V: number): Geom_Curve;
  EvalD0(U: number, V: number): gp_Pnt;
  EvalD1(U: number, V: number): any;
  EvalD2(U: number, V: number): any;
  EvalD3(U: number, V: number): any;
  EvalDN(U: number, V: number, Nu: number, Nv: number): gp_Vec;
  Transform(T: gp_Trsf): void;
  Copy(): Geom_Geometry;
  static get_type_name(): string;
  static get_type_descriptor(): Standard_Type;
  DynamicType(): Standard_Type;
  delete(): void;
}

  export declare class Geom_CylindricalSurface_1 extends Geom_CylindricalSurface {
    constructor(A3: gp_Ax3, Radius: number);
  }

  export declare class Geom_CylindricalSurface_2 extends Geom_CylindricalSurface {
    constructor(C: gp_Cylinder);
  }

export declare class Geom_Surface extends Geom_Geometry {
  UReverse(): void;
  UReversed(): Geom_Surface;
  UReversedParameter(U: number): number;
  VReverse(): void;
  VReversed(): Geom_Surface;
  VReversedParameter(V: number): number;
  TransformParameters(U: number, V: number, T: gp_Trsf): void;
  ParametricTransformation(T: gp_Trsf): gp_GTrsf2d;
  Bounds(U1: number, U2: number, V1: number, V2: number): void;
  IsUClosed(): boolean;
  IsVClosed(): boolean;
  IsUPeriodic(): boolean;
  UPeriod(): number;
  IsVPeriodic(): boolean;
  VPeriod(): number;
  UIso(U: number): Geom_Curve;
  VIso(V: number): Geom_Curve;
  Continuity(): GeomAbs_Shape;
  IsCNu(N: number): boolean;
  IsCNv(N: number): boolean;
  EvalD0(U: number, V: number): gp_Pnt;
  EvalD1(U: number, V: number): ResD1;
  EvalD2(U: number, V: number): ResD2;
  EvalD3(U: number, V: number): ResD3;
  EvalDN(U: number, V: number, Nu: number, Nv: number): gp_Vec;
  D0(U: number, V: number, P: gp_Pnt): void;
  D1(U: number, V: number, P: gp_Pnt, D1U: gp_Vec, D1V: gp_Vec): void;
  D2(U: number, V: number, P: gp_Pnt, D1U: gp_Vec, D1V: gp_Vec, D2U: gp_Vec, D2V: gp_Vec, D2UV: gp_Vec): void;
  D3(U: number, V: number, P: gp_Pnt, D1U: gp_Vec, D1V: gp_Vec, D2U: gp_Vec, D2V: gp_Vec, D2UV: gp_Vec, D3U: gp_Vec, D3V: gp_Vec, D3UUV: gp_Vec, D3UVV: gp_Vec): void;
  DN(U: number, V: number, Nu: number, Nv: number): gp_Vec;
  Value(U: number, V: number): gp_Pnt;
  static get_type_name(): string;
  static get_type_descriptor(): Standard_Type;
  DynamicType(): Standard_Type;
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
  UReversedParameter(U: number): number;
  VReverse(): void;
  VReversedParameter(V: number): number;
  Continuity(): GeomAbs_Shape;
  IsCNu(N: number): boolean;
  IsCNv(N: number): boolean;
  static get_type_name(): string;
  static get_type_descriptor(): Standard_Type;
  DynamicType(): Standard_Type;
  delete(): void;
}

export declare class Geom_Curve extends Geom_Geometry {
  Reverse(): void;
  ReversedParameter(U: number): number;
  TransformedParameter(U: number, T: gp_Trsf): number;
  ParametricTransformation(T: gp_Trsf): number;
  Reversed(): Geom_Curve;
  FirstParameter(): number;
  LastParameter(): number;
  IsClosed(): boolean;
  IsPeriodic(): boolean;
  Period(): number;
  Continuity(): GeomAbs_Shape;
  IsCN(N: number): boolean;
  EvalD0(U: number): gp_Pnt;
  EvalD1(U: number): ResD1;
  EvalD2(U: number): ResD2;
  EvalD3(U: number): ResD3;
  EvalDN(U: number, N: number): gp_Vec;
  D0(U: number, P: gp_Pnt): void;
  D1(U: number, P: gp_Pnt, V1: gp_Vec): void;
  D2(U: number, P: gp_Pnt, V1: gp_Vec, V2: gp_Vec): void;
  D3(U: number, P: gp_Pnt, V1: gp_Vec, V2: gp_Vec, V3: gp_Vec): void;
  DN(U: number, N: number): gp_Vec;
  Value(U: number): gp_Pnt;
  static get_type_name(): string;
  static get_type_descriptor(): Standard_Type;
  DynamicType(): Standard_Type;
  delete(): void;
}

export declare class Geom_BoundedSurface extends Geom_Surface {
  static get_type_name(): string;
  static get_type_descriptor(): Standard_Type;
  DynamicType(): Standard_Type;
  delete(): void;
}

export declare class GProp_GProps {
  Add(Item: GProp_GProps, Density: number): void;
  Mass(): number;
  CentreOfMass(): gp_Pnt;
  MatrixOfInertia(): gp_Mat;
  StaticMoments(Ix: number, Iy: number, Iz: number): void;
  MomentOfInertia(A: gp_Ax1): number;
  PrincipalProperties(): GProp_PrincipalProps;
  RadiusOfGyration(A: gp_Ax1): number;
  delete(): void;
}

  export declare class GProp_GProps_1 extends GProp_GProps {
    constructor();
  }

  export declare class GProp_GProps_2 extends GProp_GProps {
    constructor(SystemLocation: gp_Pnt);
  }

export declare class Geom2d_BSplineCurve extends Geom2d_BoundedCurve {
  HasEvalRepresentation(): boolean;
  EvalRepresentation(): Geom2d_EvalRepCurveDesc::Base;
  SetEvalRepresentation(theDesc: Geom2d_EvalRepCurveDesc::Base): void;
  ClearEvalRepresentation(): void;
  IncreaseDegree(Degree: number): void;
  IncreaseMultiplicity_1(Index: number, M: number): void;
  IncreaseMultiplicity_2(I1: number, I2: number, M: number): void;
  IncrementMultiplicity(I1: number, I2: number, M: number): void;
  InsertKnot(U: number, M: number, ParametricTolerance: number): void;
  InsertKnots(Knots: TColStd_Array1OfReal, Mults: TColStd_Array1OfInteger, ParametricTolerance: number, Add: boolean): void;
  RemoveKnot(Index: number, M: number, Tolerance: number): boolean;
  InsertPoleAfter(Index: number, P: gp_Pnt2d, Weight: number): void;
  InsertPoleBefore(Index: number, P: gp_Pnt2d, Weight: number): void;
  RemovePole(Index: number): void;
  Reverse(): void;
  ReversedParameter(U: number): number;
  Segment(U1: number, U2: number, theTolerance: number): void;
  SetKnot_1(Index: number, K: number): void;
  SetKnots(K: TColStd_Array1OfReal): void;
  SetKnot_2(Index: number, K: number, M: number): void;
  PeriodicNormalization(U: number): void;
  SetPeriodic(): void;
  SetOrigin(Index: number): void;
  SetNotPeriodic(): void;
  SetPole_1(Index: number, P: gp_Pnt2d): void;
  SetPole_2(Index: number, P: gp_Pnt2d, Weight: number): void;
  SetWeight(Index: number, Weight: number): void;
  MovePoint(U: number, P: gp_Pnt2d, Index1: number, Index2: number, FirstModifiedPole: number, LastModifiedPole: number): void;
  MovePointAndTangent(U: number, P: gp_Pnt2d, Tangent: gp_Vec2d, Tolerance: number, StartingCondition: number, EndingCondition: number, ErrorStatus: number): void;
  IsCN(N: number): boolean;
  IsG1(theTf: number, theTl: number, theAngTol: number): boolean;
  IsClosed(): boolean;
  IsPeriodic(): boolean;
  IsRational(): boolean;
  Continuity(): GeomAbs_Shape;
  Degree(): number;
  EvalD0(U: number): gp_Pnt2d;
  EvalD1(U: number): any;
  EvalD2(U: number): any;
  EvalD3(U: number): any;
  EvalDN(U: number, N: number): gp_Vec2d;
  LocalValue(U: number, FromK1: number, ToK2: number): gp_Pnt2d;
  LocalD0(U: number, FromK1: number, ToK2: number, P: gp_Pnt2d): void;
  LocalD1(U: number, FromK1: number, ToK2: number, P: gp_Pnt2d, V1: gp_Vec2d): void;
  LocalD2(U: number, FromK1: number, ToK2: number, P: gp_Pnt2d, V1: gp_Vec2d, V2: gp_Vec2d): void;
  LocalD3(U: number, FromK1: number, ToK2: number, P: gp_Pnt2d, V1: gp_Vec2d, V2: gp_Vec2d, V3: gp_Vec2d): void;
  LocalDN(U: number, FromK1: number, ToK2: number, N: number): gp_Vec2d;
  EndPoint(): gp_Pnt2d;
  FirstUKnotIndex(): number;
  FirstParameter(): number;
  Knot(Index: number): number;
  Knots_1(K: TColStd_Array1OfReal): void;
  Knots_2(): TColStd_Array1OfReal;
  KnotSequence_1(K: TColStd_Array1OfReal): void;
  KnotSequence_2(): TColStd_Array1OfReal;
  KnotDistribution(): GeomAbs_BSplKnotDistribution;
  LastUKnotIndex(): number;
  LastParameter(): number;
  LocateU(U: number, ParametricTolerance: number, I1: number, I2: number, WithKnotRepetition: boolean): void;
  Multiplicity(Index: number): number;
  Multiplicities_1(M: TColStd_Array1OfInteger): void;
  Multiplicities_2(): TColStd_Array1OfInteger;
  NbKnots(): number;
  NbPoles(): number;
  Pole(Index: number): gp_Pnt2d;
  Poles_1(P: TColgp_Array1OfPnt2d): void;
  Poles_2(): TColgp_Array1OfPnt2d;
  StartPoint(): gp_Pnt2d;
  Weight(Index: number): number;
  Weights_1(W: TColStd_Array1OfReal): void;
  Weights_2(): TColStd_Array1OfReal;
  WeightsArray(): TColStd_Array1OfReal;
  Transform(T: gp_Trsf2d): void;
  static MaxDegree(): number;
  Resolution(ToleranceUV: number, UTolerance: number): void;
  Copy(): Geom2d_Geometry;
  static get_type_name(): string;
  static get_type_descriptor(): Standard_Type;
  DynamicType(): Standard_Type;
  delete(): void;
}

  export declare class Geom2d_BSplineCurve_1 extends Geom2d_BSplineCurve {
    constructor(Poles: TColgp_Array1OfPnt2d, Knots: TColStd_Array1OfReal, Multiplicities: TColStd_Array1OfInteger, Degree: number, Periodic: boolean);
  }

  export declare class Geom2d_BSplineCurve_2 extends Geom2d_BSplineCurve {
    constructor(Poles: TColgp_Array1OfPnt2d, Weights: TColStd_Array1OfReal, Knots: TColStd_Array1OfReal, Multiplicities: TColStd_Array1OfInteger, Degree: number, Periodic: boolean);
  }

  export declare class Geom2d_BSplineCurve_3 extends Geom2d_BSplineCurve {
    constructor(theOther: Geom2d_BSplineCurve);
  }

export declare class Geom2d_BoundedCurve extends Geom2d_Curve {
  EndPoint(): gp_Pnt2d;
  StartPoint(): gp_Pnt2d;
  static get_type_name(): string;
  static get_type_descriptor(): Standard_Type;
  DynamicType(): Standard_Type;
  delete(): void;
}

export declare class Geom2d_TrimmedCurve extends Geom2d_BoundedCurve {
  constructor(C: Geom2d_Curve, U1: number, U2: number, Sense: boolean, theAdjustPeriodic: boolean)
  Reverse(): void;
  ReversedParameter(U: number): number;
  SetTrim(U1: number, U2: number, Sense: boolean, theAdjustPeriodic: boolean): void;
  BasisCurve(): Geom2d_Curve;
  Continuity(): GeomAbs_Shape;
  IsCN(N: number): boolean;
  EndPoint(): gp_Pnt2d;
  FirstParameter(): number;
  IsClosed(): boolean;
  IsPeriodic(): boolean;
  Period(): number;
  LastParameter(): number;
  StartPoint(): gp_Pnt2d;
  EvalD0(U: number): gp_Pnt2d;
  EvalD1(U: number): any;
  EvalD2(U: number): any;
  EvalD3(U: number): any;
  EvalDN(U: number, N: number): gp_Vec2d;
  Transform(T: gp_Trsf2d): void;
  TransformedParameter(U: number, T: gp_Trsf2d): number;
  ParametricTransformation(T: gp_Trsf2d): number;
  Copy(): Geom2d_Geometry;
  static get_type_name(): string;
  static get_type_descriptor(): Standard_Type;
  DynamicType(): Standard_Type;
  delete(): void;
}

export declare class Geom2d_Circle extends Geom2d_Conic {
  SetCirc2d(C: gp_Circ2d): void;
  SetRadius(R: number): void;
  Circ2d(): gp_Circ2d;
  Radius(): number;
  ReversedParameter(U: number): number;
  Eccentricity(): number;
  FirstParameter(): number;
  LastParameter(): number;
  IsClosed(): boolean;
  IsPeriodic(): boolean;
  EvalD0(U: number): gp_Pnt2d;
  EvalD1(U: number): any;
  EvalD2(U: number): any;
  EvalD3(U: number): any;
  EvalDN(U: number, N: number): gp_Vec2d;
  Transform(T: gp_Trsf2d): void;
  Copy(): Geom2d_Geometry;
  static get_type_name(): string;
  static get_type_descriptor(): Standard_Type;
  DynamicType(): Standard_Type;
  delete(): void;
}

  export declare class Geom2d_Circle_1 extends Geom2d_Circle {
    constructor(C: gp_Circ2d);
  }

  export declare class Geom2d_Circle_2 extends Geom2d_Circle {
    constructor(A: gp_Ax2d, Radius: number, Sense: boolean);
  }

  export declare class Geom2d_Circle_3 extends Geom2d_Circle {
    constructor(A: gp_Ax22d, Radius: number);
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
  ReversedParameter(U: number): number;
  FirstParameter(): number;
  LastParameter(): number;
  IsClosed(): boolean;
  IsPeriodic(): boolean;
  Continuity(): GeomAbs_Shape;
  Distance(P: gp_Pnt2d): number;
  IsCN(N: number): boolean;
  EvalD0(U: number): gp_Pnt2d;
  EvalD1(U: number): any;
  EvalD2(U: number): any;
  EvalD3(U: number): any;
  EvalDN(U: number, N: number): gp_Vec2d;
  Transform(T: gp_Trsf2d): void;
  TransformedParameter(U: number, T: gp_Trsf2d): number;
  ParametricTransformation(T: gp_Trsf2d): number;
  Copy(): Geom2d_Geometry;
  static get_type_name(): string;
  static get_type_descriptor(): Standard_Type;
  DynamicType(): Standard_Type;
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
  ReversedParameter(U: number): number;
  TransformedParameter(U: number, T: gp_Trsf2d): number;
  ParametricTransformation(T: gp_Trsf2d): number;
  Reversed(): Geom2d_Curve;
  FirstParameter(): number;
  LastParameter(): number;
  IsClosed(): boolean;
  IsPeriodic(): boolean;
  Period(): number;
  Continuity(): GeomAbs_Shape;
  IsCN(N: number): boolean;
  EvalD0(U: number): gp_Pnt2d;
  EvalD1(U: number): ResD1;
  EvalD2(U: number): ResD2;
  EvalD3(U: number): ResD3;
  EvalDN(U: number, N: number): gp_Vec2d;
  D0(U: number, P: gp_Pnt2d): void;
  D1(U: number, P: gp_Pnt2d, V1: gp_Vec2d): void;
  D2(U: number, P: gp_Pnt2d, V1: gp_Vec2d, V2: gp_Vec2d): void;
  D3(U: number, P: gp_Pnt2d, V1: gp_Vec2d, V2: gp_Vec2d, V3: gp_Vec2d): void;
  DN(U: number, N: number): gp_Vec2d;
  Value(U: number): gp_Pnt2d;
  static get_type_name(): string;
  static get_type_descriptor(): Standard_Type;
  DynamicType(): Standard_Type;
  delete(): void;
}

export declare class Geom2d_OffsetCurve extends Geom2d_Curve {
  HasEvalRepresentation(): boolean;
  EvalRepresentation(): Geom2d_EvalRepCurveDesc::Base;
  SetEvalRepresentation(theDesc: Geom2d_EvalRepCurveDesc::Base): void;
  ClearEvalRepresentation(): void;
  Reverse(): void;
  ReversedParameter(U: number): number;
  SetBasisCurve(C: Geom2d_Curve, isNotCheckC0: boolean): void;
  SetOffsetValue(D: number): void;
  BasisCurve(): Geom2d_Curve;
  Continuity(): GeomAbs_Shape;
  EvalD0(U: number): gp_Pnt2d;
  EvalD1(U: number): any;
  EvalD2(U: number): any;
  EvalD3(U: number): any;
  EvalDN(U: number, N: number): gp_Vec2d;
  FirstParameter(): number;
  LastParameter(): number;
  Offset(): number;
  IsClosed(): boolean;
  IsCN(N: number): boolean;
  IsPeriodic(): boolean;
  Period(): number;
  Transform(T: gp_Trsf2d): void;
  TransformedParameter(U: number, T: gp_Trsf2d): number;
  ParametricTransformation(T: gp_Trsf2d): number;
  Copy(): Geom2d_Geometry;
  GetBasisCurveContinuity(): GeomAbs_Shape;
  static get_type_name(): string;
  static get_type_descriptor(): Standard_Type;
  DynamicType(): Standard_Type;
  delete(): void;
}

  export declare class Geom2d_OffsetCurve_1 extends Geom2d_OffsetCurve {
    constructor(C: Geom2d_Curve, Offset: number, isNotCheckC0: boolean);
  }

  export declare class Geom2d_OffsetCurve_2 extends Geom2d_OffsetCurve {
    constructor(theOther: Geom2d_OffsetCurve);
  }

export declare class Geom2d_BezierCurve extends Geom2d_BoundedCurve {
  HasEvalRepresentation(): boolean;
  EvalRepresentation(): Geom2d_EvalRepCurveDesc::Base;
  SetEvalRepresentation(theDesc: Geom2d_EvalRepCurveDesc::Base): void;
  ClearEvalRepresentation(): void;
  Increase(Degree: number): void;
  InsertPoleAfter(Index: number, P: gp_Pnt2d, Weight: number): void;
  InsertPoleBefore(Index: number, P: gp_Pnt2d, Weight: number): void;
  RemovePole(Index: number): void;
  Reverse(): void;
  ReversedParameter(U: number): number;
  Segment(U1: number, U2: number): void;
  SetPole_1(Index: number, P: gp_Pnt2d): void;
  SetPole_2(Index: number, P: gp_Pnt2d, Weight: number): void;
  SetWeight(Index: number, Weight: number): void;
  IsClosed(): boolean;
  IsCN(N: number): boolean;
  IsPeriodic(): boolean;
  IsRational(): boolean;
  Continuity(): GeomAbs_Shape;
  Degree(): number;
  EvalD0(U: number): gp_Pnt2d;
  EvalD1(U: number): any;
  EvalD2(U: number): any;
  EvalD3(U: number): any;
  EvalDN(U: number, N: number): gp_Vec2d;
  EndPoint(): gp_Pnt2d;
  FirstParameter(): number;
  LastParameter(): number;
  NbPoles(): number;
  Pole(Index: number): gp_Pnt2d;
  Poles_1(P: TColgp_Array1OfPnt2d): void;
  Poles_2(): TColgp_Array1OfPnt2d;
  StartPoint(): gp_Pnt2d;
  Weight(Index: number): number;
  Weights_1(W: TColStd_Array1OfReal): void;
  Weights_2(): TColStd_Array1OfReal;
  WeightsArray(): TColStd_Array1OfReal;
  Transform(T: gp_Trsf2d): void;
  static MaxDegree(): number;
  Resolution(ToleranceUV: number, UTolerance: number): void;
  Copy(): Geom2d_Geometry;
  Knots(): TColStd_Array1OfReal;
  Multiplicities(): TColStd_Array1OfInteger;
  KnotSequence(): TColStd_Array1OfReal;
  static get_type_name(): string;
  static get_type_descriptor(): Standard_Type;
  DynamicType(): Standard_Type;
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
  Eccentricity(): number;
  Location(): gp_Pnt2d;
  Position(): gp_Ax22d;
  Reverse(): void;
  ReversedParameter(U: number): number;
  Continuity(): GeomAbs_Shape;
  IsCN(N: number): boolean;
  static get_type_name(): string;
  static get_type_descriptor(): Standard_Type;
  DynamicType(): Standard_Type;
  delete(): void;
}

export declare class Geom2d_Geometry extends Standard_Transient {
  Mirror_1(P: gp_Pnt2d): void;
  Mirror_2(A: gp_Ax2d): void;
  Rotate(P: gp_Pnt2d, Ang: number): void;
  Scale(P: gp_Pnt2d, S: number): void;
  Translate_1(V: gp_Vec2d): void;
  Translate_2(P1: gp_Pnt2d, P2: gp_Pnt2d): void;
  Transform(T: gp_Trsf2d): void;
  Mirrored_1(P: gp_Pnt2d): Geom2d_Geometry;
  Mirrored_2(A: gp_Ax2d): Geom2d_Geometry;
  Rotated(P: gp_Pnt2d, Ang: number): Geom2d_Geometry;
  Scaled(P: gp_Pnt2d, S: number): Geom2d_Geometry;
  Transformed(T: gp_Trsf2d): Geom2d_Geometry;
  Translated_1(V: gp_Vec2d): Geom2d_Geometry;
  Translated_2(P1: gp_Pnt2d, P2: gp_Pnt2d): Geom2d_Geometry;
  Copy(): Geom2d_Geometry;
  static get_type_name(): string;
  static get_type_descriptor(): Standard_Type;
  DynamicType(): Standard_Type;
  delete(): void;
}

export declare class Geom2d_Ellipse extends Geom2d_Conic {
  SetElips2d(E: gp_Elips2d): void;
  SetMajorRadius(MajorRadius: number): void;
  SetMinorRadius(MinorRadius: number): void;
  Elips2d(): gp_Elips2d;
  ReversedParameter(U: number): number;
  Directrix1(): gp_Ax2d;
  Directrix2(): gp_Ax2d;
  Eccentricity(): number;
  Focal(): number;
  Focus1(): gp_Pnt2d;
  Focus2(): gp_Pnt2d;
  MajorRadius(): number;
  MinorRadius(): number;
  Parameter(): number;
  FirstParameter(): number;
  LastParameter(): number;
  IsClosed(): boolean;
  IsPeriodic(): boolean;
  EvalD0(U: number): gp_Pnt2d;
  EvalD1(U: number): any;
  EvalD2(U: number): any;
  EvalD3(U: number): any;
  EvalDN(U: number, N: number): gp_Vec2d;
  Transform(T: gp_Trsf2d): void;
  Copy(): Geom2d_Geometry;
  static get_type_name(): string;
  static get_type_descriptor(): Standard_Type;
  DynamicType(): Standard_Type;
  delete(): void;
}

  export declare class Geom2d_Ellipse_1 extends Geom2d_Ellipse {
    constructor(E: gp_Elips2d);
  }

  export declare class Geom2d_Ellipse_2 extends Geom2d_Ellipse {
    constructor(MajorAxis: gp_Ax2d, MajorRadius: number, MinorRadius: number, Sense: boolean);
  }

  export declare class Geom2d_Ellipse_3 extends Geom2d_Ellipse {
    constructor(Axis: gp_Ax22d, MajorRadius: number, MinorRadius: number);
  }

export declare class Geom2dAdaptor_Curve extends Adaptor2d_Curve2d {
  static get_type_name(): string;
  static get_type_descriptor(): Standard_Type;
  DynamicType(): Standard_Type;
  ShallowCopy(): Adaptor2d_Curve2d;
  Reset(): void;
  Load_1(theCurve: Geom2d_Curve): void;
  Load_2(theCurve: Geom2d_Curve, theUFirst: number, theULast: number): void;
  Curve(): Geom2d_Curve;
  FirstParameter(): number;
  LastParameter(): number;
  Continuity(): GeomAbs_Shape;
  NbIntervals(S: GeomAbs_Shape): number;
  Intervals(T: TColStd_Array1OfReal, S: GeomAbs_Shape): void;
  Trim(First: number, Last: number, Tol: number): Adaptor2d_Curve2d;
  IsClosed(): boolean;
  IsPeriodic(): boolean;
  Period(): number;
  Value(U: number): gp_Pnt2d;
  D0(U: number, P: gp_Pnt2d): void;
  D1(U: number, P: gp_Pnt2d, V: gp_Vec2d): void;
  D2(U: number, P: gp_Pnt2d, V1: gp_Vec2d, V2: gp_Vec2d): void;
  D3(U: number, P: gp_Pnt2d, V1: gp_Vec2d, V2: gp_Vec2d, V3: gp_Vec2d): void;
  DN(U: number, N: number): gp_Vec2d;
  Resolution(Ruv: number): number;
  GetType(): GeomAbs_CurveType;
  Line(): gp_Lin2d;
  Circle(): gp_Circ2d;
  Ellipse(): gp_Elips2d;
  Hyperbola(): gp_Hypr2d;
  Parabola(): gp_Parab2d;
  Degree(): number;
  IsRational(): boolean;
  NbPoles(): number;
  NbKnots(): number;
  NbSamples(): number;
  Bezier(): Geom2d_BezierCurve;
  BSpline(): Geom2d_BSplineCurve;
  EvalD0(U: number): gp_Pnt2d;
  EvalD1(U: number): any;
  EvalD2(U: number): any;
  EvalD3(U: number): any;
  EvalDN(U: number, N: number): gp_Vec2d;
  delete(): void;
}

  export declare class Geom2dAdaptor_Curve_1 extends Geom2dAdaptor_Curve {
    constructor();
  }

  export declare class Geom2dAdaptor_Curve_2 extends Geom2dAdaptor_Curve {
    constructor(C: Geom2d_Curve);
  }

  export declare class Geom2dAdaptor_Curve_3 extends Geom2dAdaptor_Curve {
    constructor(C: Geom2d_Curve, UFirst: number, ULast: number);
  }

export declare class Adaptor2d_Curve2d extends Standard_Transient {
  constructor();
  static get_type_name(): string;
  static get_type_descriptor(): Standard_Type;
  DynamicType(): Standard_Type;
  ShallowCopy(): Adaptor2d_Curve2d;
  FirstParameter(): number;
  LastParameter(): number;
  Continuity(): GeomAbs_Shape;
  NbIntervals(S: GeomAbs_Shape): number;
  Intervals(T: TColStd_Array1OfReal, S: GeomAbs_Shape): void;
  Trim(First: number, Last: number, Tol: number): Adaptor2d_Curve2d;
  IsClosed(): boolean;
  IsPeriodic(): boolean;
  Period(): number;
  Value(U: number): gp_Pnt2d;
  D0(U: number, P: gp_Pnt2d): void;
  D1(U: number, P: gp_Pnt2d, V: gp_Vec2d): void;
  D2(U: number, P: gp_Pnt2d, V1: gp_Vec2d, V2: gp_Vec2d): void;
  D3(U: number, P: gp_Pnt2d, V1: gp_Vec2d, V2: gp_Vec2d, V3: gp_Vec2d): void;
  DN(U: number, N: number): gp_Vec2d;
  Resolution(R3d: number): number;
  GetType(): GeomAbs_CurveType;
  Line(): gp_Lin2d;
  Circle(): gp_Circ2d;
  Ellipse(): gp_Elips2d;
  Hyperbola(): gp_Hypr2d;
  Parabola(): gp_Parab2d;
  Degree(): number;
  IsRational(): boolean;
  NbPoles(): number;
  NbKnots(): number;
  NbSamples(): number;
  Bezier(): Geom2d_BezierCurve;
  BSpline(): Geom2d_BSplineCurve;
  EvalD0(U: number): gp_Pnt2d;
  EvalD1(U: number): any;
  EvalD2(U: number): any;
  EvalD3(U: number): any;
  EvalDN(U: number, N: number): gp_Vec2d;
  delete(): void;
}

export declare class GeomTools {
  constructor();
  static SetUndefinedTypeHandler(aHandler: GeomTools_UndefinedTypeHandler): void;
  static GetUndefinedTypeHandler(): GeomTools_UndefinedTypeHandler;
  delete(): void;
}

export declare class Geom2dConvert {
  constructor();
  static SplitBSplineCurve_1(C: Geom2d_BSplineCurve, FromK1: number, ToK2: number, SameOrientation: boolean): Geom2d_BSplineCurve;
  static SplitBSplineCurve_2(C: Geom2d_BSplineCurve, FromU1: number, ToU2: number, ParametricTolerance: number, SameOrientation: boolean): Geom2d_BSplineCurve;
  static CurveToBSplineCurve(C: Geom2d_Curve, Parameterisation: Convert_ParameterisationType): Geom2d_BSplineCurve;
  static ConcatG1(ArrayOfCurves: any, ArrayOfToler: TColStd_Array1OfReal, ArrayOfConcatenated: NCollection_HArray1<occ::handle<Geom2d_BSplineCurve>>, ClosedFlag: boolean, ClosedTolerance: number): void;
  static ConcatC1_1(ArrayOfCurves: any, ArrayOfToler: TColStd_Array1OfReal, ArrayOfIndices: NCollection_HArray1<int>, ArrayOfConcatenated: NCollection_HArray1<occ::handle<Geom2d_BSplineCurve>>, ClosedFlag: boolean, ClosedTolerance: number): void;
  static ConcatC1_2(ArrayOfCurves: any, ArrayOfToler: TColStd_Array1OfReal, ArrayOfIndices: NCollection_HArray1<int>, ArrayOfConcatenated: NCollection_HArray1<occ::handle<Geom2d_BSplineCurve>>, ClosedFlag: boolean, ClosedTolerance: number, AngularTolerance: number): void;
  static C0BSplineToC1BSplineCurve(BS: Geom2d_BSplineCurve, Tolerance: number): void;
  static C0BSplineToArrayOfC1BSplineCurve_1(BS: Geom2d_BSplineCurve, tabBS: NCollection_HArray1<occ::handle<Geom2d_BSplineCurve>>, Tolerance: number): void;
  static C0BSplineToArrayOfC1BSplineCurve_2(BS: Geom2d_BSplineCurve, tabBS: NCollection_HArray1<occ::handle<Geom2d_BSplineCurve>>, AngularTolerance: number, Tolerance: number): void;
  delete(): void;
}

export declare class Geom2dConvert_BSplineCurveToBezierCurve {
  Arc(Index: number): Geom2d_BezierCurve;
  Arcs(Curves: any): void;
  Knots(TKnots: TColStd_Array1OfReal): void;
  NbArcs(): number;
  delete(): void;
}

  export declare class Geom2dConvert_BSplineCurveToBezierCurve_1 extends Geom2dConvert_BSplineCurveToBezierCurve {
    constructor(BasisCurve: Geom2d_BSplineCurve);
  }

  export declare class Geom2dConvert_BSplineCurveToBezierCurve_2 extends Geom2dConvert_BSplineCurveToBezierCurve {
    constructor(BasisCurve: Geom2d_BSplineCurve, U1: number, U2: number, ParametricTolerance: number);
  }

export declare class GeomLib {
  constructor();
  static To3d(Position: gp_Ax2, Curve2d: Geom2d_Curve): Geom_Curve;
  static GTransform(Curve: Geom2d_Curve, GTrsf: gp_GTrsf2d): Geom2d_Curve;
  static SameRange(Tolerance: number, Curve2dPtr: Geom2d_Curve, First: number, Last: number, RequestedFirst: number, RequestedLast: number, NewCurve2dPtr: Geom2d_Curve): void;
  static BuildCurve3d(Tolerance: number, CurvePtr: Adaptor3d_CurveOnSurface, FirstParameter: number, LastParameter: number, NewCurvePtr: Geom_Curve, MaxDeviation: number, AverageDeviation: number, Continuity: GeomAbs_Shape, MaxDegree: number, MaxSegment: number): void;
  static AdjustExtremity(Curve: Geom_BoundedCurve, P1: gp_Pnt, P2: gp_Pnt, T1: gp_Vec, T2: gp_Vec): void;
  static ExtendCurveToPoint(Curve: Geom_BoundedCurve, Point: gp_Pnt, Cont: number, After: boolean): void;
  static ExtendSurfByLength(Surf: Geom_BoundedSurface, Length: number, Cont: number, InU: boolean, After: boolean): void;
  static AxeOfInertia(Points: TColgp_Array1OfPnt, Axe: gp_Ax2, IsSingular: boolean, Tol: number): void;
  static Inertia(Points: TColgp_Array1OfPnt, Bary: gp_Pnt, XDir: gp_Dir, YDir: gp_Dir, Xgap: number, YGap: number, ZGap: number): void;
  static RemovePointsFromArray(NumPoints: number, InParameters: TColStd_Array1OfReal, OutParameters: NCollection_HArray1<double>): void;
  static DensifyArray1OfReal(MinNumPoints: number, InParameters: TColStd_Array1OfReal, OutParameters: NCollection_HArray1<double>): void;
  static FuseIntervals(Interval1: TColStd_Array1OfReal, Interval2: TColStd_Array1OfReal, Fusion: TColStd_SequenceOfReal, Confusion: number, IsAdjustToFirstInterval: boolean): void;
  static EvalMaxParametricDistance(Curve: Adaptor3d_Curve, AReferenceCurve: Adaptor3d_Curve, Tolerance: number, Parameters: TColStd_Array1OfReal, MaxDistance: number): void;
  static EvalMaxDistanceAlongParameter(Curve: Adaptor3d_Curve, AReferenceCurve: Adaptor3d_Curve, Tolerance: number, Parameters: TColStd_Array1OfReal, MaxDistance: number): void;
  static CancelDenominatorDerivative(BSurf: Geom_BSplineSurface, UDirection: boolean, VDirection: boolean): void;
  static NormEstim(theSurf: Geom_Surface, theUV: gp_Pnt2d, theTol: number, theNorm: gp_Dir): number;
  static IsClosed(S: Geom_Surface, Tol: number, isUClosed: boolean, isVClosed: boolean): void;
  static IsBSplUClosed(S: Geom_BSplineSurface, U1: number, U2: number, Tol: number): boolean;
  static IsBSplVClosed(S: Geom_BSplineSurface, V1: number, V2: number, Tol: number): boolean;
  static IsBzUClosed(S: Geom_BezierSurface, U1: number, U2: number, Tol: number): boolean;
  static IsBzVClosed(S: Geom_BezierSurface, V1: number, V2: number, Tol: number): boolean;
  static isIsoLine(theC2D: Adaptor2d_Curve2d, theIsU: boolean, theParam: number, theIsForward: boolean): boolean;
  static buildC3dOnIsoLine(theC2D: Adaptor2d_Curve2d, theSurf: Adaptor3d_Surface, theFirst: number, theLast: number, theTolerance: number, theIsU: boolean, theParam: number, theIsForward: boolean): Geom_Curve;
  delete(): void;
}

export declare class GCE2d_MakeArcOfEllipse extends GCE2d_Root {
  Value(): Geom2d_TrimmedCurve;
  delete(): void;
}

  export declare class GCE2d_MakeArcOfEllipse_1 extends GCE2d_MakeArcOfEllipse {
    constructor(Elips: gp_Elips2d, Alpha1: number, Alpha2: number, Sense: boolean);
  }

  export declare class GCE2d_MakeArcOfEllipse_2 extends GCE2d_MakeArcOfEllipse {
    constructor(Elips: gp_Elips2d, P: gp_Pnt2d, Alpha: number, Sense: boolean);
  }

  export declare class GCE2d_MakeArcOfEllipse_3 extends GCE2d_MakeArcOfEllipse {
    constructor(Elips: gp_Elips2d, P1: gp_Pnt2d, P2: gp_Pnt2d, Sense: boolean);
  }

export declare class GCE2d_MakeEllipse extends GCE2d_Root {
  Value(): Geom2d_Ellipse;
  delete(): void;
}

  export declare class GCE2d_MakeEllipse_1 extends GCE2d_MakeEllipse {
    constructor(E: gp_Elips2d);
  }

  export declare class GCE2d_MakeEllipse_2 extends GCE2d_MakeEllipse {
    constructor(MajorAxis: gp_Ax2d, MajorRadius: number, MinorRadius: number, Sense: boolean);
  }

  export declare class GCE2d_MakeEllipse_3 extends GCE2d_MakeEllipse {
    constructor(Axis: gp_Ax22d, MajorRadius: number, MinorRadius: number);
  }

  export declare class GCE2d_MakeEllipse_4 extends GCE2d_MakeEllipse {
    constructor(S1: gp_Pnt2d, S2: gp_Pnt2d, Center: gp_Pnt2d);
  }

export declare class GCE2d_MakeSegment extends GCE2d_Root {
  Value(): Geom2d_TrimmedCurve;
  delete(): void;
}

  export declare class GCE2d_MakeSegment_1 extends GCE2d_MakeSegment {
    constructor(P1: gp_Pnt2d, P2: gp_Pnt2d);
  }

  export declare class GCE2d_MakeSegment_2 extends GCE2d_MakeSegment {
    constructor(P1: gp_Pnt2d, V: gp_Dir2d, P2: gp_Pnt2d);
  }

  export declare class GCE2d_MakeSegment_3 extends GCE2d_MakeSegment {
    constructor(Line: gp_Lin2d, U1: number, U2: number);
  }

  export declare class GCE2d_MakeSegment_4 extends GCE2d_MakeSegment {
    constructor(Line: gp_Lin2d, Point: gp_Pnt2d, Ulast: number);
  }

  export declare class GCE2d_MakeSegment_5 extends GCE2d_MakeSegment {
    constructor(Line: gp_Lin2d, P1: gp_Pnt2d, P2: gp_Pnt2d);
  }

export declare class GCE2d_MakeArcOfCircle extends GCE2d_Root {
  Value(): Geom2d_TrimmedCurve;
  delete(): void;
}

  export declare class GCE2d_MakeArcOfCircle_1 extends GCE2d_MakeArcOfCircle {
    constructor(Circ: gp_Circ2d, Alpha1: number, Alpha2: number, Sense: boolean);
  }

  export declare class GCE2d_MakeArcOfCircle_2 extends GCE2d_MakeArcOfCircle {
    constructor(Circ: gp_Circ2d, P: gp_Pnt2d, Alpha: number, Sense: boolean);
  }

  export declare class GCE2d_MakeArcOfCircle_3 extends GCE2d_MakeArcOfCircle {
    constructor(Circ: gp_Circ2d, P1: gp_Pnt2d, P2: gp_Pnt2d, Sense: boolean);
  }

  export declare class GCE2d_MakeArcOfCircle_4 extends GCE2d_MakeArcOfCircle {
    constructor(P1: gp_Pnt2d, P2: gp_Pnt2d, P3: gp_Pnt2d);
  }

  export declare class GCE2d_MakeArcOfCircle_5 extends GCE2d_MakeArcOfCircle {
    constructor(P1: gp_Pnt2d, V: gp_Vec2d, P2: gp_Pnt2d);
  }

export declare class GCE2d_MakeCircle extends GCE2d_Root {
  Value(): Geom2d_Circle;
  delete(): void;
}

  export declare class GCE2d_MakeCircle_1 extends GCE2d_MakeCircle {
    constructor(C: gp_Circ2d);
  }

  export declare class GCE2d_MakeCircle_2 extends GCE2d_MakeCircle {
    constructor(A: gp_Ax2d, Radius: number, Sense: boolean);
  }

  export declare class GCE2d_MakeCircle_3 extends GCE2d_MakeCircle {
    constructor(A: gp_Ax22d, Radius: number);
  }

  export declare class GCE2d_MakeCircle_4 extends GCE2d_MakeCircle {
    constructor(Circ: gp_Circ2d, Dist: number);
  }

  export declare class GCE2d_MakeCircle_5 extends GCE2d_MakeCircle {
    constructor(Circ: gp_Circ2d, Point: gp_Pnt2d);
  }

  export declare class GCE2d_MakeCircle_6 extends GCE2d_MakeCircle {
    constructor(P1: gp_Pnt2d, P2: gp_Pnt2d, P3: gp_Pnt2d);
  }

  export declare class GCE2d_MakeCircle_7 extends GCE2d_MakeCircle {
    constructor(P: gp_Pnt2d, Radius: number, Sense: boolean);
  }

  export declare class GCE2d_MakeCircle_8 extends GCE2d_MakeCircle {
    constructor(Center: gp_Pnt2d, Point: gp_Pnt2d, Sense: boolean);
  }

export declare class GCE2d_Root {
  constructor();
  IsDone(): boolean;
  Status(): gce_ErrorType;
  delete(): void;
}

export declare type Extrema_ExtAlgo = {
  Extrema_ExtAlgo_Grad: {};
  Extrema_ExtAlgo_Tree: {};
}

export declare class GCPnts_TangentialDeflection {
  Initialize_1(theC: Adaptor3d_Curve, theAngularDeflection: number, theCurvatureDeflection: number, theMinimumOfPoints: number, theUTol: number, theMinLen: number): void;
  Initialize_2(theC: Adaptor3d_Curve, theFirstParameter: number, theLastParameter: number, theAngularDeflection: number, theCurvatureDeflection: number, theMinimumOfPoints: number, theUTol: number, theMinLen: number): void;
  Initialize_3(theC: Adaptor2d_Curve2d, theAngularDeflection: number, theCurvatureDeflection: number, theMinimumOfPoints: number, theUTol: number, theMinLen: number): void;
  Initialize_4(theC: Adaptor2d_Curve2d, theFirstParameter: number, theLastParameter: number, theAngularDeflection: number, theCurvatureDeflection: number, theMinimumOfPoints: number, theUTol: number, theMinLen: number): void;
  AddPoint(thePnt: gp_Pnt, theParam: number, theIsReplace: boolean): number;
  NbPoints(): number;
  Parameter(I: number): number;
  Value(I: number): gp_Pnt;
  static ArcAngularStep(theRadius: number, theLinearDeflection: number, theAngularDeflection: number, theMinLength: number): number;
  delete(): void;
}

  export declare class GCPnts_TangentialDeflection_1 extends GCPnts_TangentialDeflection {
    constructor();
  }

  export declare class GCPnts_TangentialDeflection_2 extends GCPnts_TangentialDeflection {
    constructor(theC: Adaptor3d_Curve, theAngularDeflection: number, theCurvatureDeflection: number, theMinimumOfPoints: number, theUTol: number, theMinLen: number);
  }

  export declare class GCPnts_TangentialDeflection_3 extends GCPnts_TangentialDeflection {
    constructor(theC: Adaptor3d_Curve, theFirstParameter: number, theLastParameter: number, theAngularDeflection: number, theCurvatureDeflection: number, theMinimumOfPoints: number, theUTol: number, theMinLen: number);
  }

  export declare class GCPnts_TangentialDeflection_4 extends GCPnts_TangentialDeflection {
    constructor(theC: Adaptor2d_Curve2d, theAngularDeflection: number, theCurvatureDeflection: number, theMinimumOfPoints: number, theUTol: number, theMinLen: number);
  }

  export declare class GCPnts_TangentialDeflection_5 extends GCPnts_TangentialDeflection {
    constructor(theC: Adaptor2d_Curve2d, theFirstParameter: number, theLastParameter: number, theAngularDeflection: number, theCurvatureDeflection: number, theMinimumOfPoints: number, theUTol: number, theMinLen: number);
  }

export declare class GC_MakeArcOfCircle extends GC_Root {
  Value(): Geom_TrimmedCurve;
  delete(): void;
}

  export declare class GC_MakeArcOfCircle_1 extends GC_MakeArcOfCircle {
    constructor(Circ: gp_Circ, Alpha1: number, Alpha2: number, Sense: boolean);
  }

  export declare class GC_MakeArcOfCircle_2 extends GC_MakeArcOfCircle {
    constructor(Circ: gp_Circ, P: gp_Pnt, Alpha: number, Sense: boolean);
  }

  export declare class GC_MakeArcOfCircle_3 extends GC_MakeArcOfCircle {
    constructor(Circ: gp_Circ, P1: gp_Pnt, P2: gp_Pnt, Sense: boolean);
  }

  export declare class GC_MakeArcOfCircle_4 extends GC_MakeArcOfCircle {
    constructor(P1: gp_Pnt, P2: gp_Pnt, P3: gp_Pnt);
  }

  export declare class GC_MakeArcOfCircle_5 extends GC_MakeArcOfCircle {
    constructor(P1: gp_Pnt, V: gp_Vec, P2: gp_Pnt);
  }

export declare class GC_Root {
  constructor();
  IsDone(): boolean;
  Status(): gce_ErrorType;
  delete(): void;
}

export declare class BndLib_Add2dCurve {
  constructor();
  static Add_1(C: Adaptor2d_Curve2d, Tol: number, B: Bnd_Box2d): void;
  static Add_2(C: Adaptor2d_Curve2d, U1: number, U2: number, Tol: number, B: Bnd_Box2d): void;
  static Add_3(C: Geom2d_Curve, Tol: number, Box: Bnd_Box2d): void;
  static Add_4(C: Geom2d_Curve, U1: number, U2: number, Tol: number, B: Bnd_Box2d): void;
  static AddOptimal(C: Geom2d_Curve, U1: number, U2: number, Tol: number, B: Bnd_Box2d): void;
  delete(): void;
}

export declare class GeomConvert {
  constructor();
  static SplitBSplineCurve_1(C: Geom_BSplineCurve, FromK1: number, ToK2: number, SameOrientation: boolean): Geom_BSplineCurve;
  static SplitBSplineCurve_2(C: Geom_BSplineCurve, FromU1: number, ToU2: number, ParametricTolerance: number, SameOrientation: boolean): Geom_BSplineCurve;
  static SplitBSplineSurface_1(S: Geom_BSplineSurface, FromUK1: number, ToUK2: number, FromVK1: number, ToVK2: number, SameUOrientation: boolean, SameVOrientation: boolean): Geom_BSplineSurface;
  static SplitBSplineSurface_2(S: Geom_BSplineSurface, FromK1: number, ToK2: number, USplit: boolean, SameOrientation: boolean): Geom_BSplineSurface;
  static SplitBSplineSurface_3(S: Geom_BSplineSurface, FromU1: number, ToU2: number, FromV1: number, ToV2: number, ParametricTolerance: number, SameUOrientation: boolean, SameVOrientation: boolean): Geom_BSplineSurface;
  static SplitBSplineSurface_4(S: Geom_BSplineSurface, FromParam1: number, ToParam2: number, USplit: boolean, ParametricTolerance: number, SameOrientation: boolean): Geom_BSplineSurface;
  static CurveToBSplineCurve(C: Geom_Curve, Parameterisation: Convert_ParameterisationType): Geom_BSplineCurve;
  static SurfaceToBSplineSurface(S: Geom_Surface): Geom_BSplineSurface;
  static ConcatG1(ArrayOfCurves: any, ArrayOfToler: TColStd_Array1OfReal, ArrayOfConcatenated: NCollection_HArray1<occ::handle<Geom_BSplineCurve>>, ClosedFlag: boolean, ClosedTolerance: number): void;
  static ConcatC1_1(ArrayOfCurves: any, ArrayOfToler: TColStd_Array1OfReal, ArrayOfIndices: NCollection_HArray1<int>, ArrayOfConcatenated: NCollection_HArray1<occ::handle<Geom_BSplineCurve>>, ClosedFlag: boolean, ClosedTolerance: number): void;
  static ConcatC1_2(ArrayOfCurves: any, ArrayOfToler: TColStd_Array1OfReal, ArrayOfIndices: NCollection_HArray1<int>, ArrayOfConcatenated: NCollection_HArray1<occ::handle<Geom_BSplineCurve>>, ClosedFlag: boolean, ClosedTolerance: number, AngularTolerance: number): void;
  static C0BSplineToC1BSplineCurve(BS: Geom_BSplineCurve, tolerance: number, AngularTolerance: number): void;
  static C0BSplineToArrayOfC1BSplineCurve_1(BS: Geom_BSplineCurve, tabBS: NCollection_HArray1<occ::handle<Geom_BSplineCurve>>, tolerance: number): void;
  static C0BSplineToArrayOfC1BSplineCurve_2(BS: Geom_BSplineCurve, tabBS: NCollection_HArray1<occ::handle<Geom_BSplineCurve>>, AngularTolerance: number, tolerance: number): void;
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
  IsNull(): boolean;
  Nullify(): void;
  Location_1(): TopLoc_Location;
  Location_2(theLoc: TopLoc_Location, theRaiseExc: boolean): void;
  Located(theLoc: TopLoc_Location, theRaiseExc: boolean): TopoDS_Shape;
  Orientation_1(): TopAbs_Orientation;
  Orientation_2(theOrient: TopAbs_Orientation): void;
  Oriented(theOrient: TopAbs_Orientation): TopoDS_Shape;
  TShape_1(): TopoDS_TShape;
  ShapeType(): TopAbs_ShapeEnum;
  Free_1(): boolean;
  Free_2(theIsFree: boolean): void;
  Locked_1(): boolean;
  Locked_2(theIsLocked: boolean): void;
  Modified_1(): boolean;
  Modified_2(theIsModified: boolean): void;
  Checked_1(): boolean;
  Checked_2(theIsChecked: boolean): void;
  Orientable_1(): boolean;
  Orientable_2(theIsOrientable: boolean): void;
  Closed_1(): boolean;
  Closed_2(theIsClosed: boolean): void;
  Infinite_1(): boolean;
  Infinite_2(theIsInfinite: boolean): void;
  Convex_1(): boolean;
  Convex_2(theIsConvex: boolean): void;
  Move(thePosition: TopLoc_Location, theRaiseExc: boolean): void;
  Moved(thePosition: TopLoc_Location, theRaiseExc: boolean): TopoDS_Shape;
  Reverse(): void;
  Reversed(): TopoDS_Shape;
  Complement(): void;
  Complemented(): TopoDS_Shape;
  Compose(theOrient: TopAbs_Orientation): void;
  Composed(theOrient: TopAbs_Orientation): TopoDS_Shape;
  NbChildren(): number;
  IsPartner(theOther: TopoDS_Shape): boolean;
  IsSame(theOther: TopoDS_Shape): boolean;
  IsEqual(theOther: TopoDS_Shape): boolean;
  IsNotEqual(theOther: TopoDS_Shape): boolean;
  EmptyCopy(): void;
  EmptyCopied(): TopoDS_Shape;
  TShape_2(theTShape: TopoDS_TShape): void;
  delete(): void;
}

export declare class BRepTools {
  constructor();
  static UVBounds_1(F: TopoDS_Face, UMin: number, UMax: number, VMin: number, VMax: number): void;
  static UVBounds_2(F: TopoDS_Face, W: TopoDS_Wire, UMin: number, UMax: number, VMin: number, VMax: number): void;
  static UVBounds_3(F: TopoDS_Face, E: TopoDS_Edge, UMin: number, UMax: number, VMin: number, VMax: number): void;
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
  static Clean(theShape: TopoDS_Shape, theForce: boolean): void;
  static CleanGeometry(theShape: TopoDS_Shape): void;
  static RemoveUnusedPCurves(S: TopoDS_Shape): void;
  static Triangulation(theShape: TopoDS_Shape, theLinDefl: number, theToCheckFreeEdges: boolean): boolean;
  static LoadTriangulation(theShape: TopoDS_Shape, theTriangulationIdx: number, theToSetAsActive: boolean, theFileSystem: OSD_FileSystem): boolean;
  static UnloadTriangulation(theShape: TopoDS_Shape, theTriangulationIdx: number): boolean;
  static ActivateTriangulation(theShape: TopoDS_Shape, theTriangulationIdx: number, theToActivateStrictly: boolean): boolean;
  static LoadAllTriangulations(theShape: TopoDS_Shape, theFileSystem: OSD_FileSystem): boolean;
  static UnloadAllTriangulations(theShape: TopoDS_Shape): boolean;
  static Compare_1(V1: TopoDS_Vertex, V2: TopoDS_Vertex): boolean;
  static Compare_2(E1: TopoDS_Edge, E2: TopoDS_Edge): boolean;
  static OuterWire(F: TopoDS_Face): TopoDS_Wire;
  static Map3DEdges(S: TopoDS_Shape, M: TopTools_IndexedMapOfShape): void;
  static IsReallyClosed(E: TopoDS_Edge, F: TopoDS_Face): boolean;
  static DetectClosedness(theFace: TopoDS_Face, theUclosed: boolean, theVclosed: boolean): void;
  static Write_3(theShape: TopoDS_Shape, theFile: string, theProgress: Message_ProgressRange): boolean;
  static Write_4(theShape: TopoDS_Shape, theFile: string, theWithTriangles: boolean, theWithNormals: boolean, theVersion: TopTools_FormatVersion, theProgress: Message_ProgressRange): boolean;
  static Read_2(Sh: TopoDS_Shape, File: string, B: BRep_Builder, theProgress: Message_ProgressRange): boolean;
  static EvalAndUpdateTol(theE: TopoDS_Edge, theC3d: Geom_Curve, theC2d: Geom2d_Curve, theS: Geom_Surface, theF: number, theL: number): number;
  static OriEdgeInFace(theEdge: TopoDS_Edge, theFace: TopoDS_Face): TopAbs_Orientation;
  static RemoveInternals(theS: TopoDS_Shape, theForce: boolean): void;
  static CheckLocations(theS: TopoDS_Shape, theProblemShapes: TopTools_ListOfShape): void;
  delete(): void;
}

export declare class BRep_Tool {
  constructor();
  static IsClosed_1(S: TopoDS_Shape): boolean;
  static Surface_1(F: TopoDS_Face, L: TopLoc_Location): Geom_Surface;
  static Surface_2(F: TopoDS_Face): Geom_Surface;
  static Triangulation(theFace: TopoDS_Face, theLocation: TopLoc_Location, theMeshPurpose: Poly_MeshPurpose): Poly_Triangulation;
  static Triangulations(theFace: TopoDS_Face, theLocation: TopLoc_Location): any;
  static Tolerance_1(F: TopoDS_Face): number;
  static NaturalRestriction(F: TopoDS_Face): boolean;
  static IsGeometric_1(F: TopoDS_Face): boolean;
  static IsGeometric_2(E: TopoDS_Edge): boolean;
  static Curve_1(E: TopoDS_Edge, L: TopLoc_Location, First: number, Last: number): Geom_Curve;
  static Curve_2(E: TopoDS_Edge, First: number, Last: number): Geom_Curve;
  static Polygon3D(E: TopoDS_Edge, L: TopLoc_Location): Poly_Polygon3D;
  static CurveOnSurface_1(E: TopoDS_Edge, F: TopoDS_Face, First: number, Last: number, theIsStored: boolean): Geom2d_Curve;
  static CurveOnSurface_2(E: TopoDS_Edge, S: Geom_Surface, L: TopLoc_Location, First: number, Last: number, theIsStored: boolean): Geom2d_Curve;
  static CurveOnPlane(E: TopoDS_Edge, S: Geom_Surface, L: TopLoc_Location, First: number, Last: number): Geom2d_Curve;
  static CurveOnSurface_3(E: TopoDS_Edge, C: Geom2d_Curve, S: Geom_Surface, L: TopLoc_Location, First: number, Last: number): void;
  static CurveOnSurface_4(E: TopoDS_Edge, C: Geom2d_Curve, S: Geom_Surface, L: TopLoc_Location, First: number, Last: number, Index: number): void;
  static PolygonOnSurface_1(E: TopoDS_Edge, F: TopoDS_Face): Poly_Polygon2D;
  static PolygonOnSurface_2(E: TopoDS_Edge, S: Geom_Surface, L: TopLoc_Location): Poly_Polygon2D;
  static PolygonOnSurface_3(E: TopoDS_Edge, C: Poly_Polygon2D, S: Geom_Surface, L: TopLoc_Location): void;
  static PolygonOnSurface_4(E: TopoDS_Edge, C: Poly_Polygon2D, S: Geom_Surface, L: TopLoc_Location, Index: number): void;
  static PolygonOnTriangulation_1(E: TopoDS_Edge, T: Poly_Triangulation, L: TopLoc_Location): Poly_PolygonOnTriangulation;
  static PolygonOnTriangulation_2(E: TopoDS_Edge, P: Poly_PolygonOnTriangulation, T: Poly_Triangulation, L: TopLoc_Location): void;
  static PolygonOnTriangulation_3(E: TopoDS_Edge, P: Poly_PolygonOnTriangulation, T: Poly_Triangulation, L: TopLoc_Location, Index: number): void;
  static IsClosed_2(E: TopoDS_Edge, F: TopoDS_Face): boolean;
  static IsClosed_3(E: TopoDS_Edge, S: Geom_Surface, L: TopLoc_Location): boolean;
  static IsClosed_4(E: TopoDS_Edge, T: Poly_Triangulation, L: TopLoc_Location): boolean;
  static Tolerance_2(E: TopoDS_Edge): number;
  static SameParameter(E: TopoDS_Edge): boolean;
  static SameRange(E: TopoDS_Edge): boolean;
  static Degenerated(E: TopoDS_Edge): boolean;
  static Range_1(E: TopoDS_Edge, First: number, Last: number): void;
  static Range_2(E: TopoDS_Edge, S: Geom_Surface, L: TopLoc_Location, First: number, Last: number): void;
  static Range_3(E: TopoDS_Edge, F: TopoDS_Face, First: number, Last: number): void;
  static UVPoints_1(E: TopoDS_Edge, S: Geom_Surface, L: TopLoc_Location, PFirst: gp_Pnt2d, PLast: gp_Pnt2d): void;
  static UVPoints_2(E: TopoDS_Edge, F: TopoDS_Face, PFirst: gp_Pnt2d, PLast: gp_Pnt2d): void;
  static SetUVPoints_1(E: TopoDS_Edge, S: Geom_Surface, L: TopLoc_Location, PFirst: gp_Pnt2d, PLast: gp_Pnt2d): void;
  static SetUVPoints_2(E: TopoDS_Edge, F: TopoDS_Face, PFirst: gp_Pnt2d, PLast: gp_Pnt2d): void;
  static HasContinuity_1(E: TopoDS_Edge, F1: TopoDS_Face, F2: TopoDS_Face): boolean;
  static Continuity_1(E: TopoDS_Edge, F1: TopoDS_Face, F2: TopoDS_Face): GeomAbs_Shape;
  static HasContinuity_2(E: TopoDS_Edge, S1: Geom_Surface, S2: Geom_Surface, L1: TopLoc_Location, L2: TopLoc_Location): boolean;
  static Continuity_2(E: TopoDS_Edge, S1: Geom_Surface, S2: Geom_Surface, L1: TopLoc_Location, L2: TopLoc_Location): GeomAbs_Shape;
  static HasContinuity_3(E: TopoDS_Edge): boolean;
  static MaxContinuity(theEdge: TopoDS_Edge): GeomAbs_Shape;
  static Pnt(V: TopoDS_Vertex): gp_Pnt;
  static Tolerance_3(V: TopoDS_Vertex): number;
  static Parameter_1(theV: TopoDS_Vertex, theE: TopoDS_Edge, theParam: number): boolean;
  static Parameter_2(V: TopoDS_Vertex, E: TopoDS_Edge): number;
  static Parameter_3(V: TopoDS_Vertex, E: TopoDS_Edge, F: TopoDS_Face): number;
  static Parameter_4(V: TopoDS_Vertex, E: TopoDS_Edge, S: Geom_Surface, L: TopLoc_Location): number;
  static Parameters(V: TopoDS_Vertex, F: TopoDS_Face): gp_Pnt2d;
  static MaxTolerance(theShape: TopoDS_Shape, theSubShape: TopAbs_ShapeEnum): number;
  delete(): void;
}

export declare class BRepAdaptor_Surface extends GeomAdaptor_TransformedSurface {
  static get_type_name(): string;
  static get_type_descriptor(): Standard_Type;
  DynamicType(): Standard_Type;
  ShallowCopy(): Adaptor3d_Surface;
  Initialize(F: TopoDS_Face, Restriction: boolean): void;
  Face(): TopoDS_Face;
  Tolerance(): number;
  delete(): void;
}

  export declare class BRepAdaptor_Surface_1 extends BRepAdaptor_Surface {
    constructor();
  }

  export declare class BRepAdaptor_Surface_2 extends BRepAdaptor_Surface {
    constructor(F: TopoDS_Face, R: boolean);
  }

export declare class BRepAdaptor_CompCurve extends Adaptor3d_Curve {
  static get_type_name(): string;
  static get_type_descriptor(): Standard_Type;
  DynamicType(): Standard_Type;
  ShallowCopy(): Adaptor3d_Curve;
  Initialize_1(W: TopoDS_Wire, KnotByCurvilinearAbcissa: boolean): void;
  Initialize_2(W: TopoDS_Wire, KnotByCurvilinearAbcissa: boolean, First: number, Last: number, Tol: number): void;
  Wire(): TopoDS_Wire;
  Edge(U: number, E: TopoDS_Edge, UonE: number): void;
  FirstParameter(): number;
  LastParameter(): number;
  Continuity(): GeomAbs_Shape;
  NbIntervals(S: GeomAbs_Shape): number;
  Intervals(T: TColStd_Array1OfReal, S: GeomAbs_Shape): void;
  Trim(First: number, Last: number, Tol: number): Adaptor3d_Curve;
  IsClosed(): boolean;
  IsPeriodic(): boolean;
  Period(): number;
  Value(U: number): gp_Pnt;
  D0(U: number, P: gp_Pnt): void;
  D1(U: number, P: gp_Pnt, V: gp_Vec): void;
  D2(U: number, P: gp_Pnt, V1: gp_Vec, V2: gp_Vec): void;
  D3(U: number, P: gp_Pnt, V1: gp_Vec, V2: gp_Vec, V3: gp_Vec): void;
  DN(U: number, N: number): gp_Vec;
  Resolution(R3d: number): number;
  GetType(): GeomAbs_CurveType;
  Line(): gp_Lin;
  Circle(): gp_Circ;
  Ellipse(): gp_Elips;
  Hyperbola(): gp_Hypr;
  Parabola(): gp_Parab;
  Degree(): number;
  IsRational(): boolean;
  NbPoles(): number;
  NbKnots(): number;
  Bezier(): Geom_BezierCurve;
  BSpline(): Geom_BSplineCurve;
  delete(): void;
}

  export declare class BRepAdaptor_CompCurve_1 extends BRepAdaptor_CompCurve {
    constructor();
  }

  export declare class BRepAdaptor_CompCurve_2 extends BRepAdaptor_CompCurve {
    constructor(W: TopoDS_Wire, KnotByCurvilinearAbcissa: boolean);
  }

  export declare class BRepAdaptor_CompCurve_3 extends BRepAdaptor_CompCurve {
    constructor(W: TopoDS_Wire, KnotByCurvilinearAbcissa: boolean, First: number, Last: number, Tol: number);
  }

export declare class BRepAdaptor_Curve extends Adaptor3d_Curve {
  static get_type_name(): string;
  static get_type_descriptor(): Standard_Type;
  DynamicType(): Standard_Type;
  ShallowCopy(): Adaptor3d_Curve;
  Reset(): void;
  Initialize_1(E: TopoDS_Edge): void;
  Initialize_2(E: TopoDS_Edge, F: TopoDS_Face): void;
  Trsf(): gp_Trsf;
  Is3DCurve(): boolean;
  IsCurveOnSurface(): boolean;
  Curve(): GeomAdaptor_Curve;
  CurveOnSurface(): Adaptor3d_CurveOnSurface;
  Edge(): TopoDS_Edge;
  Tolerance(): number;
  FirstParameter(): number;
  LastParameter(): number;
  Continuity(): GeomAbs_Shape;
  NbIntervals(S: GeomAbs_Shape): number;
  Intervals(T: TColStd_Array1OfReal, S: GeomAbs_Shape): void;
  Trim(First: number, Last: number, Tol: number): Adaptor3d_Curve;
  IsClosed(): boolean;
  IsPeriodic(): boolean;
  Period(): number;
  Value(U: number): gp_Pnt;
  D0(U: number, P: gp_Pnt): void;
  D1(U: number, P: gp_Pnt, V: gp_Vec): void;
  D2(U: number, P: gp_Pnt, V1: gp_Vec, V2: gp_Vec): void;
  D3(U: number, P: gp_Pnt, V1: gp_Vec, V2: gp_Vec, V3: gp_Vec): void;
  DN(U: number, N: number): gp_Vec;
  Resolution(R3d: number): number;
  GetType(): GeomAbs_CurveType;
  Line(): gp_Lin;
  Circle(): gp_Circ;
  Ellipse(): gp_Elips;
  Hyperbola(): gp_Hypr;
  Parabola(): gp_Parab;
  Degree(): number;
  IsRational(): boolean;
  NbPoles(): number;
  NbKnots(): number;
  Bezier(): Geom_BezierCurve;
  BSpline(): Geom_BSplineCurve;
  OffsetCurve(): Geom_OffsetCurve;
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
  static get_type_name(): string;
  static get_type_descriptor(): Standard_Type;
  DynamicType(): Standard_Type;
  ShallowCopy(): Adaptor2d_Curve2d;
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
  More(): boolean;
  Next(): void;
  Value(): TopoDS_Shape;
  Current(): TopoDS_Shape;
  ReInit(): void;
  ExploredShape(): TopoDS_Shape;
  Depth(): number;
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
  Read_1(theShape: TopoDS_Shape, theFileName: string): boolean;
  delete(): void;
}

export declare class StlAPI {
  constructor();
  static Write(theShape: TopoDS_Shape, theFile: string, theAsciiMode: boolean): boolean;
  static Read(theShape: TopoDS_Shape, aFile: string): boolean;
  delete(): void;
}

export declare class Interface_Static extends Interface_TypedValue {
  Family(): string;
  SetWild(wildcard: Interface_Static): void;
  Wild(): Interface_Static;
  SetUptodate(): void;
  UpdatedStatus(): boolean;
  static Init_1(family: string, name: string, type: Interface_ParamType, init: string): boolean;
  static Init_2(family: string, name: string, type: string, init: string): boolean;
  static Static(name: string): Interface_Static;
  static IsPresent(name: string): boolean;
  static CDef(name: string, part: string): string;
  static IDef(name: string, part: string): number;
  static IsSet(name: string, proper: boolean): boolean;
  static CVal(name: string): string;
  static IVal(name: string): number;
  static RVal(name: string): number;
  static SetCVal(name: string, val: string): boolean;
  static SetIVal(name: string, val: number): boolean;
  static SetRVal(name: string, val: number): boolean;
  static Update(name: string): boolean;
  static IsUpdated(name: string): boolean;
  static Items(mode: number, criter: string): NCollection_HSequence<occ::handle<TCollection_HAsciiString>>;
  static Standards(): void;
  static FillMap(theMap: any): void;
  static get_type_name(): string;
  static get_type_descriptor(): Standard_Type;
  DynamicType(): Standard_Type;
  delete(): void;
}

  export declare class Interface_Static_1 extends Interface_Static {
    constructor(family: string, name: string, type: Interface_ParamType, init: string);
  }

  export declare class Interface_Static_2 extends Interface_Static {
    constructor(family: string, name: string, other: Interface_Static);
  }

export declare class Interface_TypedValue extends MoniTool_TypedValue {
  constructor(name: string, type: Interface_ParamType, init: string)
  Type(): Interface_ParamType;
  static ParamTypeToValueType(typ: Interface_ParamType): MoniTool_ValueType;
  static ValueTypeToParamType(typ: MoniTool_ValueType): Interface_ParamType;
  static get_type_name(): string;
  static get_type_descriptor(): Standard_Type;
  DynamicType(): Standard_Type;
  delete(): void;
}

export declare class MoniTool_TypedValue extends Standard_Transient {
  Name(): string;
  ValueType(): MoniTool_ValueType;
  Definition(): XCAFDoc_PartId;
  SetDefinition(deftext: string): void;
  AddDef(initext: string): boolean;
  SetLabel(label: string): void;
  Label(): string;
  SetMaxLength(max: number): void;
  MaxLength(): number;
  SetIntegerLimit(max: boolean, val: number): void;
  IntegerLimit(max: boolean, val: number): boolean;
  SetRealLimit(max: boolean, val: number): void;
  RealLimit(max: boolean, val: number): boolean;
  SetUnitDef(def: string): void;
  UnitDef(): string;
  StartEnum(start: number, match: boolean): void;
  AddEnum(v1: string, v2: string, v3: string, v4: string, v5: string, v6: string, v7: string, v8: string, v9: string, v10: string): void;
  AddEnumValue(val: string, num: number): void;
  EnumDef(startcase: number, endcase: number, match: boolean): boolean;
  EnumVal(num: number): string;
  EnumCase(val: string): number;
  SetObjectType(typ: Standard_Type): void;
  ObjectType(): Standard_Type;
  SetInterpret(func: MoniTool_ValueInterpret): void;
  HasInterpret(): boolean;
  SetSatisfies(func: MoniTool_ValueSatisfies, name: string): void;
  SatisfiesName(): string;
  IsSetValue(): boolean;
  CStringValue(): string;
  HStringValue(): TCollection_HAsciiString;
  Interpret(hval: TCollection_HAsciiString, native: boolean): TCollection_HAsciiString;
  Satisfies(hval: TCollection_HAsciiString): boolean;
  ClearValue(): void;
  SetCStringValue(val: string): boolean;
  SetHStringValue(hval: TCollection_HAsciiString): boolean;
  IntegerValue(): number;
  SetIntegerValue(ival: number): boolean;
  RealValue(): number;
  SetRealValue(rval: number): boolean;
  ObjectValue(): Standard_Transient;
  GetObjectValue(val: Standard_Transient): void;
  SetObjectValue(obj: Standard_Transient): boolean;
  ObjectTypeName(): string;
  static AddLib(tv: MoniTool_TypedValue, def: string): boolean;
  static Lib(def: string): MoniTool_TypedValue;
  static FromLib(def: string): MoniTool_TypedValue;
  static LibList(): NCollection_HSequence<TCollection_AsciiString>;
  static StaticValue(name: string): MoniTool_TypedValue;
  static get_type_name(): string;
  static get_type_descriptor(): Standard_Type;
  DynamicType(): Standard_Type;
  delete(): void;
}

  export declare class MoniTool_TypedValue_1 extends MoniTool_TypedValue {
    constructor(name: string, type: MoniTool_ValueType, init: string);
  }

  export declare class MoniTool_TypedValue_2 extends MoniTool_TypedValue {
    constructor(other: MoniTool_TypedValue);
  }

export declare class XSControl_WorkSession extends IFSelect_WorkSession {
  constructor()
  ClearData(theMode: number): void;
  SelectNorm(theNormName: string): boolean;
  SetController(theCtl: XSControl_Controller): void;
  SelectedNorm(theRsc: boolean): string;
  NormAdaptor(): XSControl_Controller;
  Context(): XSControl_WorkSessionMap;
  SetAllContext(theContext: XSControl_WorkSessionMap): void;
  ClearContext(): void;
  InitTransferReader(theMode: number): void;
  SetTransferReader(theTR: XSControl_TransferReader): void;
  TransferReader(): XSControl_TransferReader;
  MapReader(): Transfer_TransientProcess;
  SetMapReader(theTP: Transfer_TransientProcess): boolean;
  Result(theEnt: Standard_Transient, theMode: number): Standard_Transient;
  TransferReadOne(theEnts: Standard_Transient, theProgress: Message_ProgressRange): number;
  TransferReadRoots(theProgress: Message_ProgressRange): number;
  NewModel(): Interface_InterfaceModel;
  TransferWriter(): XSControl_TransferWriter;
  SetMapWriter(theFP: Transfer_FinderProcess): boolean;
  TransferWriteShape(theShape: TopoDS_Shape, theCompGraph: boolean, theProgress: Message_ProgressRange): IFSelect_ReturnStatus;
  Vars(): XSControl_Vars;
  SetVars(theVars: XSControl_Vars): void;
  static get_type_name(): string;
  static get_type_descriptor(): Standard_Type;
  DynamicType(): Standard_Type;
  delete(): void;
}

export declare class XSControl_Reader {
  SetNorm(norm: string): boolean;
  SetWS(WS: XSControl_WorkSession, scratch: boolean): void;
  WS(): XSControl_WorkSession;
  ReadFile(filename: string): IFSelect_ReturnStatus;
  Model(): Interface_InterfaceModel;
  GiveList_1(first: string, second: string): NCollection_HSequence<occ::handle<Standard_Transient>>;
  GiveList_2(first: string, ent: Standard_Transient): NCollection_HSequence<occ::handle<Standard_Transient>>;
  NbRootsForTransfer(): number;
  RootForTransfer(num: number): Standard_Transient;
  TransferOneRoot(num: number, theProgress: Message_ProgressRange): boolean;
  TransferOne(num: number, theProgress: Message_ProgressRange): boolean;
  TransferEntity(start: Standard_Transient, theProgress: Message_ProgressRange): boolean;
  TransferList(list: NCollection_HSequence<occ::handle<Standard_Transient>>, theProgress: Message_ProgressRange): number;
  TransferRoots(theProgress: Message_ProgressRange): number;
  ClearShapes(): void;
  NbShapes(): number;
  Shape(num: number): TopoDS_Shape;
  OneShape(): TopoDS_Shape;
  PrintCheckLoad_1(failsonly: boolean, mode: IFSelect_PrintCount): void;
  PrintCheckTransfer_1(failsonly: boolean, mode: IFSelect_PrintCount): void;
  PrintStatsTransfer_1(what: number, mode: number): void;
  GetStatsTransfer(list: NCollection_HSequence<occ::handle<Standard_Transient>>, nbMapped: number, nbWithResult: number, nbWithFail: number): void;
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
    constructor(norm: string);
  }

  export declare class XSControl_Reader_3 extends XSControl_Reader {
    constructor(WS: XSControl_WorkSession, scratch: boolean);
  }

export declare class IFSelect_WorkSession extends Standard_Transient {
  constructor()
  SetErrorHandle(toHandle: boolean): void;
  ErrorHandle(): boolean;
  ShareOut(): IFSelect_ShareOut;
  SetShareOut(shareout: IFSelect_ShareOut): void;
  SetModeStat(theMode: boolean): void;
  GetModeStat(): boolean;
  SetLibrary(theLib: IFSelect_WorkLibrary): void;
  WorkLibrary(): IFSelect_WorkLibrary;
  SetProtocol(protocol: Interface_Protocol): void;
  Protocol(): Interface_Protocol;
  SetSignType(signtype: IFSelect_Signature): void;
  SignType(): IFSelect_Signature;
  HasModel(): boolean;
  SetModel(model: Interface_InterfaceModel, clearpointed: boolean): void;
  Model(): Interface_InterfaceModel;
  SetLoadedFile(theFileName: string): void;
  LoadedFile(): string;
  ReadFile(filename: string): IFSelect_ReturnStatus;
  NbStartingEntities(): number;
  StartingEntity(num: number): Standard_Transient;
  StartingNumber(ent: Standard_Transient): number;
  NumberFromLabel(val: string, afternum: number): number;
  EntityLabel(ent: Standard_Transient): TCollection_HAsciiString;
  EntityName(ent: Standard_Transient): TCollection_HAsciiString;
  CategoryNumber(ent: Standard_Transient): number;
  CategoryName(ent: Standard_Transient): string;
  ValidityName(ent: Standard_Transient): string;
  ClearData(mode: number): void;
  ComputeGraph(enforce: boolean): boolean;
  HGraph(): Interface_HGraph;
  Graph(): Interface_Graph;
  Shareds(ent: Standard_Transient): NCollection_HSequence<occ::handle<Standard_Transient>>;
  Sharings(ent: Standard_Transient): NCollection_HSequence<occ::handle<Standard_Transient>>;
  IsLoaded(): boolean;
  ComputeCheck(enforce: boolean): boolean;
  MaxIdent(): number;
  Item(id: number): Standard_Transient;
  ItemIdent(item: Standard_Transient): number;
  NamedItem_1(name: string): Standard_Transient;
  NamedItem_2(name: TCollection_HAsciiString): Standard_Transient;
  NameIdent(name: string): number;
  HasName(item: Standard_Transient): boolean;
  Name(item: Standard_Transient): TCollection_HAsciiString;
  AddItem(item: Standard_Transient, active: boolean): number;
  AddNamedItem(name: string, item: Standard_Transient, active: boolean): number;
  SetActive(item: Standard_Transient, mode: boolean): boolean;
  RemoveNamedItem(name: string): boolean;
  RemoveName(name: string): boolean;
  RemoveItem(item: Standard_Transient): boolean;
  ClearItems(): void;
  ItemLabel(id: number): TCollection_HAsciiString;
  ItemIdents(type: Standard_Type): NCollection_HSequence<int>;
  ItemNames(type: Standard_Type): NCollection_HSequence<occ::handle<TCollection_HAsciiString>>;
  ItemNamesForLabel(label: string): NCollection_HSequence<occ::handle<TCollection_HAsciiString>>;
  NextIdentForLabel(label: string, id: number, mode: number): number;
  NewParamFromStatic(statname: string, name: string): Standard_Transient;
  IntParam(id: number): IFSelect_IntParam;
  IntValue(it: IFSelect_IntParam): number;
  NewIntParam(name: string): IFSelect_IntParam;
  SetIntValue(it: IFSelect_IntParam, val: number): boolean;
  TextParam(id: number): TCollection_HAsciiString;
  TextValue(par: TCollection_HAsciiString): XCAFDoc_PartId;
  NewTextParam(name: string): TCollection_HAsciiString;
  SetTextValue(par: TCollection_HAsciiString, val: string): boolean;
  Signature(id: number): IFSelect_Signature;
  SignValue(sign: IFSelect_Signature, ent: Standard_Transient): string;
  Selection(id: number): IFSelect_Selection;
  SelectionResult(sel: IFSelect_Selection): NCollection_HSequence<occ::handle<Standard_Transient>>;
  SelectionResultFromList(sel: IFSelect_Selection, list: NCollection_HSequence<occ::handle<Standard_Transient>>): NCollection_HSequence<occ::handle<Standard_Transient>>;
  SetItemSelection(item: Standard_Transient, sel: IFSelect_Selection): boolean;
  ResetItemSelection(item: Standard_Transient): boolean;
  ItemSelection(item: Standard_Transient): IFSelect_Selection;
  SignCounter(id: number): IFSelect_SignCounter;
  ComputeCounter(counter: IFSelect_SignCounter, forced: boolean): boolean;
  ComputeCounterFromList(counter: IFSelect_SignCounter, list: NCollection_HSequence<occ::handle<Standard_Transient>>, clear: boolean): boolean;
  AppliedDispatches(): NCollection_HSequence<int>;
  ClearShareOut(onlydisp: boolean): void;
  Dispatch(id: number): IFSelect_Dispatch;
  DispatchRank(disp: IFSelect_Dispatch): number;
  ModelCopier(): IFSelect_ModelCopier;
  SetModelCopier(copier: IFSelect_ModelCopier): void;
  NbFinalModifiers(formodel: boolean): number;
  FinalModifierIdents(formodel: boolean): NCollection_HSequence<int>;
  GeneralModifier(id: number): IFSelect_GeneralModifier;
  ModelModifier(id: number): IFSelect_Modifier;
  ModifierRank(item: IFSelect_GeneralModifier): number;
  ChangeModifierRank(formodel: boolean, before: number, after: number): boolean;
  ClearFinalModifiers(): void;
  SetAppliedModifier(modif: IFSelect_GeneralModifier, item: Standard_Transient): boolean;
  ResetAppliedModifier(modif: IFSelect_GeneralModifier): boolean;
  UsesAppliedModifier(modif: IFSelect_GeneralModifier): Standard_Transient;
  Transformer(id: number): IFSelect_Transformer;
  RunTransformer(transf: IFSelect_Transformer): number;
  RunModifier(modif: IFSelect_Modifier, copy: boolean): number;
  RunModifierSelected(modif: IFSelect_Modifier, sel: IFSelect_Selection, copy: boolean): number;
  NewTransformStandard(copy: boolean, name: string): IFSelect_Transformer;
  SetModelContent(sel: IFSelect_Selection, keep: boolean): boolean;
  FilePrefix(): TCollection_HAsciiString;
  DefaultFileRoot(): TCollection_HAsciiString;
  FileExtension(): TCollection_HAsciiString;
  FileRoot(disp: IFSelect_Dispatch): TCollection_HAsciiString;
  SetFilePrefix(name: string): void;
  SetDefaultFileRoot(name: string): boolean;
  SetFileExtension(name: string): void;
  SetFileRoot(disp: IFSelect_Dispatch, name: string): boolean;
  GiveFileRoot(file: string): string;
  GiveFileComplete(file: string): string;
  ClearFile(): void;
  EvaluateFile(): void;
  NbFiles(): number;
  FileModel(num: number): Interface_InterfaceModel;
  FileName(num: number): XCAFDoc_PartId;
  BeginSentFiles(record: boolean): void;
  SentFiles(): NCollection_HSequence<occ::handle<TCollection_HAsciiString>>;
  SendSplit(): boolean;
  EvalSplit(): IFSelect_PacketList;
  MaxSendingCount(): number;
  SetRemaining(mode: IFSelect_RemainMode): boolean;
  SendAll(filename: string, computegraph: boolean): IFSelect_ReturnStatus;
  SendSelected(filename: string, sel: IFSelect_Selection, computegraph: boolean): IFSelect_ReturnStatus;
  WriteFile_1(filename: string): IFSelect_ReturnStatus;
  WriteFile_2(filename: string, sel: IFSelect_Selection): IFSelect_ReturnStatus;
  NbSources(sel: IFSelect_Selection): number;
  Source(sel: IFSelect_Selection, num: number): IFSelect_Selection;
  IsReversedSelectExtract(sel: IFSelect_Selection): boolean;
  ToggleSelectExtract(sel: IFSelect_Selection): boolean;
  SetInputSelection(sel: IFSelect_Selection, input: IFSelect_Selection): boolean;
  SetControl(sel: IFSelect_Selection, sc: IFSelect_Selection, formain: boolean): boolean;
  CombineAdd(selcomb: IFSelect_Selection, seladd: IFSelect_Selection, atnum: number): number;
  CombineRemove(selcomb: IFSelect_Selection, selrem: IFSelect_Selection): boolean;
  NewSelectPointed(list: NCollection_HSequence<occ::handle<Standard_Transient>>, name: string): IFSelect_Selection;
  SetSelectPointed(sel: IFSelect_Selection, list: NCollection_HSequence<occ::handle<Standard_Transient>>, mode: number): boolean;
  GiveSelection(selname: string): IFSelect_Selection;
  GiveList_1(obj: Standard_Transient): NCollection_HSequence<occ::handle<Standard_Transient>>;
  GiveList_2(first: string, second: string): NCollection_HSequence<occ::handle<Standard_Transient>>;
  GiveListFromList(selname: string, ent: Standard_Transient): NCollection_HSequence<occ::handle<Standard_Transient>>;
  GiveListCombined(l1: NCollection_HSequence<occ::handle<Standard_Transient>>, l2: NCollection_HSequence<occ::handle<Standard_Transient>>, mode: number): NCollection_HSequence<occ::handle<Standard_Transient>>;
  QueryCheckStatus(ent: Standard_Transient): number;
  QueryParent(entdad: Standard_Transient, entson: Standard_Transient): number;
  SetParams(params: any, uselist: any): void;
  TraceStatics(use: number, mode: number): void;
  DumpShare(): void;
  ListItems(label: string): void;
  ListFinalModifiers(formodel: boolean): void;
  DumpSelection(sel: IFSelect_Selection): void;
  TraceDumpModel(mode: number): void;
  TraceDumpEntity(ent: Standard_Transient, level: number): void;
  EvaluateSelection(sel: IFSelect_Selection): void;
  EvaluateDispatch(disp: IFSelect_Dispatch, mode: number): void;
  EvaluateComplete(mode: number): void;
  static get_type_name(): string;
  static get_type_descriptor(): Standard_Type;
  DynamicType(): Standard_Type;
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
  Init(theWS: XSControl_WorkSession, theScratch: boolean): void;
  Write(theFileName: string): IFSelect_ReturnStatus;
  Transfer_1(theDoc: TDocStd_Document, theMode: STEPControl_StepModelType, theIsMulti: string, theProgress: Message_ProgressRange): boolean;
  Transfer_2(theDoc: TDocStd_Document, theParams: DESTEP_Parameters, theMode: STEPControl_StepModelType, theIsMulti: string, theProgress: Message_ProgressRange): boolean;
  Transfer_3(theLabel: TDF_Label, theMode: STEPControl_StepModelType, theIsMulti: string, theProgress: Message_ProgressRange): boolean;
  Transfer_4(theLabel: TDF_Label, theParams: DESTEP_Parameters, theMode: STEPControl_StepModelType, theIsMulti: string, theProgress: Message_ProgressRange): boolean;
  Transfer_5(theLabelSeq: any, theMode: STEPControl_StepModelType, theIsMulti: string, theProgress: Message_ProgressRange): boolean;
  Transfer_6(theLabelSeq: any, theParams: DESTEP_Parameters, theMode: STEPControl_StepModelType, theIsMulti: string, theProgress: Message_ProgressRange): boolean;
  Perform_1(theDoc: TDocStd_Document, theFileName: XCAFDoc_PartId, theProgress: Message_ProgressRange): boolean;
  Perform_2(theDoc: TDocStd_Document, theFileName: string, theProgress: Message_ProgressRange): boolean;
  Perform_3(theDoc: TDocStd_Document, theFileName: string, theParams: DESTEP_Parameters, theProgress: Message_ProgressRange): boolean;
  ExternFiles(): any;
  ExternFile_1(theLabel: TDF_Label, theExtFile: STEPCAFControl_ExternFile): boolean;
  ExternFile_2(theName: string, theExtFile: STEPCAFControl_ExternFile): boolean;
  ChangeWriter(): STEPControl_Writer;
  Writer(): STEPControl_Writer;
  SetColorMode(theColorMode: boolean): void;
  GetColorMode(): boolean;
  SetNameMode(theNameMode: boolean): void;
  GetNameMode(): boolean;
  SetLayerMode(theLayerMode: boolean): void;
  GetLayerMode(): boolean;
  SetPropsMode(thePropsMode: boolean): void;
  GetPropsMode(): boolean;
  SetMetadataMode(theMetadataMode: boolean): void;
  GetMetadataMode(): boolean;
  SetSHUOMode(theSHUOMode: boolean): void;
  GetSHUOMode(): boolean;
  SetDimTolMode(theDimTolMode: boolean): void;
  GetDimTolMode(): boolean;
  SetMaterialMode(theMaterialMode: boolean): void;
  GetMaterialMode(): boolean;
  SetVisualMaterialMode(theVisualMaterialMode: boolean): void;
  GetVisualMaterialMode(): boolean;
  SetCleanDuplicates(theCleanDuplicates: boolean): void;
  GetCleanDuplicates(): boolean;
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
    constructor(theWS: XSControl_WorkSession, theScratch: boolean);
  }

export declare class STEPControl_Reader extends XSControl_Reader {
  StepModel(): StepData_StepModel;
  ReadFile_1(filename: string): IFSelect_ReturnStatus;
  ReadFile_2(filename: string, theParams: DESTEP_Parameters): IFSelect_ReturnStatus;
  TransferRoot(num: number, theProgress: Message_ProgressRange): boolean;
  NbRootsForTransfer(): number;
  FileUnits(theUnitLengthNames: TColStd_SequenceOfAsciiString, theUnitAngleNames: TColStd_SequenceOfAsciiString, theUnitSolidAngleNames: TColStd_SequenceOfAsciiString): void;
  SetSystemLengthUnit(theLengthUnit: number): void;
  SystemLengthUnit(): number;
  delete(): void;
}

  export declare class STEPControl_Reader_1 extends STEPControl_Reader {
    constructor();
  }

  export declare class STEPControl_Reader_2 extends STEPControl_Reader {
    constructor(WS: XSControl_WorkSession, scratch: boolean);
  }

export declare class STEPControl_Writer {
  SetTolerance(Tol: number): void;
  UnsetTolerance(): void;
  SetWS(WS: XSControl_WorkSession, scratch: boolean): void;
  WS(): XSControl_WorkSession;
  Model(newone: boolean): StepData_StepModel;
  Transfer_1(sh: TopoDS_Shape, mode: STEPControl_StepModelType, compgraph: boolean, theProgress: Message_ProgressRange): IFSelect_ReturnStatus;
  Transfer_2(sh: TopoDS_Shape, mode: STEPControl_StepModelType, theParams: DESTEP_Parameters, compgraph: boolean, theProgress: Message_ProgressRange): IFSelect_ReturnStatus;
  Write(theFileName: string): IFSelect_ReturnStatus;
  PrintStatsTransfer(what: number, mode: number): void;
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
    constructor(WS: XSControl_WorkSession, scratch: boolean);
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
  static Set_1(theLabel: TDF_Label, theUnitName: XCAFDoc_PartId, theUnitValue: number): XCAFDoc_LengthUnit;
  static Set_2(theLabel: TDF_Label, theUnitValue: number): XCAFDoc_LengthUnit;
  static Set_3(theLabel: TDF_Label, theGUID: Standard_GUID, theUnitName: XCAFDoc_PartId, theUnitValue: number): XCAFDoc_LengthUnit;
  Set_4(theUnitName: XCAFDoc_PartId, theUnitValue: number): void;
  GetUnitName(): XCAFDoc_PartId;
  GetUnitValue(): number;
  IsEmpty(): boolean;
  ID(): Standard_GUID;
  Restore(theWith: TDF_Attribute): void;
  Paste(theInto: TDF_Attribute, theRT: TDF_RelocationTable): void;
  static get_type_name(): string;
  static get_type_descriptor(): Standard_Type;
  DynamicType(): Standard_Type;
  NewEmpty(): TDF_Attribute;
  delete(): void;
}

export declare class XCAFDoc_DocumentTool extends TDataStd_GenericEmpty {
  constructor()
  static GetID(): Standard_GUID;
  static Set(L: TDF_Label, IsAcces: boolean): XCAFDoc_DocumentTool;
  static IsXCAFDocument(Doc: TDocStd_Document): boolean;
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
  static ShapeTool(acces: TDF_Label): XCAFDoc_ShapeTool;
  static CheckShapeTool(theAcces: TDF_Label): boolean;
  static ColorTool(acces: TDF_Label): XCAFDoc_ColorTool;
  static CheckColorTool(theAcces: TDF_Label): boolean;
  static VisMaterialTool(theLabel: TDF_Label): XCAFDoc_VisMaterialTool;
  static CheckVisMaterialTool(theAcces: TDF_Label): boolean;
  static LayerTool(acces: TDF_Label): XCAFDoc_LayerTool;
  static CheckLayerTool(theAcces: TDF_Label): boolean;
  static DimTolTool(acces: TDF_Label): XCAFDoc_DimTolTool;
  static CheckDimTolTool(theAcces: TDF_Label): boolean;
  static MaterialTool(acces: TDF_Label): XCAFDoc_MaterialTool;
  static CheckMaterialTool(theAcces: TDF_Label): boolean;
  static ViewTool(acces: TDF_Label): XCAFDoc_ViewTool;
  static CheckViewTool(theAcces: TDF_Label): boolean;
  static ClippingPlaneTool(acces: TDF_Label): XCAFDoc_ClippingPlaneTool;
  static CheckClippingPlaneTool(theAcces: TDF_Label): boolean;
  static NotesTool(acces: TDF_Label): XCAFDoc_NotesTool;
  static CheckNotesTool(theAcces: TDF_Label): boolean;
  static GetLengthUnit_1(theDoc: TDocStd_Document, theResut: number, theBaseUnit: UnitsMethods_LengthUnit): boolean;
  static GetLengthUnit_2(theDoc: TDocStd_Document, theResut: number): boolean;
  static SetLengthUnit_1(theDoc: TDocStd_Document, theUnitValue: number): void;
  static SetLengthUnit_2(theDoc: TDocStd_Document, theUnitValue: number, theBaseUnit: UnitsMethods_LengthUnit): void;
  Init(): void;
  ID(): Standard_GUID;
  AfterRetrieval(forceIt: boolean): boolean;
  static get_type_name(): string;
  static get_type_descriptor(): Standard_Type;
  DynamicType(): Standard_Type;
  NewEmpty(): TDF_Attribute;
  delete(): void;
}

export declare class XCAFDoc_ShapeTool extends TDataStd_GenericEmpty {
  constructor()
  static GetID(): Standard_GUID;
  static Set(L: TDF_Label): XCAFDoc_ShapeTool;
  IsTopLevel(L: TDF_Label): boolean;
  static IsFree(L: TDF_Label): boolean;
  static IsShape(L: TDF_Label): boolean;
  static IsSimpleShape(L: TDF_Label): boolean;
  static IsReference(L: TDF_Label): boolean;
  static IsAssembly(L: TDF_Label): boolean;
  static IsComponent(L: TDF_Label): boolean;
  static IsCompound(L: TDF_Label): boolean;
  static IsSubShape_1(L: TDF_Label): boolean;
  IsSubShape_2(shapeL: TDF_Label, sub: TopoDS_Shape): boolean;
  SearchUsingMap(S: TopoDS_Shape, L: TDF_Label, findWithoutLoc: boolean, findSubshape: boolean): boolean;
  Search(S: TopoDS_Shape, L: TDF_Label, findInstance: boolean, findComponent: boolean, findSubshape: boolean): boolean;
  FindShape_1(S: TopoDS_Shape, L: TDF_Label, findInstance: boolean): boolean;
  FindShape_2(S: TopoDS_Shape, findInstance: boolean): TDF_Label;
  static GetShape_1(L: TDF_Label, S: TopoDS_Shape): boolean;
  static GetShape_2(L: TDF_Label): TopoDS_Shape;
  static GetOneShape_1(theLabels: any): TopoDS_Shape;
  GetOneShape_2(): TopoDS_Shape;
  NewShape(): TDF_Label;
  SetShape(L: TDF_Label, S: TopoDS_Shape): void;
  AddShape(S: TopoDS_Shape, makeAssembly: boolean, makePrepare: boolean): TDF_Label;
  RemoveShape(L: TDF_Label, removeCompletely: boolean): boolean;
  Init(): void;
  static SetAutoNaming(V: boolean): void;
  static AutoNaming(): boolean;
  ComputeShapes(L: TDF_Label): void;
  ComputeSimpleShapes(): void;
  GetShapes(Labels: any): void;
  GetFreeShapes(FreeLabels: any): void;
  static GetUsers(L: TDF_Label, Labels: any, getsubchilds: boolean): number;
  static GetLocation(L: TDF_Label): TopLoc_Location;
  static GetReferredShape(L: TDF_Label, Label: TDF_Label): boolean;
  static NbComponents(L: TDF_Label, getsubchilds: boolean): number;
  static GetComponents(L: TDF_Label, Labels: any, getsubchilds: boolean): boolean;
  AddComponent_1(assembly: TDF_Label, comp: TDF_Label, Loc: TopLoc_Location): TDF_Label;
  AddComponent_2(assembly: TDF_Label, comp: TopoDS_Shape, expand: boolean): TDF_Label;
  RemoveComponent(comp: TDF_Label): void;
  UpdateAssemblies(): void;
  FindSubShape(shapeL: TDF_Label, sub: TopoDS_Shape, L: TDF_Label): boolean;
  AddSubShape_1(shapeL: TDF_Label, sub: TopoDS_Shape): TDF_Label;
  AddSubShape_2(shapeL: TDF_Label, sub: TopoDS_Shape, addedSubShapeL: TDF_Label): boolean;
  FindMainShapeUsingMap(sub: TopoDS_Shape): TDF_Label;
  FindMainShape(sub: TopoDS_Shape): TDF_Label;
  static GetSubShapes(L: TDF_Label, Labels: any): boolean;
  BaseLabel(): TDF_Label;
  ID(): Standard_GUID;
  static IsExternRef(L: TDF_Label): boolean;
  SetExternRefs_1(SHAS: any): TDF_Label;
  SetExternRefs_2(L: TDF_Label, SHAS: any): void;
  static GetExternRefs(L: TDF_Label, SHAS: any): void;
  SetSHUO(Labels: any, MainSHUOAttr: XCAFDoc_GraphNode): boolean;
  static GetSHUO(SHUOLabel: TDF_Label, aSHUOAttr: XCAFDoc_GraphNode): boolean;
  static GetAllComponentSHUO(CompLabel: TDF_Label, SHUOAttrs: any): boolean;
  static GetSHUOUpperUsage(NextUsageL: TDF_Label, Labels: any): boolean;
  static GetSHUONextUsage(UpperUsageL: TDF_Label, Labels: any): boolean;
  RemoveSHUO(SHUOLabel: TDF_Label): boolean;
  FindComponent(theShape: TopoDS_Shape, Labels: any): boolean;
  GetSHUOInstance(theSHUO: XCAFDoc_GraphNode): TopoDS_Shape;
  SetInstanceSHUO(theShape: TopoDS_Shape): XCAFDoc_GraphNode;
  GetAllSHUOInstances(theSHUO: XCAFDoc_GraphNode, theSHUOShapeSeq: TopTools_SequenceOfShape): boolean;
  static FindSHUO(Labels: any, theSHUOAttr: XCAFDoc_GraphNode): boolean;
  SetLocation(theShapeLabel: TDF_Label, theLoc: TopLoc_Location, theRefLabel: TDF_Label): boolean;
  Expand(Shape: TDF_Label): boolean;
  GetNamedProperties_1(theLabel: TDF_Label, theToCreate: boolean): TDataStd_NamedData;
  GetNamedProperties_2(theShape: TopoDS_Shape, theToCreate: boolean): TDataStd_NamedData;
  static get_type_name(): string;
  static get_type_descriptor(): Standard_Type;
  DynamicType(): Standard_Type;
  NewEmpty(): TDF_Attribute;
  delete(): void;
}

export declare class XCAFDoc_ColorTool extends TDataStd_GenericEmpty {
  constructor()
  static AutoNaming(): boolean;
  static SetAutoNaming(theIsAutoNaming: boolean): void;
  static Set(L: TDF_Label): XCAFDoc_ColorTool;
  static GetID(): Standard_GUID;
  BaseLabel(): TDF_Label;
  ShapeTool(): XCAFDoc_ShapeTool;
  IsColor(lab: TDF_Label): boolean;
  static GetColor_1(lab: TDF_Label, col: Quantity_Color): boolean;
  static GetColor_2(lab: TDF_Label, col: Quantity_ColorRGBA): boolean;
  FindColor_1(col: Quantity_Color, lab: TDF_Label): boolean;
  FindColor_2(col: Quantity_ColorRGBA, lab: TDF_Label): boolean;
  FindColor_3(col: Quantity_Color): TDF_Label;
  FindColor_4(col: Quantity_ColorRGBA): TDF_Label;
  AddColor_1(col: Quantity_Color): TDF_Label;
  AddColor_2(col: Quantity_ColorRGBA): TDF_Label;
  RemoveColor(lab: TDF_Label): void;
  GetColors(Labels: any): void;
  SetColor_1(L: TDF_Label, colorL: TDF_Label, type: XCAFDoc_ColorType): void;
  SetColor_2(L: TDF_Label, Color: Quantity_Color, type: XCAFDoc_ColorType): void;
  SetColor_3(L: TDF_Label, Color: Quantity_ColorRGBA, type: XCAFDoc_ColorType): void;
  UnSetColor_1(L: TDF_Label, type: XCAFDoc_ColorType): void;
  IsSet_1(L: TDF_Label, type: XCAFDoc_ColorType): boolean;
  static GetColor_3(L: TDF_Label, type: XCAFDoc_ColorType, colorL: TDF_Label): boolean;
  static GetColor_4(L: TDF_Label, type: XCAFDoc_ColorType, color: Quantity_Color): boolean;
  static GetColor_5(L: TDF_Label, type: XCAFDoc_ColorType, color: Quantity_ColorRGBA): boolean;
  SetColor_4(S: TopoDS_Shape, colorL: TDF_Label, type: XCAFDoc_ColorType): boolean;
  SetColor_5(S: TopoDS_Shape, Color: Quantity_Color, type: XCAFDoc_ColorType): boolean;
  SetColor_6(S: TopoDS_Shape, Color: Quantity_ColorRGBA, type: XCAFDoc_ColorType): boolean;
  UnSetColor_2(S: TopoDS_Shape, type: XCAFDoc_ColorType): boolean;
  IsSet_2(S: TopoDS_Shape, type: XCAFDoc_ColorType): boolean;
  GetColor_6(S: TopoDS_Shape, type: XCAFDoc_ColorType, colorL: TDF_Label): boolean;
  GetColor_7(S: TopoDS_Shape, type: XCAFDoc_ColorType, color: Quantity_Color): boolean;
  GetColor_8(S: TopoDS_Shape, type: XCAFDoc_ColorType, color: Quantity_ColorRGBA): boolean;
  static IsVisible(L: TDF_Label): boolean;
  SetVisibility(shapeLabel: TDF_Label, isvisible: boolean): void;
  IsColorByLayer(L: TDF_Label): boolean;
  SetColorByLayer(shapeLabel: TDF_Label, isColorByLayer: boolean): void;
  SetInstanceColor_1(theShape: TopoDS_Shape, type: XCAFDoc_ColorType, color: Quantity_Color, isCreateSHUO: boolean): boolean;
  SetInstanceColor_2(theShape: TopoDS_Shape, type: XCAFDoc_ColorType, color: Quantity_ColorRGBA, isCreateSHUO: boolean): boolean;
  GetInstanceColor_1(theShape: TopoDS_Shape, type: XCAFDoc_ColorType, color: Quantity_Color): boolean;
  GetInstanceColor_2(theShape: TopoDS_Shape, type: XCAFDoc_ColorType, color: Quantity_ColorRGBA): boolean;
  IsInstanceVisible(theShape: TopoDS_Shape): boolean;
  ReverseChainsOfTreeNodes(): boolean;
  ID(): Standard_GUID;
  static get_type_name(): string;
  static get_type_descriptor(): Standard_Type;
  DynamicType(): Standard_Type;
  NewEmpty(): TDF_Attribute;
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
  Clear(theAllocator: NCollection_BaseAllocator): void;
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
    constructor(theAllocator: NCollection_BaseAllocator);
  }

  export declare class TopTools_ListOfShape_3 extends TopTools_ListOfShape {
    constructor(theOther: TopTools_ListOfShape);
  }

  export declare class TopTools_ListOfShape_4 extends TopTools_ListOfShape {
    constructor(theOther: TopTools_ListOfShape);
  }

  export declare class TopTools_ListOfShape_5 extends TopTools_ListOfShape {
    constructor(theInitList: any, theAllocator: NCollection_BaseAllocator);
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
  BRepMesh_IncrementalMeshWrapper: typeof BRepMesh_IncrementalMeshWrapper;
  TopoDS_Cast: typeof TopoDS_Cast;
  OCJS_ShapeHasher: typeof OCJS_ShapeHasher;
  BRepToolsWrapper: typeof BRepToolsWrapper;
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
