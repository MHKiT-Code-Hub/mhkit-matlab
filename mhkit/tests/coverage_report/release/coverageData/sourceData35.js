var sourceData35 = {"FileName":"/Users/asimms/Desktop/Programming/mhkit_matlab_simms_dev/MHKiT-MATLAB/mhkit/dolfyn/tools/py_struct_2_bytes_format.m","RawFileContents":["function [format, bytes] = py_struct_2_bytes_format(py_format, size_only)","    if isstring(py_format)","        py_format = convertStringsToChars(py_format);","    end","    if length(py_format) == 1","        [format, bytes] = assign_value(py_format);","    else","        bytes = 0;","        last_bytes = nan;","        mltply = nan;","        for i = 1:length(py_format)","            chr = py_format(i);","            if ~isstrprop(chr,'alpha')","                if isnan(mltply)","                    mltply = str2double(chr);","                else","                    temp = num2str(mltply);","                    mltply = str2double(strcat(temp,chr));","                end","                continue","            else","                [format, temp] = assign_value(chr);","                if isnan(mltply)","                    bytes = bytes + temp;","                else","                    bytes = bytes + (temp * mltply);","                end","                mltply = nan;","                if isnan(last_bytes)","                    last_bytes = temp;","                else","                    if ~size_only","                        if last_bytes ~= temp","                            ME = MException('MATLAB:py_struct_2_bytes_format', ...","                                ['matlab is not able to mix byte sizes.'...","                                ' IE it is possible to mix padding(x) ' ...","                                'and char(c) because they are both of ' ...","                                'size 1 but it is not possible to read '...","                                'a char and double(d) because double is'...","                                ' of size 8.']);","                            throw(ME);","                        end","                    end","                end","            end","        end","    end","","    function [fmt, size] = assign_value(input)","        switch input","            case 'c'","                fmt = 'char*1';","                size = 1;","            case 'x'","                fmt = 'char*1';","                size = 1;","            case 'b'","                fmt = 'schar';","                size = 1;","            case 'B'","                fmt = 'uchar';","                size = 1;","            case 'h'","                fmt = 'short';","                size = 2;","            case 'H'","                fmt = 'ushort';","                size = 2;","            case 'i'","                fmt = 'int32';","                size = 4;","            case 'I'","                fmt = 'uint32';","                size = 4;","            case 'l'","                fmt = 'long';","                size = 4;","            case 'L'","                fmt = 'ulong';","                size = 4;","            case 'q'","                fmt = 'int64';","                size = 8;","            case 'Q'","                fmt = 'uint64';","                size = 8;","            case 'f'","                fmt = 'float';","                size = 4;","            case 'd'","                fmt = 'double';","                size = 8;","            otherwise","                ME = MException('MATLAB:py_struct_2_bytes_format',['Unsupported'...","                    ' python struct charcter: %s',input]);","                throwAsCaller(ME)","        end","    end","end","",""],"CoverageDisplayDataPerLine":{"Function":[{"LineNumber":1,"Hits":52314,"StartColumnNumbers":0,"EndColumnNumbers":73,"ContinuedLine":false},{"LineNumber":49,"Hits":52407,"StartColumnNumbers":4,"EndColumnNumbers":46,"ContinuedLine":false}],"Statement":[{"LineNumber":2,"Hits":52314,"StartColumnNumbers":4,"EndColumnNumbers":26,"ContinuedLine":false},{"LineNumber":3,"Hits":0,"StartColumnNumbers":8,"EndColumnNumbers":53,"ContinuedLine":false},{"LineNumber":5,"Hits":52314,"StartColumnNumbers":4,"EndColumnNumbers":29,"ContinuedLine":false},{"LineNumber":6,"Hits":52171,"StartColumnNumbers":8,"EndColumnNumbers":50,"ContinuedLine":false},{"LineNumber":8,"Hits":143,"StartColumnNumbers":8,"EndColumnNumbers":18,"ContinuedLine":false},{"LineNumber":9,"Hits":143,"StartColumnNumbers":8,"EndColumnNumbers":25,"ContinuedLine":false},{"LineNumber":10,"Hits":143,"StartColumnNumbers":8,"EndColumnNumbers":21,"ContinuedLine":false},{"LineNumber":11,"Hits":143,"StartColumnNumbers":8,"EndColumnNumbers":35,"ContinuedLine":false},{"LineNumber":12,"Hits":466,"StartColumnNumbers":12,"EndColumnNumbers":31,"ContinuedLine":false},{"LineNumber":13,"Hits":466,"StartColumnNumbers":12,"EndColumnNumbers":38,"ContinuedLine":false},{"LineNumber":14,"Hits":230,"StartColumnNumbers":16,"EndColumnNumbers":32,"ContinuedLine":false},{"LineNumber":15,"Hits":148,"StartColumnNumbers":20,"EndColumnNumbers":45,"ContinuedLine":false},{"LineNumber":17,"Hits":82,"StartColumnNumbers":20,"EndColumnNumbers":43,"ContinuedLine":false},{"LineNumber":18,"Hits":82,"StartColumnNumbers":20,"EndColumnNumbers":58,"ContinuedLine":false},{"LineNumber":20,"Hits":230,"StartColumnNumbers":16,"EndColumnNumbers":25,"ContinuedLine":false},{"LineNumber":22,"Hits":236,"StartColumnNumbers":16,"EndColumnNumbers":51,"ContinuedLine":false},{"LineNumber":23,"Hits":236,"StartColumnNumbers":16,"EndColumnNumbers":32,"ContinuedLine":false},{"LineNumber":24,"Hits":88,"StartColumnNumbers":20,"EndColumnNumbers":41,"ContinuedLine":false},{"LineNumber":26,"Hits":148,"StartColumnNumbers":20,"EndColumnNumbers":52,"ContinuedLine":false},{"LineNumber":28,"Hits":236,"StartColumnNumbers":16,"EndColumnNumbers":29,"ContinuedLine":false},{"LineNumber":29,"Hits":236,"StartColumnNumbers":16,"EndColumnNumbers":36,"ContinuedLine":false},{"LineNumber":30,"Hits":143,"StartColumnNumbers":20,"EndColumnNumbers":38,"ContinuedLine":false},{"LineNumber":32,"Hits":93,"StartColumnNumbers":20,"EndColumnNumbers":33,"ContinuedLine":false},{"LineNumber":33,"Hits":0,"StartColumnNumbers":24,"EndColumnNumbers":45,"ContinuedLine":false},{"LineNumber":34,"Hits":0,"StartColumnNumbers":28,"EndColumnNumbers":77,"ContinuedLine":false},{"LineNumber":35,"Hits":0,"StartColumnNumbers":32,"EndColumnNumbers":72,"ContinuedLine":true},{"LineNumber":36,"Hits":0,"StartColumnNumbers":32,"EndColumnNumbers":71,"ContinuedLine":true},{"LineNumber":37,"Hits":0,"StartColumnNumbers":32,"EndColumnNumbers":71,"ContinuedLine":true},{"LineNumber":38,"Hits":0,"StartColumnNumbers":32,"EndColumnNumbers":72,"ContinuedLine":true},{"LineNumber":39,"Hits":0,"StartColumnNumbers":32,"EndColumnNumbers":72,"ContinuedLine":true},{"LineNumber":40,"Hits":0,"StartColumnNumbers":32,"EndColumnNumbers":48,"ContinuedLine":true},{"LineNumber":41,"Hits":0,"StartColumnNumbers":28,"EndColumnNumbers":38,"ContinuedLine":false},{"LineNumber":50,"Hits":52407,"StartColumnNumbers":8,"EndColumnNumbers":20,"ContinuedLine":false},{"LineNumber":51,"Hits":52407,"StartColumnNumbers":12,"EndColumnNumbers":20,"ContinuedLine":false},{"LineNumber":52,"Hits":0,"StartColumnNumbers":16,"EndColumnNumbers":31,"ContinuedLine":false},{"LineNumber":53,"Hits":0,"StartColumnNumbers":16,"EndColumnNumbers":25,"ContinuedLine":false},{"LineNumber":54,"Hits":52407,"StartColumnNumbers":12,"EndColumnNumbers":20,"ContinuedLine":false},{"LineNumber":55,"Hits":4,"StartColumnNumbers":16,"EndColumnNumbers":31,"ContinuedLine":false},{"LineNumber":56,"Hits":4,"StartColumnNumbers":16,"EndColumnNumbers":25,"ContinuedLine":false},{"LineNumber":57,"Hits":52403,"StartColumnNumbers":12,"EndColumnNumbers":20,"ContinuedLine":false},{"LineNumber":58,"Hits":2648,"StartColumnNumbers":16,"EndColumnNumbers":30,"ContinuedLine":false},{"LineNumber":59,"Hits":2648,"StartColumnNumbers":16,"EndColumnNumbers":25,"ContinuedLine":false},{"LineNumber":60,"Hits":49755,"StartColumnNumbers":12,"EndColumnNumbers":20,"ContinuedLine":false},{"LineNumber":61,"Hits":10379,"StartColumnNumbers":16,"EndColumnNumbers":30,"ContinuedLine":false},{"LineNumber":62,"Hits":10379,"StartColumnNumbers":16,"EndColumnNumbers":25,"ContinuedLine":false},{"LineNumber":63,"Hits":39376,"StartColumnNumbers":12,"EndColumnNumbers":20,"ContinuedLine":false},{"LineNumber":64,"Hits":10392,"StartColumnNumbers":16,"EndColumnNumbers":30,"ContinuedLine":false},{"LineNumber":65,"Hits":10392,"StartColumnNumbers":16,"EndColumnNumbers":25,"ContinuedLine":false},{"LineNumber":66,"Hits":28984,"StartColumnNumbers":12,"EndColumnNumbers":20,"ContinuedLine":false},{"LineNumber":67,"Hits":18930,"StartColumnNumbers":16,"EndColumnNumbers":31,"ContinuedLine":false},{"LineNumber":68,"Hits":18930,"StartColumnNumbers":16,"EndColumnNumbers":25,"ContinuedLine":false},{"LineNumber":69,"Hits":10054,"StartColumnNumbers":12,"EndColumnNumbers":20,"ContinuedLine":false},{"LineNumber":70,"Hits":102,"StartColumnNumbers":16,"EndColumnNumbers":30,"ContinuedLine":false},{"LineNumber":71,"Hits":102,"StartColumnNumbers":16,"EndColumnNumbers":25,"ContinuedLine":false},{"LineNumber":72,"Hits":9952,"StartColumnNumbers":12,"EndColumnNumbers":20,"ContinuedLine":false},{"LineNumber":73,"Hits":8001,"StartColumnNumbers":16,"EndColumnNumbers":31,"ContinuedLine":false},{"LineNumber":74,"Hits":8001,"StartColumnNumbers":16,"EndColumnNumbers":25,"ContinuedLine":false},{"LineNumber":75,"Hits":1951,"StartColumnNumbers":12,"EndColumnNumbers":20,"ContinuedLine":false},{"LineNumber":76,"Hits":0,"StartColumnNumbers":16,"EndColumnNumbers":29,"ContinuedLine":false},{"LineNumber":77,"Hits":0,"StartColumnNumbers":16,"EndColumnNumbers":25,"ContinuedLine":false},{"LineNumber":78,"Hits":1951,"StartColumnNumbers":12,"EndColumnNumbers":20,"ContinuedLine":false},{"LineNumber":79,"Hits":0,"StartColumnNumbers":16,"EndColumnNumbers":30,"ContinuedLine":false},{"LineNumber":80,"Hits":0,"StartColumnNumbers":16,"EndColumnNumbers":25,"ContinuedLine":false},{"LineNumber":81,"Hits":1951,"StartColumnNumbers":12,"EndColumnNumbers":20,"ContinuedLine":false},{"LineNumber":82,"Hits":0,"StartColumnNumbers":16,"EndColumnNumbers":30,"ContinuedLine":false},{"LineNumber":83,"Hits":0,"StartColumnNumbers":16,"EndColumnNumbers":25,"ContinuedLine":false},{"LineNumber":84,"Hits":1951,"StartColumnNumbers":12,"EndColumnNumbers":20,"ContinuedLine":false},{"LineNumber":85,"Hits":0,"StartColumnNumbers":16,"EndColumnNumbers":31,"ContinuedLine":false},{"LineNumber":86,"Hits":0,"StartColumnNumbers":16,"EndColumnNumbers":25,"ContinuedLine":false},{"LineNumber":87,"Hits":1951,"StartColumnNumbers":12,"EndColumnNumbers":20,"ContinuedLine":false},{"LineNumber":88,"Hits":1951,"StartColumnNumbers":16,"EndColumnNumbers":30,"ContinuedLine":false},{"LineNumber":89,"Hits":1951,"StartColumnNumbers":16,"EndColumnNumbers":25,"ContinuedLine":false},{"LineNumber":90,"Hits":0,"StartColumnNumbers":12,"EndColumnNumbers":20,"ContinuedLine":false},{"LineNumber":91,"Hits":0,"StartColumnNumbers":16,"EndColumnNumbers":31,"ContinuedLine":false},{"LineNumber":92,"Hits":0,"StartColumnNumbers":16,"EndColumnNumbers":25,"ContinuedLine":false},{"LineNumber":94,"Hits":0,"StartColumnNumbers":16,"EndColumnNumbers":80,"ContinuedLine":false},{"LineNumber":95,"Hits":0,"StartColumnNumbers":20,"EndColumnNumbers":58,"ContinuedLine":true},{"LineNumber":96,"Hits":0,"StartColumnNumbers":16,"EndColumnNumbers":33,"ContinuedLine":false}]}}