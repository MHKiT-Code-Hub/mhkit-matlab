var sourceData128 = {"FileName":"/Users/asimms/Desktop/Programming/mhkit_matlab_simms_dev/MHKiT-MATLAB/mhkit/tidal/graphics/plot_tidal_phase_probability.m","RawFileContents":["function figure=plot_tidal_phase_probability(data, flood, ebb, ...","                                                          options)","%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%","%     Discretizes the tidal series speed by bin size and returns a plot","%     of the probability for each bin in the flood or ebb tidal phase.","%","% Parameters","% ------------","%    data: structure","%","%      data.time: vector","%       days from January 0, 0000 in the proleptic ISO calendar","%","%      data.d: vector","%       time-series of directions [degrees]","%","%      data.s: vector","%       time-series of speeds [cm/s]","%","%    flood: float","%        principal flood direction [degrees]","%","%    ebb: float","%        principal ebb direction [degrees]","%","%    bin_size: numeric (optional)","%       Speed bin size. Default = 0.1 m/s","%       to call: plot_tidal_phase_probability(data, flood, ebb,\"bin_size\",bin_size)","%","%    title: string (optional)","%       title for the plot","%       to call: plot_tidal_phase_probability(data, flood, ebb,\"title\",title)","%","%    savepath: string (optional)","%       path and filename to save figure.","%       to call: plot_tidal_phase_probability(data, flood, ebb,\"savepath\",savepath)","%","% Returns","% ---------","%   figure: stacked bar graph of the probability of exceedance in","%           flood and ebb directions","%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%","","arguments","    data","    flood","    ebb","    options.bin_size = 0.1; % m/s","    options.title = \"\";","    options.savepath = \"\";","end","","%check to see if the first input argument is a structure","if any(~isstruct(data))","    ME = MException('MATLAB:plot_tidal_phase_probability','data must be a structure');","    throw(ME);","end","","%check to see if the second input argument is a number","if any([~isnumeric(flood), length(flood) ~= 1])","    ME = MException('MATLAB:plot_tidal_phase_probability','flood must be a number');","    throw(ME);","end","","%check to see if the third input argument is a number","if any([~isnumeric(ebb), length(ebb) ~= 1])","    ME = MException('MATLAB:plot_tidal_phase_probability','ebb must be a number');","    throw(ME);","end","","max_angle = max(ebb, flood);","min_angle = min(ebb, flood);","","lower_split = rem((min_angle + (360 - max_angle + min_angle)/2 ) , 360);","upper_split = lower_split + 180;","","if (lower_split <= ebb) && (ebb < upper_split)","    isEbb = ((data.d < upper_split) & (data.d >= lower_split));","else","    isEbb = ~((data.d < upper_split) & (data.d >= lower_split));","end","","decimals = round(options.bin_size/0.1);","N_bins = int32(round(max(data.s),decimals)/0.1);","","[H, bins] = histcounts(data.s, N_bins);","H_ebb = histcounts(data.s(isEbb), bins);","H_flood = histcounts(data.s(~isEbb), bins);","","p_ebb = H_ebb./H;","p_flood = H_flood./H;","","center = (bins(1:end-1) + bins(2:end))/2;","p_ebb_less = find(p_ebb<p_flood);","p_ebb_greater = find(p_flood<p_ebb);","","figure = bar(center([p_ebb_greater]), p_ebb([p_ebb_greater]), 0.9,\"blue\");","","hold on","","bar(center([p_ebb_greater]), p_flood([p_ebb_greater]), 0.9,...","    'FaceColor',[0.9290 0.6940 0.1250]);","bar(center([p_ebb_less]), p_flood([p_ebb_less]), 0.9,...","    'FaceColor',[0.9290 0.6940 0.1250]);","bar(center([p_ebb_less]), p_ebb([p_ebb_less]), 0.9, \"blue\");","xlabel('Velocity [\\itm/s\\rm]','FontSize',20);","ylabel('Probability','FontSize',20);","legend('Ebb','Flood')","grid on","title(options.title)","","len = strlength(options.savepath);","if len > 1","    saveas(figure, options.savepath);","end","","hold off","",""],"CoverageDisplayDataPerLine":{"Function":[{"LineNumber":1,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":66,"ContinuedLine":false},{"LineNumber":2,"Hits":1,"StartColumnNumbers":58,"EndColumnNumbers":66,"ContinuedLine":true}],"Statement":[{"LineNumber":48,"Hits":1,"StartColumnNumbers":23,"EndColumnNumbers":26,"ContinuedLine":false},{"LineNumber":49,"Hits":1,"StartColumnNumbers":20,"EndColumnNumbers":22,"ContinuedLine":false},{"LineNumber":50,"Hits":0,"StartColumnNumbers":23,"EndColumnNumbers":25,"ContinuedLine":false},{"LineNumber":54,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":23,"ContinuedLine":false},{"LineNumber":55,"Hits":0,"StartColumnNumbers":4,"EndColumnNumbers":86,"ContinuedLine":false},{"LineNumber":56,"Hits":0,"StartColumnNumbers":4,"EndColumnNumbers":14,"ContinuedLine":false},{"LineNumber":60,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":47,"ContinuedLine":false},{"LineNumber":61,"Hits":0,"StartColumnNumbers":4,"EndColumnNumbers":84,"ContinuedLine":false},{"LineNumber":62,"Hits":0,"StartColumnNumbers":4,"EndColumnNumbers":14,"ContinuedLine":false},{"LineNumber":66,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":43,"ContinuedLine":false},{"LineNumber":67,"Hits":0,"StartColumnNumbers":4,"EndColumnNumbers":82,"ContinuedLine":false},{"LineNumber":68,"Hits":0,"StartColumnNumbers":4,"EndColumnNumbers":14,"ContinuedLine":false},{"LineNumber":71,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":28,"ContinuedLine":false},{"LineNumber":72,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":28,"ContinuedLine":false},{"LineNumber":74,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":72,"ContinuedLine":false},{"LineNumber":75,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":32,"ContinuedLine":false},{"LineNumber":77,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":46,"ContinuedLine":false},{"LineNumber":78,"Hits":1,"StartColumnNumbers":4,"EndColumnNumbers":63,"ContinuedLine":false},{"LineNumber":80,"Hits":0,"StartColumnNumbers":4,"EndColumnNumbers":64,"ContinuedLine":false},{"LineNumber":83,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":39,"ContinuedLine":false},{"LineNumber":84,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":48,"ContinuedLine":false},{"LineNumber":86,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":39,"ContinuedLine":false},{"LineNumber":87,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":40,"ContinuedLine":false},{"LineNumber":88,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":43,"ContinuedLine":false},{"LineNumber":90,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":17,"ContinuedLine":false},{"LineNumber":91,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":21,"ContinuedLine":false},{"LineNumber":93,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":41,"ContinuedLine":false},{"LineNumber":94,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":33,"ContinuedLine":false},{"LineNumber":95,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":36,"ContinuedLine":false},{"LineNumber":97,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":74,"ContinuedLine":false},{"LineNumber":99,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":8,"ContinuedLine":false},{"LineNumber":101,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":58,"ContinuedLine":false},{"LineNumber":102,"Hits":1,"StartColumnNumbers":4,"EndColumnNumbers":40,"ContinuedLine":true},{"LineNumber":103,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":52,"ContinuedLine":false},{"LineNumber":104,"Hits":1,"StartColumnNumbers":4,"EndColumnNumbers":40,"ContinuedLine":true},{"LineNumber":105,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":60,"ContinuedLine":false},{"LineNumber":106,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":45,"ContinuedLine":false},{"LineNumber":107,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":36,"ContinuedLine":false},{"LineNumber":108,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":21,"ContinuedLine":false},{"LineNumber":109,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":8,"ContinuedLine":false},{"LineNumber":110,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":20,"ContinuedLine":false},{"LineNumber":112,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":34,"ContinuedLine":false},{"LineNumber":113,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":10,"ContinuedLine":false},{"LineNumber":114,"Hits":1,"StartColumnNumbers":4,"EndColumnNumbers":37,"ContinuedLine":false},{"LineNumber":117,"Hits":1,"StartColumnNumbers":0,"EndColumnNumbers":9,"ContinuedLine":false}]}}